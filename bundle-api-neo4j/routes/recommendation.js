const router = require('express').Router();
const neo4j = require('neo4j-driver')
const _ = require('loadsh')
const jwt = require('jsonwebtoken');

/* Credentials */
const driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD))
const session = driver.session()


/* Routes */

/*
    TODO:
    1. Recommend 8 random tracks based on what genre he likes. -> done
    2. Create a playlist with 10 tracks based on what genre he likes. (MADE FOR YOU PAGE) -> done
    3. If he likes more than one genre recommend to him 10/#genre tracks for each genre. -> done
    4. Recommend 2 albums based on the genre of the album he saved. -> done
    5. Recommend 2 artists if he follows one from the same genre. -> done
    6. If he listened to a track recommend 5 tracks from the same artist. (not yet)
    7. Recommend 3 songs from the same artist that he liked a song. (not yet)
*/

router.post('/verifyToken', (req, res) => {
    token = req.body.token

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        res.status(200).json({ result: true })
    } catch (err) {
        res.json({ result: false })
    }
})

router.post('/token', (req, res) => {
    songs = req.body.songs
    albums = req.body.albums
    artists = req.body.artists

    res.status(200).json({ token: jwt.sign({ songs: songs, albums: albums, artists: artists }, process.env.TOKEN_SECRET, { expiresIn: 86400 }) })
});

router.post('/playlist_token', (req, res) => {
    playlist = req.body.playlist

    res.status(200).json({ token: jwt.sign({ playlist: playlist }, process.env.TOKEN_SECRET, { expiresIn: 86400 }) })
});


/* Get user's songs genre */
router.post('/songs/genres', (req, res) => {

    userId = req.body.userId

    /* Get user's genres */
    session.run(`MATCH
                (n: User {mongoid: "${userId}"}),
                (m: Song),
                p=(n)-[:LIKES]->(m)
                RETURN collect(distinct m.genre)`)
        .then((result) => {
            genres = []

            for (let i = 0; i < result.records.length; i++)
                genres.push(result.records[i]._fields[0])

            res.status(200).json({ result: genres })
        })
        .catch(err => console.log(err))

})


/* Get random tracks from a specific genre */
router.post('/tracks', (req, res) => {
    userId = req.body.userId
    genre = req.body.genre
    limit = req.body.limit

    session.run(`
                MATCH
                (n: User {mongoid: "${userId}"}),
                (m: Song {genre: "${genre}"})
                WHERE NOT (n)-[:LIKES]->(m) AND NOT (n)-[:LISTENED]->(m)
                RETURN m, rand() as r
                ORDER BY r
                LIMIT ${limit}`)
        .then((result) => {
            tracks = []
            for (let i = 0; i < result.records.length; i++)
                tracks.push(result.records[i]._fields[0]["properties"]["id"])

            res.status(201).json({ result: tracks })
        })
        .catch((err) => res.status(404).json(err))
})

/* Get albums from a specific genre */
router.post('/genres/albums', (req, res) => {
    userId = req.body.userId
    genre = req.body.genre
    limit = req.body.limit

    session.run(`MATCH
                (n: User {mongoid: "${userId}"}),
                (m: Album {genre: "${genre}"})
                WHERE m.id <> "-"
                RETURN collect(distinct m.id), rand() as r
                ORDER BY r
                LIMIT ${limit}`)
        .then((result) => {
            albums = []

            for (let i = 0; i < result.records.length; i++) {
                albums.push(result.records[i]._fields[0]);
            }

            res.status(200).json({ result: albums })
        })
        .catch((err) => console.log(err));
});

/* Get songs from a specific album */
router.post('/albums/songs', (req, res) => {
    userId = req.body.userId;
    album = req.body.album;
    limit = req.body.limit

    session.run(`MATCH (n: User {mongoid:"${userId}"}), (m: Song), (o: Album)
                WHERE o.id = "${album}" AND (m)-[:IN]->(o) AND NOT (n)-[:LIKES]->(m)
                RETURN m, rand() as r
                ORDER BY r
                LIMIT ${limit}`)
        .then((result) => {
            songs = []

            for (let i = 0; i < result.records.length; i++) {
                songs.push(result.records[i]._fields[0]["properties"]);
            }

            res.status(200).json({ result: songs })
        })
        .catch((err) => console.log(err));
})


/* Get user's albums genre */
router.post('/albums/genres', (req, res) => {
    userId = req.body.userId
    session.run(`MATCH
                (n: User {mongoid: "${userId}"}),
                (m: Album),
                p=(n)-[:SAVED]->(m)
                RETURN collect(distinct m.genre)`)
        .then((result) => {
            genres = []

            for (let i = 0; i < result.records.length; i++)
                genres.push(result.records[i]._fields[0])

            res.status(200).json({ result: genres })
        })
        .catch((err) => res.status(404).json(err))
})


/* Recommended albums */
router.post('/albums', (req, res) => {
    userId = req.body.userId
    genre = req.body.genre
    limit = req.body.limit

    session.run(`MATCH
                (n: User {mongoid: "${userId}"}),
                (m: Album {genre: "${genre}"})
                WHERE NOT (n)-[:SAVED]->(m)
                RETURN m, rand() as r
                ORDER BY r
                LIMIT ${limit}`)
        .then((result) => {
            albums = []
            for (let i = 0; i < result.records.length; i++)
                albums.push(result.records[i]._fields[0]["properties"]["mongoid"])

            res.status(201).json({ result: albums })
        })
        .catch((err) => res.status(404).json(err))
})

/* Artist's genres */
router.post('/artists/genres', (req, res) => {

    userId = req.body.userId

    session.run(`MATCH
                (n: User {mongoid: "${userId}"}),
                (m: Artist)
                WHERE (n)-[:FOLLOWS]->(m)
                RETURN collect(distinct m.genre)`)
        .then((result) => {
            res.status(201).json({ result: result.records[0]._fields })
        })
        .catch((err) => res.status(404).json(err))
})

/* Recommended artists */
router.post('/artists', (req, res) => {

    userId = req.body.userId
    genre = req.body.genre
    limit = req.body.limit

    session.run(`MATCH
                (u: User {mongoid: "${userId}"}),
                (n: Artist {genre: "${genre}"}),
                (m: Artist {genre: "${genre}"})
                WHERE (n)-[:SIMILAR]->(m) and NOT (u)-[:FOLLOWS]->(m) AND NOT (u)-[:FOLLOWS]->(n)
                RETURN collect(distinct m.mongoid)`)
        .then((result) => {
            artists = result.records[0]._fields[0]

            res.status(201).json({ result: _.sampleSize(artists, limit) })
        })
        .catch((err) => res.status(404).json(err))
})




module.exports = router