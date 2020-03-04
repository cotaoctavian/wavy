const router = require("express").Router();
let User = require("../models/users.model");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

router.route("/").post((req, res) => {
    const email = req.body.email;

    User.findOne({
        email: email
    })
    .then(user => {
            if(user){
                const mailOptions = {
                    from: process.env.GMAIL_USER,
                    to: req.body.email,
                    subject: 'Music player reset password',
                    text: `Hi, ${user.username}! 
                    \n You recently requested to reset your password for your Music Player account. 
                    \n The code to reset your password is: ${user._id}. 
                    \n Click the link below to reset your password: http://localhost:3000/resetpass.
                    \n If you didn't make this request you can ignore this email! 
                    \n For support you can email: cotaoctavian99@gmail.com </p>
                    \n Thank you! `
                }
    
                transporter.sendMail(mailOptions, (err, info) => {
                    if(err) console.log(err);
                    else res.json('An email has been sent!');
                });
            }
            else {
                res.json("User not found!");
            }
        }   
    )
    .catch(err => res.status(400).json("Error: " + err));
})

module.exports = router;