const mongoose = require('mongoose');
const { Schema } = mongoose;

const clubSchema = new Schema({
  teamid: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  logotype: { type: String, required: true }, // Path to logo file
  points: { type: Number, required: true }
});

const Club = mongoose.model('Club', clubSchema);
module.exports = Club;
const gameSchema = new Schema({
    gameID: { type: Schema.Types.ObjectId, required: true },
    homeClub: { type: Schema.Types.ObjectId, ref: 'Club', required: true },  // Reference to Club schema
    homeClubLogo: { type: String, required: true },  // Path to logo file
    awayClub: { type: Schema.Types.ObjectId, ref: 'Club', required: true },  // Reference to Club schema
    awayClubLogo: { type: String, required: true },  // Path to logo file
    time: { type: String, required: true },          // Time as string e.g. "16:00"
    date: { type: Date, required: true }             // Game date
  });
  
  const Game = mongoose.model('Game', gameSchema);
  module.exports = Game;
  const fanSchema = new Schema({
    fanid: { type: Schema.Types.ObjectId, required: true },
    username: { type: String, required: true },
    club: { type: Schema.Types.ObjectId, ref: 'Club', required: true },  // Reference to Club schema (favorite club)
    password: { type: String, required: true },  // Make sure to hash the password before saving
    email: { type: String, required: true, unique: true }
  });
  
  const Fan = mongoose.model('Fan', fanSchema);
  module.exports = Fan;
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
  
  const gameReviewSchema = new Schema({
    reviewID: { type: Schema.Types.ObjectId, required: true },
    gameID: { type: Schema.Types.ObjectId, ref: 'Game', required: true },  // Reference to Game schema
    fanid: { type: Schema.Types.ObjectId, ref: 'Fan', required: true },    // Reference to Fan schema
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },  // Rating out of 5
    date: { type: Date, default: Date.now }
  });
  
  const GameReview = mongoose.model('GameReview', gameReviewSchema);
  module.exports = GameReview;
     