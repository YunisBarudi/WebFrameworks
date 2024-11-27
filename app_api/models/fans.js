const mongoose = require('mongoose');
const { Schema } = mongoose;

const fanSchema = new Schema({
  username: { type: String, required: true },
  club: { type: Schema.Types.ObjectId, ref: 'Club', required: true },  // Reference to Club schema (favorite club)
  password: { type: String, required: true },  // Make sure to hash the password before saving
  email: { type: String, required: true, unique: true }
});

const Fan = mongoose.model('Fan', fanSchema);
module.exports = Fan;