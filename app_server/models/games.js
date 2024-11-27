const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
  homeClub: { type: Schema.Types.ObjectId, ref: 'Club', required: true },  // Reference to Club schema
  homeClubLogo: { type: String, required: true },  // Path to logo file
  awayClub: { type: Schema.Types.ObjectId, ref: 'Club', required: true },  // Reference to Club schema
  awayClubLogo: { type: String, required: true },  // Path to logo file
  time: { type: String, required: true },          // Time as string e.g. "16:00"
  date: { type: Date, required: true }             // Game date
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;