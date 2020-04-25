const router = require('express').Router();
const neo4j = require('neo4j-driver')

/* Credentials */
const driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD))
const session = driver.session()


/* Routes */

/*
    TODO:
    1. Recommend 8 random tracks based on what genre he likes. -> done
    2. Create a playlist with 10 tracks based on what genre he likes. (MADE FOR YOU PAGE)
    3. If he likes more than one genre recommend to him 10/#genre tracks for each genre. -> done
    4. Recommend 2 albums based on the genre of the album he saved. -> done
    5. Recommend an artist if he follows one from the same genre.
    6. If he listened to a track recommend 5 tracks from the same artist.
    7. Recommend 3 songs from the same artist that he liked a song.
*/

/* Get user's songs genre */
router.post('/songs/genres', (req, res) => {
    userId = req.body.userId
    console.log(userId)

    /* Get user's genres */
    session.run(`MATCH
                (n: User {mongoid: "${userId}"}),
                (m: Song),
                p=(n)-[:LIKES]->(m)
                RETURN m.genre`)
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

            res.status(200).json({ result: tracks })
        })
        .catch((err) => res.status(404).json(err))
})


/* Get user's albums genre */
router.post('/albums/genres', (req, res) => {
    userId = req.body.userId
    session.run(`MATCH
                (n: User {mongoid: "${userId}"}),
                (m: Album),
                p=(n)-[:SAVED]->(m)
                RETURN m.genre`)
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

            res.status(200).json({ result: albums })
        })
        .catch((err) => res.status(404).json(err))
})


module.exports = router