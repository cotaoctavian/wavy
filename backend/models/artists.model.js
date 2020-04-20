const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const artistSchema = new Schema({
    name: { type: String, minLength: 1, required: true },
    photo: { type: String, required: true },
    albums: { type: [Schema.Types.ObjectId], default: [] },
    singles: { type: [Schema.Types.ObjectId], default: [] },
    followers: { type: Number, default: 0 },
})

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;