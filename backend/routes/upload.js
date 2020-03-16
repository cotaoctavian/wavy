const router = require('express').Router();
let User = require('../models/users.model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

router.post('/:id', (req, res) => {
    if(req.files == null){
        return res.status(400).json({msg: 'No file uploaded'});
    }

    const id = req.params.id


    const file = req.files.file;
    file.name = file.name.split('.')[0] + '_' + crypto.randomBytes(6).toString('hex') + '_' + Date.now() + "." + file.name.split('.')[1]


    file.mv(`${process.cwd()}/public/images/${file.name}`, err => {
        if(err) {
            console.log(err);
            return res.status(500).send(err);
        } else { 
            User.findById(id)
                .then(user => {
                    if(user) {
                        user.img = `images/${file.name}`
                        const jwt_data = {id: user._id, username: user.username, email: user.email, img: user.img, songs: user.liked_songs}
                        user.save()
                            .then(() => res.json({message: "Your profile picture has been changed.", token: jwt.sign(jwt_data, process.env.TOKEN_SECRET), fileName: file.name, filePath: `images/${file.name}`}))
                            .catch(err => res.status(400).send(err))
                    }
                })
        }
    })
})

module.exports = router;