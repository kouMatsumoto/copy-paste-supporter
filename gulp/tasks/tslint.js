const gulp = require('gulp');
const tslint = require('gulp-tslint');
const lint = require('tslint');
const config = require('../config');


exports.task = () => {
  return gulp.src(config.tscSrcFiles)
    .pipe(tslint({
      configuration: './tslint.json',
      tslint: lint
    }))
    .pipe(tslint.report());
};