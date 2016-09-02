const gulp = require('gulp');
const fs = require('fs');

//-- read in all files from gulp/tasks and create tasks for them
fs.readdirSync('./gulp/tasks')
  .filter(filename => filename.match(/\.js$/i))
  .map(filename => ({
    name: filename.substr(0, filename.length - 3),
    contents: require('./gulp/tasks/' + filename)
  }))
  .forEach(file => gulp.task(file.name, file.contents.dependencies, file.contents.task));