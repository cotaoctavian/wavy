const router = require('express').Router();
const neo4j = require('neo4j-driver')

/* Credentials */
const driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD))
const session = driver.session()


/* Routes */
/* Add album to user's library */
router.post('/saved', (req, res) => {

    const userId = req.body.userId
    const albumId = req.body.albumId

    session.run(`MATCH 
                (n: Album {mongoid: "${albumId}"}),
                (m: User {mongoid: "${userId}"})
                MERGE (m)-[:SAVED]->(n)`)
            .then(() => {
                res.status(201).json({message: "Relationship established successfully."})
            })
            .catch(err => console.log(err))

})

/* Remove album from user's library */
router.post('/remove', (req, res) => {

    const userId = req.body.userId
    const albumId = req.body.albumId

    let tx = session.beginTransaction();

    tx.run(`MATCH
                (n: User {mongoid:"${userId}"}),
                (m: Album {mongoid:"${albumId}"}),
                p=(n)-[r:SAVED]->(m)
                DELETE r`)
            .then(() => {
                res.status(201).json({message: "Relationship deleted successfully."})
            })
            .catch(err => console.log(err))
    
    tx.commit();
})

/* Create album in NEO4j DB */
router.post('/', (req, res) => {
    genre = req.body.genre;
    album = req.body.album;
    mongoid = req.body.mongoid;
    
    session.run(`CREATE (n: Album {id: "${album}", genre: "${genre}", mongoid: "${mongoid}"}) RETURN n`)
            .then(() => {
                res.status(201).json({message: "Album has been created."})
            })
            .catch((err) => res.status(404).json(err));
});

/* Create relationship "MADE" between artist and album */
router.post('/made-relationship', (req, res) => {
    userId = req.body.mongoid;
    album = req.body.album;
    
    session.run(`MATCH (n: User {mongoid: "${userId}"}), (m: Album {id: "${album}"}) MERGE (n)-[:MADE]->(m);`)
            .then(() => {
                res.status(201).json({message: "[:MADE] Relationship established successfully."})
            })
            .catch((err) => res.status(404).json(err));
});


router.delete('/made-relationship/:userId/:album', (req, res) => {
    userId = req.params.userId;
    album = req.params.album;
    
    let tx = session.beginTransaction();

    tx.run(`MATCH (n: User {mongoid: "${userId}"}), (m: Album {id: "${album}"}), p=(n)-[r:MADE]->(m) 
                DELETE r, m`)
            .then(() => {
                res.status(200).json({message: "[:MADE] Relationship deleted successfully."})
            })
            .catch(err => console.log(err));
    
    tx.commit();
})

module.exports = router