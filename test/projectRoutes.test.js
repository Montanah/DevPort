const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;
chai.use(chaiHttp);

describe('project API', () => {
    userId = '652e5e63856b90c76e79e4e9';

    it('should create a new project for user with userId', (done) => {
      chai.request(server)
        .post(`/project/${userId}`)
        .send({ name: 'alx-backend_user_data',
                repoURL: 'http://github.com/john_d_doe/alx-backend_user_data',
                liveURL: 'http://github.io/alx-backend_user_data',
                description: 'This repo consists of javascript and python language backend frameowrks',
                user: `${userId}`,
              }).end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.deep.include({ 
            "name": 'alx-backend_user_data',
            "repoURL": 'http://github.com/john_d_doe/alx-backend_user_data',
            "liveURL": 'http://github.io/alx-backend_user_data',
            "description": 'This repo consists of javascript and python language backend frameowrks',
            "user": `${userId}`,
        });
          expect(res.body.user).to.be.eq(`${userId}`)

        createdProjectId = res.body._id;
          done();
      });
    });

    it('should get all project records by userId', (done) => {
        chai.request(server)
         .get(`/project/${userId}/${createdProjectId}`)
         .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });

    it('should get all project records by userId', (done) => {
      chai.request(server)
       .get(`/project/${userId}`)
       .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          done();
        });
    });
});
