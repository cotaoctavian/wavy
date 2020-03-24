const router = require('express').Router();
let User = require('../models/users.model');
let Playlist = require('../models/playlists.model');
let Songs = require('../models/songs.model');
const jwt = require('jsonwebtoken');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/', (req, res) => {
    Playlist.findById({_id: req.body.id})
            .then((playlist) => {
                if(playlist) {
                    console.log(playlist);
                    res.json({playlist: playlist})
                }
            })
            .catch(err => console.log(err));

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
                                const token = jwt.sign({id: user._id, username: user.username, email: user.email, img: user.img, songs: user.liked_songs, playlists:user.playlists}, process.env.TOKEN_SECRET)
                                res.json({token: token})
                            })
                            .catch((err) => console.log(err));
                    })
            }
        })

})

module.exports = router;