const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    title: {type: String, required: true, minLength: 6},
    songs: {type: [Schema.Types.ObjectId], default: []},
    date: { type: Date, default: Date.now }
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;