import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js'; // Adjust the import path

const should = chai.should();

chai.use(chaiHttp);

describe('Games', () => {
  it('should list ALL games on /api/games GET', (done) => {
    chai.request(app)
      .get('/api/games')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      });
  });

  it('should add a SINGLE game on /api/games POST', (done) => {
    chai.request(app)
      .post('/api/games')
      .send({
        homeClub: '60d5ec49f1b2c72d88e1e8b1',
        homeClubLogo: 'home_logo.png',
        awayClub: '60d5ec49f1b2c72d88e1e8b2',
        awayClubLogo: 'away_logo.png',
        time: '16:00',
        date: '2023-10-10'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('homeClub');
        res.body.should.have.property('homeClubLogo');
        res.body.should.have.property('awayClub');
        res.body.should.have.property('awayClubLogo');
        res.body.should.have.property('time');
        res.body.should.have.property('date');
        done();
      });
  });

  it('should list a SINGLE game on /api/games/:gameid GET', (done) => {
    const gameId = '60d5ec49f1b2c72d88e1e8b3';
    chai.request(app)
      .get(`/api/games/${gameId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('homeClub');
        res.body.should.have.property('homeClubLogo');
        res.body.should.have.property('awayClub');
        res.body.should.have.property('awayClubLogo');
        res.body.should.have.property('time');
        res.body.should.have.property('date');
        done();
      });
  });

  it('should update a SINGLE game on /api/games/:gameid PUT', (done) => {
    const gameId = '60d5ec49f1b2c72d88e1e8b3';
    chai.request(app)
      .put(`/api/games/${gameId}`)
      .send({
        homeClub: '60d5ec49f1b2c72d88e1e8b1',
        homeClubLogo: 'new_home_logo.png',
        awayClub: '60d5ec49f1b2c72d88e1e8b2',
        awayClubLogo: 'new_away_logo.png',
        time: '18:00',
        date: '2023-10-11'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('homeClub');
        res.body.should.have.property('homeClubLogo');
        res.body.should.have.property('awayClub');
        res.body.should.have.property('awayClubLogo');
        res.body.should.have.property('time');
        res.body.should.have.property('date');
        done();
      });
  });

  it('should delete a SINGLE game on /api/games/:gameid DELETE', (done) => {
    const gameId = '60d5ec49f1b2c72d88e1e8b3';
    chai.request(app)
      .delete(`/api/games/${gameId}`)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});