const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema({
    title: { type: String, required: true, unique:false, minLength: 6 },
    path: { type: String, required: true, unique: true, minLength: 6 },
    photo_path: { type: String, required: true, minLength: 6 },
    duration: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String },
    genre: { type: String, minlength: 1}
});

const Song = mongoose.model('Song', songSchema)

module.exports = Song;