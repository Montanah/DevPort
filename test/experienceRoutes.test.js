const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;
chai.use(chaiHttp);

describe('experience API', () => {
    userId = '652e5e63856b90c76e79e4e9';

    it('should create a new experience for user with userId', (done) => {
      chai.request(server)
        .post(`/experience/${userId}`)
        .send({ organisation: 'ALX',
                position: 'john@email.com',
                startDate: '120301',
                endDate: '120305',
                achievements: ['Increased number of X followers by 200%'],
                responsibilities: ['Run office errands', 'Make memes'],
                user: `${userId}`,
              }).end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.deep.include({ 
          "organisation": 'ALX',
          "position": 'john@email.com',
          "startDate": '120301',
          "endDate": '120305',
          "achievements": ['Increased number of X followers by 200%'],
          "responsibilities": ['Run office errands', 'Make memes'],
          "user": `${userId}`,
        });
          expect(res.body.user).to.be.eq(`${userId}`)

        createdExperienceId = res.body._id;
          done();
      });
    });

    it('should get all experience records by userId', (done) => {
        chai.request(server)
         .get(`/experience/${userId}/${createdExperienceId}`)
         .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });

    it('should get all experience records by userId', (done) => {
      chai.request(server)
       .get(`/experience/${userId}`)
       .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          done();
        });
    });
});
