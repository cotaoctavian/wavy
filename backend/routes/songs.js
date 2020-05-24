const router = require('express').Router();
let Songs = require('../models/songs.model');
let User = require('../models/users.model');
let Artist = require('../models/artists.model');
let Album = require('../models/albums.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
var ObjectId = require('mongoose').Types.ObjectId;


router.get('/', (req, res) => {
    Songs.find({}, (err, songs) => {
        if (err) {
            res.status(404).json({ message: 'No songs found' })
        }
        else {
            Artist.find({}, (err, artists) => {
                if (err) {
                    res.status(404).json({ message: 'No artists found' })
                }
                else {
                    Album.find({}, (err, albums) => {
                        if (err) {
                            res.status(404).json({ message: 'No albums found' })
                        }
                        else {
                            res.status(200).json({ songs: songs, artists: artists, albums: albums })
                        }
                    })
                }
            })
        }
    })
});

router.post('/artist', (req, res) => {
    songId = req.body.songId;

    Songs.findById({ _id: songId })
        .then((song) => {
            if (song) {
                Album.find({ name: song.album })
                    .then((album) => {
                        res.status(201).json({ message: album })
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
});

router.post('/', (req, res) => {

    Songs.findById({ _id: req.body.song })
        .then(song => {
            if (song) {
                res.json({ info: song })
            }
        })
        .catch(err => console.log(err))
});

router.post('/info', (req, res) => {

    Songs.findOne({ path: req.body.name })
        .then(song => {
            if (song) res.json({ info: song })
        })
        .catch(err => console.log(err))
});

router.post('/dislike', (req, res) => {
    Songs.findOne({ path: req.body.name })
        .then(song => {
            if (song) {
                User.findById({ _id: req.body.id })
                    .then(user => {
                        if (user) {
                            liked_songs = user.liked_songs;
                            let i;
                            for (i = 0; i < liked_songs.length; i++) {
                                if (new ObjectId(liked_songs[i]).equals(song._id)) {
                                    liked_songs.splice(i, 1);
                                }
                            }

                            user.liked_songs = liked_songs;
                            user.save()
                                .then(() => {
                                    const token = jwt.sign({ id: user._id, username: user.username, email: user.email, img: user.img, songs: user.liked_songs, playlists: user.playlists, artists: user.artists, albums: user.albums, is_artist: user.is_artist }, process.env.TOKEN_SECRET)
                                    res.json({ songId: song._id, token: token })
                                })
                                .catch(() => console.log(err))
                        }
                    })
            }
        })
});

router.post('/like', (req, res) => {
    Songs.findOne({ path: req.body.name })
        .then(song => {
            if (song) {
                User.findById({ _id: req.body.id })
                    .then(user => {
                        if (user) {
                            liked_songs = user.liked_songs;
                            let i, check = 0;
                            for (i = 0; i < liked_songs.length; i++) {
                                if (new ObjectId(liked_songs[i]).equals(song._id)) {
                                    check = 1;
                                }
                            }

                            if (check === 0) {
                                liked_songs.push(song._id)
                            }
                            user.liked_songs = liked_songs;
                            user.save()
                                .then(() => {
                                    const token = jwt.sign({ id: user._id, username: user.username, email: user.email, img: user.img, songs: user.liked_songs, playlists: user.playlists, artists: user.artists, albums: user.albums }, process.env.TOKEN_SECRET)
                                    res.json({ songId: song._id, token: token })
                                })
                                .catch(() => console.log(err))
                        }
                    })
            }
        })
});


router.post('/:title/:artist/:album/:genre/:duration', (req, res) => {

    let photo = req.files.photo;
    photo.name = photo.name.split('.')[0] + '_' + crypto.randomBytes(6).toString('hex') + '_' + Date.now() + "." + photo.name.split('.')[1]


    photo.mv(`${process.cwd()}/public/images/${photo.name}`, err => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    })

    let song = req.files.song;
    song.name = photo.name.split('.')[0] + '_' + crypto.randomBytes(6).toString('hex') + '_' + Date.now() + "." + song.name.split('.')[1]


    song.mv(`${process.cwd()}/public/songs/${song.name}`, err => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    })

    const newSong = new Songs({ title: req.params.title, path: `songs/${song.name}`, photo_path: `images/${photo.name}`, artist: req.params.artist, album: req.params.album, genre: req.params.genre, duration: req.params.duration })
    newSong.save()
        .then((song) => {
            Album.findOne({ name: req.params.album })
                .then((album) => {
                    if (album) {
                        album.tracks.push(song._id)

                        album.save()
                            .then(() => res.json({ message: "Song added to the album successfully!" }))
                            .catch((err) => console.log(err))
                    } 
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
});

module.exports = router