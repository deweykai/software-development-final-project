const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

require('dotenv').config();

chai.use(chaiHttp);

const app = require('../app');

describe('Review API', () => {
  it('return list of reviews', (done) => {
    chai.request(app)
      .get('/api/review/')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');

        done();
      });
  });
});

describe('Pages', () => {
  it('GET /', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        done();
      });
  });

  it('GET /reviews', (done) => {
    chai.request(app)
      .get('/reviews')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        done();
      });
  });

  it('GET /invalid', (done) => {
    chai.request(app)
      .get('/invalid')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);

        done();
      });
  });
});
