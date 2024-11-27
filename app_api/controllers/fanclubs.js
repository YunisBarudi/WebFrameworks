const mongoose = require('mongoose');
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
    const game = await Game.findByIdAndRemove(req.params.gameid);
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
    const fan = await Fan.create({
      username: req.body.username,
      club: req.body.club,
      password: req.body.password,
      email: req.body.email
    });
    res.status(201).json(fan);
  } catch (err) {
    console.error("Error creating fan:", err);
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
  fansCreate
};