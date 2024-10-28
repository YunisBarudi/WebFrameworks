const mongoose = require('mongoose');
const { Schema } = mongoose;

const clubNewsSchema = new Schema({
  newsID: { type: Schema.Types.ObjectId, required: true },
  club: { type: Schema.Types.ObjectId, ref: 'Club', required: true },  // Reference to Club schema
  title: { type: String, required: true },
  alt: { type: String, required: true },  // Alt text for the image
  image: { type: String, required: true },  // Path to image file (.jpg)
  description: { type: String, required: true }
});

const ClubNews = mongoose.model('ClubNews', clubNewsSchema);
module.exports = ClubNews;