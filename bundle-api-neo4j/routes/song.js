const router = require('express').Router();
const neo4j = require('neo4j-driver')

/* Credentials */
const driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD))
const session = driver.session()

/* Routes */
router.post('/listened', (req, res) => {
    const userId = req.body.userId
    const songId = req.body.songId

    session.run(`MATCH 
                (n: Song {id: "${songId}"}),
                (m: User {mongoid: "${userId}"})
                MERGE (m)-[:LISTENED]->(n)`)
        .then(() => {
            res.status(201).json({ message: "Relationship established successfully." })
        })
        .catch(err => console.log(err))
})


router.post('/liked', (req, res) => {
    const userId = req.body.userId
    const songId = req.body.songId

    session.run(`MATCH 
                (n: Song {id: "${songId}"}),
                (m: User {mongoid: "${userId}"})
                MERGE (m)-[:LIKES]->(n)`)
        .then(() => {
            res.status(201).json({ message: "Relationship established successfully." })
        })
        .catch(err => console.log(err))
})


router.post('/disliked', (req, res) => {

    const userId = req.body.userId
    const songId = req.body.songId
    
    let tx = session.beginTransaction();

    tx.run(`MATCH
                (n: User {mongoid:"${userId}"}),
                (m:Song {id:"${songId}"}),
                p=(n)-[r:LIKES]->(m)
                DELETE r`)
        .then(() => {
            res.status(201).json({ message: "Relationship deleted successfully." })
        })
        .catch(err => console.log(err))

    tx.commit();
})

/* Create song node */
router.post('/', (req, res) => {
    album = req.body.album;
    genre = req.body.genre;
    id = req.body.mongoid;
    title = req.body.title;


    session.run(`CREATE
                (n: Song {album: "${album}", genre: "${genre}", id: "${id}", title: "${title}" })`)
        .then(() => {
            res.status(201).json({ message: "The song has been created." })
        })
        .catch(err => res.status(404).json(err))
});

/* IN relationship between album and song */
router.post('/in-relationship', (req, res) => {
    albumMongoId = req.body.albumMongoId;
    songMongoId = req.body.songMongoId;

    session.run(`MATCH 
                (n: Album {mongoid:"${albumMongoId}" }), (m: Song {id: "${songMongoId}"})
                MERGE (m)-[:IN]->(n)`)
        .then(() => {
            res.status(201).json({ message: "Relationship established successfully." })
        })
        .catch((err) => res.status(404).json(err))
});

/* Delete IN relationship between album and song + remove songs */
router.delete('/in-relationship/:albumMongoId', (req, res) => {
    albumMongoId = req.params.albumMongoId;
    
    let tx = session.beginTransaction();

    tx.run(`MATCH (n:Album {mongoid:"${albumMongoId}" }), (m: Song), p=(m)-[r:IN]->(n) 
                DELETE r, m`)
            .then(() => {
                res.status(200).json({message: "Relationship deleted successfully."})
            })
            .catch((error) => console.log(error))

    tx.commit();
})



module.exports = router