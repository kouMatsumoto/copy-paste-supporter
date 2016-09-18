import gulp = require('gulp');
import {execNodeTask} from '../task_helpers';


gulp.task('tslint', execNodeTask('tslint', ['-c', 'tslint.json', 'src/**/*.ts']));
gulp.task('stylelint', execNodeTask('stylelint', ['src/**/*.scss', '--config', '.stylelintrc.json', '--syntax', 'scss']));