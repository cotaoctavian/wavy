const router = require('express').Router();
let Songs = require('../models/songs.model');
let User = require('../models/users.model');
const jwt = require('jsonwebtoken');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/', (req, res) => {

    Songs.findById({ _id: req.body.song })
        .then(song => {
            if (song) {
                res.json({info: song})
            }
        })
        .catch(err => console.log(err))
})

router.post('/info', (req, res) => {
    
    Songs.findOne({path: req.body.name})
        .then(song => {
            if(song) res.json({info: song})
        })
        .catch(err => console.log(err))
});

router.post('/dislike', (req, res) => {
    Songs.findOne({path: req.body.name})
        .then(song => {
            if(song) {
                User.findById({ _id: req.body.id})
                    .then(user => {
                        if(user) {
                            liked_songs = user.liked_songs;
                            let i;
                            for(i = 0; i < liked_songs.length; i++){
                                if(new ObjectId(liked_songs[i]).equals(song._id)){
                                    liked_songs.splice(i, 1);
                                }
                            }
                            
                            user.liked_songs = liked_songs;
                            user.save()
                                .then(() => {
                                    const token = jwt.sign({id: user._id, username: user.username, email: user.email, img: user.img, songs: user.liked_songs, playlists:user.playlists, artists:user.artists, albums: user.albums}, process.env.TOKEN_SECRET)
                                    res.json({token: token})
                                })
                                .catch(() => console.log(err))
                        }
                    })
            }
        })
});

router.post('/like', (req, res) => {
    Songs.findOne({path: req.body.name})
        .then(song => {
            if(song) {
                User.findById({ _id: req.body.id})
                    .then(user => {
                        if(user) {
                            liked_songs = user.liked_songs;
                            let i, check = 0;
                            for(i = 0; i < liked_songs.length; i++){
                                if(new ObjectId(liked_songs[i]).equals(song._id)){
                                    check = 1;
                                }
                            }

                            if(check === 0) {
                                liked_songs.push(song._id)
                            }
                            user.liked_songs = liked_songs;
                            user.save()
                                .then(() => {
                                    const token = jwt.sign({id: user._id, username: user.username, email: user.email, img: user.img, songs: user.liked_songs, playlists:user.playlists, artists:user.artists, albums: user.albums}, process.env.TOKEN_SECRET)
                                    res.json({token: token})
                                })
                                .catch(() => console.log(err))
                        }
                    })
            }
        })
});

module.exports = router