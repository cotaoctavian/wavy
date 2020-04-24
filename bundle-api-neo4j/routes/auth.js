const router = require('express').Router();
const neo4j = require('neo4j-driver')

/* Credentials */
const driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD))
const session = driver.session()

router.post('/', (req, res) => {

    username = req.body.username
    mongoid = req.body.id

    /* Run a query on neo4j */
    session.run(`CREATE (n: User {name: "${username}", mongoid: "${mongoid}"}) RETURN n`)
            .then(() => {
                res.status(201).json({ message: "User created successfully"})
            })
            .catch(() => res.status(409).json({message: "User already exists"})) 
})


module.exports = router