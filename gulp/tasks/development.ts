import {task, src, dest} from 'gulp';
import {join} from 'path';
import {SOURCE_ROOT, DIST_ROOT, NPM_MODULES_TO_SERVE_IN_DEVELOP, SOURCE_STATIC_FILES} from "../constants";
import WritableStream = NodeJS.WritableStream;
import {tsBuildTask} from '../task_helpers';


/**
 * Transpile typescript files
 */
task('tsc:app', tsBuildTask(join(SOURCE_ROOT)));


/**
 * Copy dependency files required in development to dist
 * Run just once after npm post install
 */
task('copy:node-modules-to-serve', () => {
  return src(NPM_MODULES_TO_SERVE_IN_DEVELOP, {base: 'node_modules'})
    .pipe(<WritableStream>dest(join(DIST_ROOT, 'node_modules')));
});


/**
 * Copy static files
 */
task('copy:static-files', () => {
  return src(SOURCE_STATIC_FILES)
    .pipe(<WritableStream>dest(DIST_ROOT));
});

