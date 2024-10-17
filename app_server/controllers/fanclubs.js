const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const ClubNews = mongoose.model('ClubNews');
/* GET 'home' page */
const fanClubHome = function(req, res) {
    const games = [
        {
            homeTeam: 'Chelsea',
            homeLogo: '/images/chelsea.png',
            awayTeam: 'Nottingham',
            awayLogo: '/images/nottingham.png',
            time: '14:00',
            date: '2024-10-06'
        },
        {
            homeTeam: 'Aston Villa',
            homeLogo: '/images/astonvilla.png',
            awayTeam: 'Man Utd',
            awayLogo: '/images/man_un.png',
            time: '14:00',
            date: '2024-10-06'
        },
        {
            homeTeam: 'Brighton',
            homeLogo: '/images/brighton.png',
            awayTeam: 'Tottenham',
            awayLogo: '/images/tottenham.png',
            time: '16:30',
            date: '2024-10-06'
        }
    ];

    res.render('fanclub-home', {
        title: 'FunClub Connects',
        games: games
    });
};

/* GET 'Location info' page */
const currentFanClubInfo = function(req, res) {
    const futureGames = [
        {
            homeTeam: 'Chelsea',
            homeLogo: '/images/chelsea.png',
            awayTeam: 'Nottingham',
            awayLogo: '/images/nottingham.png',
            time: '14:00',
            date: '2024-10-06'
        },
        {
            homeTeam: 'Chelsea',
            homeLogo: '/images/chelsea.png',
            awayTeam: 'Arsenal',
            awayLogo: '/images/arsenal.png',
            time: '19:45',
            date: '2024-10-15'
        },
        {
            homeTeam: 'Chelsea',
            homeLogo: '/images/chelsea.png',
            awayTeam: 'Man Utd',
            awayLogo: '/images/man_un.png',
            time: '16:30',
            date: '2024-10-22'
        }
    ];

    const news = [
        {
            image: '/images/chelseaNews1.jpg',
            alt: 'First slide',
            title: "Cole Palmer's hilarious reaction caught on camera as he watches 20-player bust-up",
            description: "Cole Palmer left fans in stitches with his reaction to a furious 20-player bust-up between Chelsea and Nottingham Forest. Sunday's Premier League clash turned sour when a huge brawl broke out late in the second half which could see both teams fined £25,000 for failing to control their players. With the scoreline locked at 1-1, Forest defender Neco Williams tripped Chelsea's Marc Cucurella, sending him tumbling into his own manager, Enzo Maresca."
        },
        {
            image: '/images/chelseaNews2.jpeg',
            alt: 'Second slide',
            title: 'Latest News 2',
            description: 'Some quick example text to build on the news and make up the bulk of the content.'
        },
        {
            image: '/images/chelseaNews3.jpg',
            alt: 'Third slide',
            title: 'Latest News 3',
            description: 'Some quick example text to build on the news and make up the bulk of the content.'
        }
    ];

    res.render('fanclub-events', {
        title: 'Your Fanclub Information',
        futureGames: futureGames,
        news: news
    });
};

/* GET 'Add review' page */
const addReview = function(req, res) {
    res.render('fanclub-review-form', { title: 'Add review' });
};

module.exports = {
    fanClubHome,
    currentFanClubInfo,
    addReview
};