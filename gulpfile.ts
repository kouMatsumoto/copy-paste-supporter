/**
 * Install gulp in global and just run gulp with tasks.
 * Need not to transpile ts, automatically gulp will resolve ts using ts-node
 *
 * This gulpfile is simply loads the tasks inside ./gulp/tasks
 */
import * as path from 'path';

// Register TS compilation using tsconfig.json.
require('ts-node').register({
  project: path.join(__dirname, 'gulp')
});

// Load gulp tasks
import './gulp/tasks/default';
import './gulp/tasks/development';
import './gulp/tasks/lint';