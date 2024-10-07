/* GET about page */
const about = function(req, res) {
    const aboutContent = {
        title: 'About FanClubs Connects',
        welcomeMessage: 'Welcome to FanClubs Connects, your ultimate destination for connecting with fellow sports enthusiasts and staying updated with the latest news and events from your favorite clubs.',
        missionTitle: 'Our Mission',
        missionText: 'At FanClubs Connects, our mission is to bring fans closer to their favorite sports clubs and each other. We aim to create a vibrant community where fans can share their passion, discuss the latest matches, and stay informed about upcoming events.',
        communityTitle: 'Our Community',
        communityText: 'Our community is at the heart of everything we do. We provide a platform for fans to connect, share their experiences, and support their teams together. Whether you\'re a die-hard fan or a casual supporter, you\'ll find a place here at FanClubs Connects.',
        stayUpdatedTitle: 'Stay Updated',
        stayUpdatedText: 'Never miss a moment with our comprehensive coverage of the latest news, match highlights, and exclusive interviews. Our platform ensures you stay informed about all the important happenings in the world of sports.',
        upcomingEventsTitle: 'Upcoming Events',
        upcomingEventsText: 'Be the first to know about upcoming matches, fan meetups, and special events. Our events section keeps you in the loop so you can plan and participate in the activities that matter most to you.',
        joinUsTitle: 'Join Us',
        joinUsText: 'Become a part of the FanClubs Connects community today. Sign up to receive the latest updates, participate in discussions, and connect with fellow fans. Together, we can celebrate the love of sports and create unforgettable memories.',
        images: {
            mission: '/images/mission.jpg',
            community: '/images/community.jpg',
            stayUpdated: '/images/updated.jpg',
            events: '/images/events.jpg'
        }
    };

    res.render('aboutus', aboutContent);
};

module.exports = {
    about
};