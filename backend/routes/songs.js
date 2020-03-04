const router = require('express').Router();
let Songs = require('../models/songs.model');

router.post('/', (req, res) => {

    Songs.findById({ _id: req.body.song })
        .then(song => {
            if (song) {
                res.json({info: song})
            }
        })
        .catch(err => console.log(err))
})

module.exports = router