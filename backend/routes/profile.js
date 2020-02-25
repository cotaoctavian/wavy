const router = require('express').Router();
let User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

router.post('/update_email', (req, res) => {
    User.findOne({ email: req.body.new_email })
        .then(user => {
            if (user) {
                res.json({ message: "This email belongs to another user." })
            }
            else {
                User.findOne({
                    email: req.body.email
                }).then(new_user => {
                    if (new_user) {
                        if (bcrypt.compareSync(req.body.password, new_user.password)) {
                            const token = jwt.sign({ _id: new_user._id, new_email: req.body.new_email }, process.env.REFRESH_TOKEN, { expiresIn: 30 * 10 })
                            const url = `http://localhost:5000/profile/confirm/${token}`
                            const mailOptions = {
                                from: process.env.GMAIL_USER,
                                to: req.body.email,
                                subject: 'Wavy',
                                text: `Confirm email your new email address by pressing the link: ${url} .`
                            }

                            transporter.sendMail(mailOptions, (err, info) => {
                                if (err) console.log(err);
                                else console.log('Email sent: ' + info.response);
                            });
                            res.status(200).json({ message: "An email has been sent. Please confirm it." })
                        }
                    }
                }).catch(err => {
                    res.status(400).json({ message: "Error " + err })
                })
            }
        })
        .catch(err => {
            res.json({ message: "Error " + err })
        })
});

router.post('/update_username', async (req, res) => {
    try {
        await User.findById(req.body.id)
            .then(user => {
                if (user) {
                    if (user.username === req.body.username) {
                        res.json({ message: "You already own this username." })
                    } else {
                        user.username = req.body.username
                        const jwt_data = {id: user._id, email: user.email, username: user.username, img: user.img}
                        user.save()
                            .then(() => res.json({ message: "Username updated successfully.", token: jwt.sign(jwt_data, process.env.TOKEN_SECRET)}))
                            .catch(err => {
                                res.json({ message: "The username is too short. Minimum 6 characters "})
                            })
                    }
                }
            })
    }
    catch (e) {
        res.status(400).json({ message: "Error " + err })
    }
})

router.get('/confirm/:token', async (req, res) => {
    try {
        const data = jwt.verify(req.params.token, process.env.REFRESH_TOKEN)
        await User.findById(data._id)
            .then(user => {
                if (user) {
                    user.email = data.new_email
                    user.save()
                        .then(() => console.log("Your email has been updated."))
                        .catch(err => res.status(400).json('Error ' + err))
                }
            })
            .catch(err => console.log(err))

        return res.redirect("http://localhost:3000/login")
    }
    catch (e) {
        res.status(400).json({ message: "Error " + err })
    }
})

module.exports = router;