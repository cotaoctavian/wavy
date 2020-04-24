const router = require('express').Router();
const neo4j = require('neo4j-driver')

/* Credentials */
const driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD))
const session = driver.session()

/* Routes */
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

router.post('/remove', (req, res) => {

    const userId = req.body.userId
    const albumId = req.body.albumId

    session.run(`MATCH
                (n: User {mongoid:"${userId}"}),
                (m: Album {mongoid:"${albumId}"}),
                p=(n)-[r:SAVED]->(m)
                DELETE r`)
            .then(() => {
                res.status(201).json({message: "Relationship deleted successfully."})
            })
            .catch(err => console.log(err))

})

module.exports = router