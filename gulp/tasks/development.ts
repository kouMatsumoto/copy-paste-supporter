import {task, src, dest} from 'gulp';
import * as tsc from 'gulp-typescript';
import {join} from 'path';
import * as typescript from 'typescript';
import {SOURCE_ROOT, DIST_ROOT, NPM_MODULES_TO_SERVE_IN_DEVELOP, SOURCE_STATIC_FILES} from "../constants";


/**
 * Transpile typescript files
 */
task('tsc:app', () => {
  const tsConfig = tsc.createProject(`${SOURCE_ROOT}/tsconfig.json`, {typescript: <any>typescript});

  return src(join(SOURCE_ROOT, '**/*.ts'))
    .pipe(<any>tsc(tsConfig))
    .pipe(dest(DIST_ROOT));
});


/**
 * Copy dependency files required in development to dist
 * Run just once after npm post install
 */
task('copy:node-modules-to-serve', () => {
  return src(NPM_MODULES_TO_SERVE_IN_DEVELOP, {base: 'node_modules'})
    .pipe(dest(join(DIST_ROOT, 'node_modules')));
});


/**
 * Copy static files
 */
task('copy:static-files', () => {
  return src(SOURCE_STATIC_FILES)
    .pipe(dest(DIST_ROOT));
});

