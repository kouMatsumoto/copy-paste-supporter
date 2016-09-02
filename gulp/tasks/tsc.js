const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const tsc = require('gulp-typescript');
const typescript = require('typescript');
const config = require('../config');


exports.dependencies = ['tslint'];
exports.task = () => {
  const tsConfig = tsc.createProject('./tsconfig.json', { typescript: typescript });

  return gulp.src(config.tscSrcFiles)
    .pipe(sourcemaps.init())
    .pipe(tsc(tsConfig))
    .pipe(sourcemaps.write('.', { sourceRoot: (file) => file.cwd + config.tscOutDir }))
    .pipe(gulp.dest(config.tscOutDir));
};