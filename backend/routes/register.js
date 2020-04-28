const router = require('express').Router();
let User = require('../models/users.model');

const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

router.route('/').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const img = "images/user_avatar.svg";

    const newUser = new User({username, email, password, img});

    User.findOne({
        email: req.body.email,
    })
    .then(user => {
        if(!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                newUser.password = hash;
                newUser.save()
                .then((user) => res.json({message: "Registration added!", userId: user._id, username: user.username}))
                .catch(err => res.status(400).json('Error: ' + err));
            })

            const mailOptions = {
                from: process.env.GMAIL_USER,
                to: req.body.email,
                subject: 'Music player registration',
                text: `Thanks you for signing up to our site, ${req.body.username}!`
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if(err) console.log(err);
                else console.log('Email sent: ' + info.response);
            });
        }
        else {
            res.json('Username or email already exists!')
        }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;  