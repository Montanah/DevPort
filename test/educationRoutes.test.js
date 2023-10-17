const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;
chai.use(chaiHttp);

describe('education API', () => {
    it('should create a new education for user with userId', (done) => {
      chai.request(server)
        .post('/education/652e5e63856b90c76e79e4e9')
        .send({ institution: 'John Doe',
                course: 'john@email.com',
                startDate: '120301',
                endDate: '120305',
                location: 'Abuja',
                user: '652e5e63856b90c76e79e4e9'
              }).end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.deep.include({
            "institution": "John Doe",
            "course": "john@email.com",
            "startDate": "120301",
            "endDate": "120305",
            "location": "Abuja",});
          expect(res.body.user).to.be.eq('652e5e63856b90c76e79e4e9')

        createdEducationId = res.body._id;
          done();
      });
    });

    it('should get all education records by userId', (done) => {
        chai.request(server)
         .get('/education/652e5e63856b90c76e79e4e9/652e677ef61932e3a5e49daf')
         .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });

    it('should get all education records by userId', (done) => {
      chai.request(server)
       .get('/education/652e5e63856b90c76e79e4e9')
       .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          done();
        });
    });
});
