const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
let app = express();

require('dotenv').config();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const authRouter = require('./routes/auth');
const songRouter = require('./routes/song');
const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');
const recommendationRouter = require('./routes/recommendation');

app.use('/auth', authRouter);
app.use('/song', songRouter);
app.use('/artist', artistRouter);
app.use('/album', albumRouter);
app.use('/recommended', recommendationRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
});
