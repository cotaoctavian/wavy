const router = require('express').Router();
const neo4j = require('neo4j-driver')

/* Credentials */
const driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD))
const session = driver.session()


/* Routes */
router.get('/:limit', (req, res) => {
    session.run(`MATCH
                (n: Artist)
                return n
                LIMIT ${req.params.limit}`)
        .then((result) => {
            res.status(200).json({ albums: result })
        })
        .catch(err => console.log(err))
})

router.post('/follow', (req, res) => {
    const userId = req.body.userId
    const artistId = req.body.artistId

    session.run(`MATCH 
                (n: Artist {mongoid: "${artistId}"}),
                (m: User {mongoid: "${userId}"})
                MERGE (m)-[:FOLLOWS]->(n)`)
        .then(() => {
            res.status(201).json({ message: "Relationship established successfully." })
        })
        .catch(err => console.log(err))
})


router.post('/unfollow', (req, res) => {

    const userId = req.body.userId
    const artistId = req.body.artistId

    session.run(`MATCH
                (n: User {mongoid:"${userId}"}),
                (m: Artist {mongoid:"${artistId}"}),
                p=(n)-[r:FOLLOWS]->(m)
                DELETE r`)
        .then(() => {
            res.status(201).json({ message: "Relationship deleted successfully." })
        })
        .catch(err => console.log(err))

})

module.exports = router