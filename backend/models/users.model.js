const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, minlength: 6 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  img: { type: String },
  date: { type: Date, default: Date.now },
  liked_songs: { type: [Schema.Types.ObjectId], default: [] },
  playlists: { type: [Schema.Types.ObjectId], default: [] },
  artists: { type: [Schema.Types.ObjectId], default: [] },
  albums: { type: [Schema.Types.ObjectId], default: [] },
  recommended_playlists: { type: [Schema.Types.ObjectId], default: [] }
});

const User = mongoose.model('User', userSchema)

userSchema.statics.findEmail = function (email) {
  User.find({ email: email }).exec(function (err, docs) {
    if (docs.length) return true;
    return false;
  })
};

module.exports = User;