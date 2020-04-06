const router = require('express').Router();
let Album = require('../models/albums.model');
let User = require('../models/users.model');
let ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');

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

/* ADD ALBUM TO ALBUM'S LIBRARY */
router.post('/:userId/:albumId/:albumTitle', (req, res) => {
    User.findById({ _id: req.params.userId})
        .then((user) => {
            if(user) {
                let i, check = true;
                for(i = 0; i < user.albums.length; i++) {
                    if(new ObjectId(user.albums[i]).equals(req.params.albumId)) check = false
                }

                if(check) {
                    user.albums.push(req.params.albumId);

                    user.save()
                        .then(() => {
                            const token = jwt.sign({id: user._id, username: user.username, email: user.email, img: user.img, songs: user.liked_songs, playlists:user.playlists, artists:user.artists, albums: user.albums}, process.env.TOKEN_SECRET)
                            res.status(200).json({ token: token,  message: `You added ${req.params.albumTitle} to your library. ✔️` })
                        })
                        .catch(() => {
                            res.status(500).json({ message: "Something went wrong.. 🤔" })
                        })
                } else res.status(409).json({message: "The album is already in your library. ❌"})
            }
        })
        .catch(() => res.status(500).json({ message: "Something went wrong.. 🤔" }))
})


module.exports = router;