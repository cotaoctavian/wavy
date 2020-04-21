const router = require('express').Router();
let Album = require('../models/albums.model');
let Artist = require('../models/artists.model');
let User = require('../models/users.model');
let ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


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
    User.findById({ _id: req.params.userId })
        .then((user) => {
            if (user) {
                let i, check = true;
                for (i = 0; i < user.albums.length; i++) {
                    if (new ObjectId(user.albums[i]).equals(req.params.albumId)) check = false
                }

                if (check) {
                    user.albums.push(req.params.albumId);

                    user.save()
                        .then(() => {
                            const token = jwt.sign({ id: user._id, username: user.username, email: user.email, img: user.img, songs: user.liked_songs, playlists: user.playlists, artists: user.artists, albums: user.albums }, process.env.TOKEN_SECRET)
                            res.status(200).json({ token: token, message: `You added ${req.params.albumTitle} to your library. ✔️` })
                        })
                        .catch(() => {
                            res.status(500).json({ message: "Something went wrong.. 🤔" })
                        })
                } else res.status(409).json({ message: "The album is already in your library. ❌" })
            }
        })
        .catch(() => res.status(500).json({ message: "Something went wrong.. 🤔" }))
})

/* Remove album from library */
router.delete('/:userId/:albumId/:albumTitle', (req, res) => {
    User.findById({ _id: req.params.userId })
        .then((user) => {
            let i, check = true;
            for (i = 0; i < user.albums.length; i++) {
                if (new ObjectId(user.albums[i]).equals(req.params.albumId))
                    user.albums.splice(i, 1);
                break;
            }

            user.save()
                .then(() => {
                    const token = jwt.sign({ id: user._id, username: user.username, email: user.email, img: user.img, songs: user.liked_songs, playlists: user.playlists, artists: user.artists, albums: user.albums }, process.env.TOKEN_SECRET)
                    res.status(200).json({ token: token, message: `You removed ${req.params.albumTitle} from library. ❌` })
                })
                .catch(() => {
                    res.status(500).json({ message: "Something went wrong.. 🤔" })
                })
        })
})

router.post('/:artist/:name/:year/:track', (req, res) => {

    if (res.files !== null) {
        let file = req.files.file;
        file.name = file.name.split('.')[0] + '_' + crypto.randomBytes(6).toString('hex') + '_' + Date.now() + "." + file.name.split('.')[1];

        file.mv(`${process.cwd()}/public/images/album/${file.name}`, err => {
            if (err) {
                return res.status(500).send(err);
            } else {
                //const artist = new Artist({artist: req.params.name, name: req.params.album, });
                Album.findOne({ name: req.params.name })
                    .then((album) => {
                        if (album) {
                            album.tracks.push(new ObjectId(req.params.track))
                            album.save()
                                .then(() => res.json({ message: "Done!" }))
                                .catch(err => console.log(err))
                        } else {
                            Artist.findById({ _id: req.params.artist })
                                .then((artist) => {
                                    if (artist) {
                                        let tracks = [];
                                        tracks.push(new ObjectId(req.params.track))
                                        let artistName = artist.name
                                        const newAlbum = new Album({ artistId: new ObjectId(req.params.artist), artist: artistName, name: req.params.name, photo: `images/album/${file.name}`, year: parseInt(req.params.year), tracks: tracks })

                                        newAlbum.save()
                                            .then(() => res.json({ message: "Done!" }))
                                            .catch((err) => console.log(err))
                                    }
                                    else res.status(404).json({ message: "Artist not found" })
                                })
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
    }
    else {

    }
})


module.exports = router;