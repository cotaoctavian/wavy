const router = require('express').Router();
let User = require('../models/users.model');
let Artist = require('../models/artists.model');
let ObjectId = require('mongoose').Types.ObjectId;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

router.get('/:id', (req, res) => {
    Artist.findById({ _id: req.params.id })
        .then((artist) => {
            if (artist) {
                res.status(200).json({ artist: artist })
            }
        })
        .catch((err) => {
            res.status(404).json({ message: 'Artist not found. 😥' })
        })
})

router.get('/name/:name', (req, res) => {
    Artist.findOne( {name: req.params.name })   
        .then((artist) => {
            if(artist) {
                res.status(200).json({ artist: artist})
            }
        })
        .catch(err => console.log(err))
})

router.patch('/follow/:artistId/:userId', (req, res) => {
    User.findById({ _id: req.params.userId })
        .then((user) => {
            if (user) {
                artists = user.artists;

                let i, check = true;
                for (i = 0; i < artists.length; i++) {
                    if (new ObjectId(artists[i]).equals(req.params.artistId)) check = false
                }

                if (check) {
                    artists.push(req.params.artistId);
                    user.artists = artists;

                    user.save()
                        .then(
                            Artist.findById({ _id: req.params.artistId })
                                .then((artist) => {
                                    if (artist) {

                                        followers = artist.followers
                                        followers = followers + 1
                                        artist.followers = followers

                                        const token = jwt.sign({ id: user._id, username: user.username, email: user.email, img: user.img, songs: user.liked_songs, playlists: user.playlists, artists: user.artists, albums: user.albums, is_artist: user.is_artist }, process.env.TOKEN_SECRET)
                                        artist.save()
                                            .then(() => res.status(200).json({ token: token, message: `You started following ${artist.name}. ✔️` }))
                                            .catch(() => res.status(500).json({ message: "Something went wrong.. 🤔" }))
                                    }
                                })
                                .catch(err => console.error(err))
                        )
                        .catch(() => res.status(500).json({ message: "Something went wrong.. 🤔" }))
                }
                else res.status(500).json({ message: "Something went wrong.. 🤔" })
            }
        })
        .catch(() => res.status(500).json({ message: "Something went wrong.. 🤔" }))

})


router.patch('/unfollow/:artistId/:userId', (req, res) => {
    User.findById({ _id: req.params.userId })
        .then((user) => {
            if (user) {
                let i;
                for (i = 0; i < user.artists.length; i++) {
                    if (new ObjectId(user.artists[i]).equals(req.params.artistId)) {
                        user.artists.splice(i, 1);
                    }
                }

                user.save()
                    .then(
                        Artist.findById({ _id: req.params.artistId })
                            .then((artist) => {
                                if (artist) {

                                    followers = artist.followers
                                    followers = followers - 1
                                    artist.followers = followers

                                    const token = jwt.sign({ id: user._id, username: user.username, email: user.email, img: user.img, songs: user.liked_songs, playlists: user.playlists, artists: user.artists, albums: user.albums, is_artist: user.is_artist }, process.env.TOKEN_SECRET)

                                    artist.save()
                                        .then(() => res.status(200).json({ token: token, message: `You stopped following ${artist.name}. 🛑` }))
                                        .catch(() => res.status(500).json({ message: "Something went wrong.. 🤔" }))
                                }
                            })
                            .catch(() => res.status(500).json({ message: "Something went wrong.. 🤔" })))
                    .catch(() => res.status(500).json({ message: "Something went wrong.. 🤔" }))
            }
        })
        .catch(() => res.status(500).json({ message: "Something went wrong.. 🤔" }))
})

