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
                res.status(201).json({message: "Relationship established successfully."})
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
                res.status(201).json({message: "Relationship established successfully."})
            })
            .catch(err => console.log(err))
})


router.post('/disliked', (req, res) => {

    const userId = req.body.userId
    const songId = req.body.songId

    session.run(`MATCH
                (n: User {mongoid:"${userId}"}),
                (m:Song {id:"${songId}"}),
                p=(n)-[r:LIKES]->(m)
                DELETE r`)
            .then(() => {
                res.status(201).json({message: "Relationship deleted successfully."})
            })
            .catch(err => console.log(err))
})



module.exports = router