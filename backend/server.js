const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const fileUpload = require('express-fileupload');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
app.use(morgan('dev'));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
});

const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const passRouter = require('./routes/resetpass');
const resetRouter = require('./routes/reset');
const profileRouter = require('./routes/profile')
const uploadRouter = require('./routes/upload');
const songRouter = require('./routes/songs');
const playlistRouter = require('./routes/playlists');
const artistRouter = require('./routes/artist');

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/resetpass', passRouter);
app.use('/reset', resetRouter);
app.use('/profile', profileRouter);
app.use('/upload', uploadRouter);
app.use('/song', songRouter);
app.use('/playlist', playlistRouter);
app.use('/artist', artistRouter);
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
