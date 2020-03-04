const router = require('express').Router();
let User = require('../models/users.model');
const bcrypt = require('bcrypt');

router.route('/').post((req, res) => {
    const id = req.body._id;
    User.findById(id)
            .then(user => {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    user.password = hash;
                    user.save()
                        .then(() => res.json("Your password has been updated."))
                        .catch(err => res.status(400).json('Error ' + err))
                })
            })
            .catch(() => res.json("The code is incorrect"));
})

router.route('/profile').post((req, res) => {
    const id = req.body.id;
    User.findById(id)
            .then(user => {
                if(user) {
                    console.log(req.body.password)
                    console.log(user.password)
                    if(bcrypt.compareSync(req.body.password, user.password)){
                        bcrypt.hash(req.body.new_password, 10, (err, hash) => {
                            user.password = hash;
                            user.save()
                                .then(() => res.json({message: "Your password has been updated.", status: "OK"}))
                                .catch(err => res.status(400).json('Error ' + err))
                        })
                    }
                    else {
                        res.json({message: "Your current password is incorrect.", status: "ERR"})
                    }
                }
            })
})

module.exports = router;

module.exports = router;