const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Game = mongoose.model('Game');
const ClubNews = mongoose.model('ClubNews');
const Club = mongoose.model('Club');
const Fan = mongoose.model('Fan');

// List all games
const gamesList = async function(req, res) {
  try {
    const games = await Game.find({})
      .populate('homeClub', 'name logotype')
      .populate('awayClub', 'name logotype');
    res.status(200).json(games);
  } catch (err) {
    console.error("Error fetching games:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new game
const gamesCreate = async function(req, res) {
  try {
    const game = await Game.create({
      homeClub: req.body.homeClub,
      homeClubLogo: req.body.homeClubLogo,
      awayClub: req.body.awayClub,
      awayClubLogo: req.body.awayClubLogo,
      time: req.body.time,
      date: req.body.date
    });
    res.status(201).json(game);
  } catch (err) {
    console.error("Error creating game:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read a single game by ID
const gamesReadOne = async function(req, res) {
  try {
    const game = await Game.findById(req.params.gameid)
      .populate('homeClub', 'name logotype')
      .populate('awayClub', 'name logotype');
    if (!game) {
      res.status(404).json({ "message": "gameid not found" });
    } else {
      res.status(200).json(game);
    }
  } catch (err) {
    console.error("Error fetching game:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a game by ID
const gamesUpdateOne = async function(req, res) {
  try {
    const game = await Game.findById(req.params.gameid);
    if (!game) {
      res.status(404).json({ "message": "gameid not found" });
    } else {
      game.homeClub = req.body.homeClub;
      game.homeClubLogo = req.body.homeClubLogo;
      game.awayClub = req.body.awayClub;
      game.awayClubLogo = req.body.awayClubLogo;
      game.time = req.body.time;
      game.date = req.body.date;
      const updatedGame = await game.save();
      res.status(200).json(updatedGame);
    }
  } catch (err) {
    console.error("Error updating game:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a game by ID
const gamesDeleteOne = async function(req, res) {
  try {
    const game = await Game.findByIdAndDelete(req.params.gameid);
    if (!game) {
      res.status(404).json({ "message": "gameid not found" });
    } else {
      res.status(204).json(null);
    }
  } catch (err) {
    console.error("Error deleting game:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// List all clubs
const clubsList = async function(req, res) {
  try {
    const clubs = await Club.find({});
    res.status(200).json(clubs);
  } catch (err) {
    console.error("Error fetching clubs:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// List all club news
const newsList = async function(req, res) {
  try {
    const news = await ClubNews.find({});
    res.status(200).json(news);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new club news
const newsCreate = async function(req, res) {
  try {
    const news = await ClubNews.create({
      club: req.body.club,
      title: req.body.title,
      alt: req.body.alt,
      image: req.body.image,
      description: req.body.description
    });
    res.status(201).json(news);
  } catch (err) {
    console.error("Error creating news:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read a single club news by ID
const newsReadOne = async function(req, res) {
  try {
    const news = await ClubNews.findById(req.params.newsid);
    if (!news) {
      res.status(404).json({ "message": "newsid not found" });
    } else {
      res.status(200).json(news);
    }
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a club news by ID
const newsUpdateOne = async function(req, res) {
  try {
    const news = await ClubNews.findById(req.params.newsid);
    if (!news) {
      res.status(404).json({ "message": "newsid not found" });
    } else {
      news.club = req.body.club;
      news.title = req.body.title;
      news.alt = req.body.alt;
      news.image = req.body.image;
      news.description = req.body.description;
      const updatedNews = await news.save();
      res.status(200).json(updatedNews);
    }
  } catch (err) {
    console.error("Error updating news:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a club news by ID
const newsDeleteOne = async function(req, res) {
  try {
    const news = await ClubNews.findByIdAndRemove(req.params.newsid);
    if (!news) {
      res.status(404).json({ "message": "newsid not found" });
    } else {
      res.status(204).json(null);
    }
  } catch (err) {
    console.error("Error deleting news:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new fan
const fansCreate = async function(req, res) {
  try {
    console.log('Received data:', req.body); // Log received data

    // Check if the club exists
    let club = await Club.findById(req.body.clubID);
    if (!club) {
      // Create the club if it doesn't exist
      club = await Club.create({
        _id: req.body.clubID,
        name: req.body.clubName,
        logotype: '', // Add appropriate logotype if needed
        points: 0// Add appropriate points if needed
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const fan = await Fan.create({
      username: req.body.username,
      club: club._id,
      clubName: req.body.clubName,
      password: hashedPassword,
      email: req.body.email,
      isAdmin: false
    });
    console.log('Created fan:', fan); // Log created fan
    res.status(201).json(fan);
  } catch (err) {
    console.error("Error creating fan:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login a fan
const login = function(req, res, next) {
  console.log('Login route called');
  passport.authenticate('local', function(err, fan, info) {
    if (err) {
      console.log('Error in passport authenticate:', err);
      return next(err);
    }
    if (!fan) {
      console.log('Authentication failed:', info.message);
      return res.status(401).json({ message: info.message });
    }
    req.logIn(fan, function(err) {
      if (err) {
        console.log('Error in req.logIn:', err);
        return next(err);
      }
      console.log('Authentication successful');
      req.session.user = fan; // Store user in session
      return res.status(200).json({ message: 'Authentication successful', user: fan });
    });
  })(req, res, next);
};

// Logout a fan
const logout = function(req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy(); // Destroy session
    res.redirect('/');
  });
};
// List news by club ID

const newsListByClub = async function(req, res) {
  try {
    const clubId = new mongoose.Types.ObjectId(req.params.clubId);
    const news = await ClubNews.find({ clubId: clubId });
    if (!news.length) {
      res.status(404).json({ "message": "No news found for this club" });
    } else {
      res.status(200).json(news);
    }
  } catch (err) {
    console.error("Error fetching news by club:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// List games by club ID
const gamesListByClub = async function(req, res) {
  try {
    const clubId = new mongoose.Types.ObjectId(req.params.clubId);
    const games = await Game.find({ $or: [{ homeClub: clubId }, { awayClub: clubId }] });
    if (!games.length) {
      res.status(404).json({ "message": "No games found for this club" });
    } else {
      res.status(200).json(games);
    }
  } catch (err) {
    console.error("Error fetching games by club:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const reviewsCreate = async function(req, res) {
  try {
    const game = '674b18dfb734478769b880ce';
    const fan = '674b019c45fa427c8bbde1e1';

    if (!game || !fan) {
      return res.status(404).json({ message: 'Game or Fan not found' });
    }

    const review = await GameReview.create({
      gameID: req.body.gameID,
      fanid: req.body.fanID,
      comment: req.body.comment,
      rating: req.body.rating,
      date: req.body.date || Date.now() // Use provided date or current date
    });

    res.status(201).json(review);
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  gamesList,
  gamesCreate,
  gamesReadOne,
  gamesUpdateOne,
  gamesDeleteOne,
  clubsList,
  newsList,
  newsCreate,
  newsReadOne,
  newsUpdateOne,
  newsDeleteOne,
  newsListByClub,
  gamesListByClub,
  fansCreate,
  login,
  logout,
  reviewsCreate
};