/* Admin panel routes */
router.post('/1/:name/:solo', (req, res) => {
    if (req.files !== null) {
        let file = req.files.file;
        file.name = file.name.split('.')[0] + '_' + crypto.randomBytes(6).toString('hex') + '_' + Date.now() + "." + file.name.split('.')[1]

        file.mv(`${process.cwd()}/public/images/artists/${file.name}`, err => {
            if (err) {
                return res.status(500).send(err);
            } else {
                //const artist = new Artist({artist: req.params.name, name: req.params.album, });
                Artist.findOne({ name: req.params.name })
                    .then(artist => {
                        if (artist) {
                            if (req.params.solo.length > 0) {
                                artist.singles.push(new ObjectId(req.params.solo))
                            }

                            artist.photo = `images/artists/${file.name}`

                            artist.save()
                                .then(() => res.status(200).json({ message: "Done!" }))
                                .catch(error => console.log(error))
                        } else {
                            /* Create a new artist */
                            let singles = [];
                            singles.push(new ObjectId(req.params.solo))

                            const newArtist = new Artist({ name: req.params.name, photo: `images/${file.name}`, albums: [], singles: singles, followers: 0 })
                            newArtist.save()
                                .then(() => res.json({ message: "Done!" }))
                                .catch((err) => console.log(err))
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
    }
    else {
        Artist.findOne({ name: req.params.name })
            .then(artist => {
                if (artist) {
                    if (req.params.solo.length > 0) {
                        artist.singles.push(new ObjectId(req.params.solo))
                    }

                    artist.save()
                        .then(() => res.json({ message: "Done!" }))
                        .catch(error => console.log(error))
                }
            })
            .catch(err => console.log(err))
    }
})

router.post('/2/:name/:album', (req, res) => {
    if (req.files !== null) {
        let file = req.files.file;
        file.name = file.name.split('.')[0] + '_' + crypto.randomBytes(6).toString('hex') + '_' + Date.now() + "." + file.name.split('.')[1]

        file.mv(`${process.cwd()}/public/images/artists/${file.name}`, err => {
            if (err) {
                return res.status(500).send(err);
            } else {
                //const artist = new Artist({artist: req.params.name, name: req.params.album, });
                Artist.findOne({ name: req.params.name })
                    .then(artist => {
                        if (artist) {
                            if (req.params.album.length > 0) {
                                artist.albums.push(new ObjectId(req.params.album))
                            }

                            artist.photo = `images/artists/${file.name}`

                            artist.save()
                                .then(() => res.status(200).json({ message: "Done!" }))
                                .catch(error => console.log(error))
                        } else {
                            /* Create a new artist */
                            let albums = [];
                            albums.push(new ObjectId(req.params.album))

                            const newArtist = new Artist({ name: req.params.name, photo: `images/artists/${file.name}`, albums: albums, singles: [], followers: 0 })
                            newArtist.save()
                                .then(() => res.status(200).json({ message: "Done!" }))
                                .catch((err) => console.log(err))
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
    }
    else {
        Artist.findOne({ name: req.params.name })
            .then(artist => {
                if (artist) {
                    if (req.params.album.length > 0) {
                        artist.albums.push(new ObjectId(req.params.album))
                    }

                    artist.save()
                        .then(() => res.status(200).json({ message: "Done!" }))
                        .catch(error => console.log(error))
                }
            })
            .catch(err => console.log(err))
    }
})


router.post('/:name/:album/:solo', (req, res) => {
    
    if (req.files !== null) {
        let file = req.files.file;
        file.name = file.name.split('.')[0] + '_' + crypto.randomBytes(6).toString('hex') + '_' + Date.now() + "." + file.name.split('.')[1]

        file.mv(`${process.cwd()}/public/images/artists/${file.name}`, err => {
            if (err) {
                return res.status(500).send(err);
            } else {
                //const artist = new Artist({artist: req.params.name, name: req.params.album, })

                Artist.findOne({ name: req.params.name })
                    .then(artist => {
                        if (artist) {
                            if (req.params.album.length > 0) {
                                artist.albums.push(new ObjectId(req.params.album))
                            }

                            if(req.params.solo.length > 0) {
                                artist.singles.push(new ObjectId(req.params.solo))
                            }

                            artist.photo = `images/artists/${file.name}`

                            artist.save()
                                .then(() => res.status(200).json({ message: "Done!" }))
                                .catch(error => console.log(error))
                        } else {
                            /* Create a new artist */
                            let albums = [];
                            albums.push(new ObjectId(req.params.album))

                            let singles = [];
                            singles.push(new ObjectId(req.params.solo))

                            const newArtist = new Artist({ name: req.params.name, photo: `images/artists/${file.name}`, albums: albums, singles: singles, followers: 0 })
                            
                            newArtist.save()
                                .then(() => res.status(200).json({ message: "Done!" }))
                                .catch((err) => console.log(err))
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
    }
    else {
        Artist.findOne({ name: req.params.name })
            .then(artist => {
                if (artist) {
                    if (req.params.album.length > 0) {
                        artist.albums.push(new ObjectId(req.params.album))
                    }

                    if(req.params.solo.length > 0) {
                        artist.singles.push(new ObjectId(req.params.solo))
                    }

                    artist.save()
                        .then(() => res.status(200).json({ message: "Done!" }))
                        .catch(error => console.log(error))
                }
            })
            .catch(err => console.log(err))
    }
})


router.post('/:name', (req, res) => {
    if (req.files !== null) {
        let file = req.files.file;
        file.name = file.name.split('.')[0] + '_' + crypto.randomBytes(6).toString('hex') + '_' + Date.now() + "." + file.name.split('.')[1]

        file.mv(`${process.cwd()}/public/images/artists/${file.name}`, err => {
            if (err) {
                return res.status(500).send(err);
            } else {
                //const artist = new Artist({artist: req.params.name, name: req.params.album, })

                Artist.findOne({ name: req.params.name })
                    .then(artist => {
                        if (!artist) {
                            /* Create a new artist */
                            let albums = [];
                            let singles = [];

                            const newArtist = new Artist({ name: req.params.name, photo: `images/artists/${file.name}`, albums: albums, singles: singles, followers: 0 })
                            
                            newArtist.save()
                                .then(() => res.status(200).json({ message: "Done!" }))
                                .catch((err) => console.log(err))
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
    }
})


module.exports = router;