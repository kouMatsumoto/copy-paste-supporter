import * as gulp from 'gulp';
import * as tsc from 'gulp-typescript';
import * as typescript from 'typescript';
import {SOURCE_ROOT, DIST_ROOT} from "../constants";

gulp.task('tsc:app', () => {
  const tsConfig = tsc.createProject(`${SOURCE_ROOT}/tsconfig.json`, {typescript: <any>typescript});

  return gulp.src(`${SOURCE_ROOT}/**/*.ts`)
    .pipe(<any>tsc(tsConfig))
    .pipe(gulp.dest(DIST_ROOT));
});