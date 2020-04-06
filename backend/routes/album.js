const router = require('express').Router();
let Album = require('../models/albums.model');

router.get('/:id', (req, res) => {
    Album.findById({ _id: req.params.id })
        .then((album) => {
            if (album) {
                res.status(200).json({ album: album })
            }
        })
        .catch(() => {
            res.status(404).json({ message: 'Album not found. 😥' })
        })
})


module.exports = router;