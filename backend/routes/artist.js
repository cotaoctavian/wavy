const router = require('express').Router();
let User = require('../models/users.model');
let Artist = require('../models/artists.model');
const jwt = require('jsonwebtoken');
var ObjectId = require('mongoose').Types.ObjectId;


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
                                        
                                        const token = jwt.sign({id: user._id, username: user.username, email: user.email, img: user.img, songs: user.liked_songs, playlists:user.playlists, artists:user.artists}, process.env.TOKEN_SECRET)
                                        artist.save()
                                            .then(() => res.status(200).json({ token: token,  message: `You started following ${artist.name}. ✔️` }))
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
                                    
                                    const token = jwt.sign({id: user._id, username: user.username, email: user.email, img: user.img, songs: user.liked_songs, playlists:user.playlists, artists:user.artists}, process.env.TOKEN_SECRET)

                                    artist.save()
                                        .then(() => res.status(200).json({token: token,  message: `You stopped following ${artist.name}. 🛑` }))
                                        .catch(() => res.status(500).json({ message: "Something went wrong.. 🤔" }))
                                }
                            })
                            .catch(() => res.status(500).json({ message: "Something went wrong.. 🤔" })))
                    .catch(() => res.status(500).json({ message: "Something went wrong.. 🤔" }))
            }
        })
        .catch(() => res.status(500).json({ message: "Something went wrong.. 🤔" }))

})

module.exports = router;