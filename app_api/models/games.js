const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
    gameID: { type: Schema.Types.ObjectId, required: true },  // Include gameID in the schema
    homeClub: { type: Schema.Types.ObjectId, ref: 'Club', required: true },
    homeClubLogo: { type: String, required: true },
    awayClub: { type: Schema.Types.ObjectId, ref: 'Club', required: true },
    awayClubLogo: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: Date, required: true }
  });
  

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;