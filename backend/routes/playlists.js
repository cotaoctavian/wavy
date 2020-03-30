const router = require('express').Router();
let User = require('../models/users.model');
let Playlist = require('../models/playlists.model');
const jwt = require('jsonwebtoken');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/', (req, res) => {
    Playlist.findById({ _id: req.body.id })
        .then((playlist) => {
            if (playlist) {
                res.json({ playlist: playlist })
            }
        })
        .catch(err => console.log(err));

})


router.delete('/:playlistId/:trackId', (req, res) => {
    Playlist.findById({ _id: req.params.playlistId })
        .then(playlist => {
            if (playlist) {
                songs = playlist.songs

                let i;
                for (i = 0; i < songs.length; i++) {
                    if (new ObjectId(songs[i]).equals(req.params.trackId)) {
                        songs.splice(i, 1)
                    }
                }

                playlist.songs = songs
                playlist.save()
                    .then(() => res.json({ message: 'The track has been deleted.' }))
                    .catch(() => res.json({ message: 'There was an error deleting the track.' }))

            }
        })
})

router.delete('/track/:id/:userId', (req, res) => {
    User.findById({ _id: req.params.userId })
        .then(user => {
            if (user) {
                playlist = user.playlists

                let i;
                for (i = 0; i < playlist.length; i++) {
                    if (new ObjectId(playlist[i]).equals(req.params.id)) {
                        playlist.splice(i, 1)
                    }
                }

                user.playlists = playlist
                user.save()

                const token = jwt.sign({ id: user._id, username: user.username, email: user.email, img: user.img, songs: user.liked_songs, playlists: user.playlists }, process.env.TOKEN_SECRET)
                Playlist.deleteOne({ _id: req.params.id }, (err) => {
                    if (err) {
                        res.json({ message: "The playlist couldn't be deleted." })
                    } else {
                        res.json({ token: token, message: "Playlist deleted successfully!" })
                    }
                })
            }
        })
})

router.patch('/', (req, res) => {
    Playlist.findById({ _id: req.body.id })
        .then((playlist) => {
            if (playlist) {
                playlist.title = req.body.title
                playlist.save()
                    .then(() => { res.json({ message: "Title changed successfully!" }) })
                    .catch((err) => console.log(err))
            }
        })
        .catch((err) => console.log(err))
})

router.post('/track', (req, res) => {
    Playlist.findById({ _id: req.body.playlistId })
        .then(playlist => {
            if (playlist) {
                let i, check = false;
                for (i = 0; i < playlist.songs.length; i++) {
                    if (new ObjectId(playlist.songs[i]).equals(req.body.trackId)) {
                        check = true;
                    }
                }

                if (check) {
                    res.json({ message: "The track already exists in the playlist." })
                }
                else {
                    playlist.songs.push(req.body.trackId)
                    playlist.save()
                        .then(() => res.json({ message: "Track added successfully!" }))
                        .catch(() => res.json({ message: "Something went wrong..." }))
                }
            }
        })
        .catch((err) => console.log(err))
})

router.post('/add', (req, res) => {
    const newPlaylist = new Playlist({ userId: new ObjectId(req.body.userId), title: req.body.title });
    User.findById({ _id: req.body.userId })
        .then((user) => {
            if (user) {
                newPlaylist.save()
                    .then((result) => {
                        playlists = user.playlists
                        let i;
                        let check = false;
                        for (i = 0; i < playlists.length; i++) {
                            if (new ObjectId(playlists[i]).equals(result._id)) {
                                check = true;
                            }
                        }
                        if (!check) playlists.push(result._id);

                        user.playlists = playlists;
                        user.save()
                            .then(() => {
                                const token = jwt.sign({ id: user._id, username: user.username, email: user.email, img: user.img, songs: user.liked_songs, playlists: user.playlists }, process.env.TOKEN_SECRET)
                                res.json({ token: token })
                            })
                            .catch((err) => console.log(err));
                    })
            }
        })
})




module.exports = router;