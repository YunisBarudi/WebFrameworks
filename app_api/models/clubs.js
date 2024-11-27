const mongoose = require('mongoose');
const { Schema } = mongoose;

const clubSchema = new Schema({
  name: { type: String, required: true },
  logotype: { type: String, required: true }, // Path to logo file
  points: { type: Number, required: true }
});

const Club = mongoose.model('Club', clubSchema);
module.exports = Club;