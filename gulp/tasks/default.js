const runSequence = require('run-sequence');

exports.task = () => {
  runSequence(
    'watch'
  );
};