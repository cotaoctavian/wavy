const router = require('express').Router();
let User = require('../models/users.model');
let Artist = require('../models/artists.model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

router.post('/:id', (req, res) => {
    if (req.files == null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const id = req.params.id


    const file = req.files.file;
    file.name = file.name.split('.')[0] + '_' + crypto.randomBytes(6).toString('hex') + '_' + Date.now() + "." + file.name.split('.')[1]


    file.mv(`${process.cwd()}/public/images/${file.name}`, err => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        } else {
            User.findById(id)
                .then(user => {
                    if (user) {
                        user.img = `images/${file.name}`
                        let jwt_data = { id: user._id, username: user.username, email: user.email, img: user.img, songs: user.liked_songs, playlists: user.playlists, artists: user.artists, albums: user.albums, is_artist: user.is_artist }
                        user.save()
                            .then(() => {
                                Artist.findById({ _id: id })
                                    .then((artist) => {
                                        if (artist) {
                                            artist.photo = `images/${file.name}`;
                                            artist.save()
                                                .then(() => {
                                                    res.status(201).json({ message: "Your profile picture has been changed.", token: jwt.sign(jwt_data, process.env.TOKEN_SECRET), filePath: `images/${file.name}` })
                                                })
                                                .catch(err => console.log(err))
                                        }
                                        else res.status(201).json({ message: "Your profile picture has been changed.", token: jwt.sign(jwt_data, process.env.TOKEN_SECRET), filePath: `images/${file.name}` })
                                    })
                                    .catch(err => res.status(400).send(err));
                            })
                            .catch(err => res.status(400).send(err))
                    }
                })
        }
    })
})

module.exports = router;