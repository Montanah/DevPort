const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const educationRoutes = require('./routes/education');
const experienceRoutes = require('./routes/experience');
const projectRoutes = require('./routes/project');
const skillRoutes = require('./routes/skill');
const app = express();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

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

app.listen(port, host, () => {
  console.log(`The server is running on ${host}:${port}`)
})

module.exports = app;