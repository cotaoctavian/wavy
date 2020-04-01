const router = require('express').Router();
let User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)){
                const token = jwt.sign({id: user._id, username: user.username, email: user.email, img: user.img, songs: user.liked_songs, playlists:user.playlists, artists:user.artists}, process.env.TOKEN_SECRET)
                res.json({token})
            } else {
                res.json({message: "Incorrect email or password. ❌"});
            }
        }
        else {
            res.json({message: "Incorrect email or password. ❌"});
        }
    })
    .catch(err => res.json({message: 'Error' + err}));
})

module.exports = router;