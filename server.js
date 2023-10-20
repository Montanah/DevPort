const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const educationRoutes = require('./routes/education');
const experienceRoutes = require('./routes/experience');
const projectRoutes = require('./routes/project');
const skillRoutes = require('./routes/skill');
require('dotenv').config();
const app = express();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const authURL = process.env.AUTHURL
const clientID = process.env.CLIENTID 
const clientSecret = process.env.SECRET 
const oauth = process.env.OAUTH 

mongoose.connect('mongodb://localhost/devport', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/education', educationRoutes);
app.use('/experience', experienceRoutes);
app.use('/project', projectRoutes);
app.use('/skill', skillRoutes);

app.get('/oauth', (req, res) => {
  res.redirect(`${authURL}`);
})

app.get("/callback", (req, res) => {
  axios.post(`${oauth}`, {
      client_id: `${clientID}`,
      client_secret: `${clientSecret}`,
      code: req.query.code
  }, {
      headers: {
          Accept: "application/json"
      }
  }).then((result) => {
      console.log(result.data.access_token)
      res.json({token: result.data.access_token});
      res.send("you are authorized " + result.data.access_token);
  }).catch((err) => {
      console.log(err);
  });
});

app.listen(port, host, () => {
  console.log(`The server is running on ${host}:${port}`)
})

module.exports = app;