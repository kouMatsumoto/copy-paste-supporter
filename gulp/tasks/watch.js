const gulp = require('gulp');
const runSequence = require('run-sequence');
const config = require('../config');


exports.task = () => {
  // Watch Typescript files
  gulp.watch(config.tscSrcFiles, () => runSequence(
    'tsc'
  ));
};