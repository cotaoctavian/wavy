const router = require('express').Router();
let User = require('../models/users.model');
let Artist = require('../models/artists.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const token = jwt.sign({ id: user._id, username: user.username, email: user.email, img: user.img, songs: user.liked_songs, playlists: user.playlists, artists: user.artists, albums: user.albums, is_artist: user.is_artist }, process.env.TOKEN_SECRET)
                    if (user.is_artist) {
                        Artist.findById({ _id: user._id })
                            .then((artist) => {
                                if (artist) {
                                    res.status(201).json({ token })
                                } else {
                                    let albums = [];
                                    let singles = [];

                                    const newArtist = new Artist({ _id: user._id, name: user.username, photo: user.img, albums: albums, singles: singles, followers: 0 })

                                    newArtist.save()
                                        .then(() => res.status(201).json({ token }))
                                        .catch((err) => console.log(err))
                                }
                            })
                    }

                } else {
                    res.json({ message: "Incorrect email or password. ❌" });
                }
            }
            else {
                res.json({ message: "Incorrect email or password. ❌" });
            }
        })
        .catch(err => res.json({ message: 'Error' + err }));
})

module.exports = router;