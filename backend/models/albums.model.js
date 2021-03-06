const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const albumSchema = new Schema({
    artistId: { type: Schema.Types.ObjectId, required: true },
    artist: { type: String, required: true },
    name: { type: String, required: true, minLength: 1 },
    photo: { type: String, minLength: 6 },
    year: { type: Number, required: true },
    tracks: { type: [Schema.Types.ObjectId], default: [] }
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;

