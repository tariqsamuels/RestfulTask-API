const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect('mongodb://localhost/tasks', {useNewUrlParser:  true});

const modelPath = path.join(__dirname, './../models/');

fs.readdirSync(modelPath).forEach((file)=> {
  if(file.indexOf('.js') >= 0) {
    require(modelPath + '/' + file);
  }
})
