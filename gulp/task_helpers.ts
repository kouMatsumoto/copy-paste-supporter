import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as gulp from 'gulp';
import * as gulpTs from 'gulp-typescript';
import ReadWriteStream = NodeJS.ReadWriteStream;
import WritableStream = NodeJS.WritableStream;
const resolveBin = require('resolve-bin');


/**
 *  If the string passed in is a glob, returns it, otherwise append '**\/*' to it.
 */
function _globify(maybeGlob: string, suffix = '**/*'): string {
  return maybeGlob.includes('*') ? maybeGlob : path.join(maybeGlob, suffix);
}


/** Options that can be passed to execTask or execNodeTask. */
export interface ExecTaskOptions {
  // Whether to output to STDERR and STDOUT.
  silent?: boolean;
  // If an error happens, this will replace the standard error.
  errMessage?: string;
}


/**
 * If process.platform is win32, exec binPath by node command.
 *
 * @param binPath
 * @param args
 */
function execChildProcessSpawn(binPath: string, args: string[]) {
  if (process.platform !== 'win32') {
    return child_process.spawn(binPath, args);
  }

  args.unshift(binPath);
  return child_process.spawn('node', args);
}


/** Create a task that executes a binary as if from the command line. */
function execTask(binPath: string, args: string[], options: ExecTaskOptions = {}) {
  return (done: (err?: string) => void) => {
    const childProcess = execChildProcessSpawn(binPath, args);

    if (!options.silent) {
      childProcess.stdout.on('data', (data: string) => {
        process.stdout.write(data);
      });

      childProcess.stderr.on('data', (data: string) => {
        process.stderr.write(data);
      });
    }

    childProcess.on('close', (code: number) => {
      if (code != 0) {
        if (options.errMessage === undefined) {
          done('Process failed with code ' + code);
        } else {
          done(options.errMessage);
        }
      } else {
        done();
      }
    });
  }
}


/**
 * Create a task that executes an NPM Bin, by resolving the binary path then executing it. These are
 * binaries that are normally in the `./node_modules/.bin` directory, but their name might differ
 * from the package. Examples are typescript, ngc and gulp itself.
 */
export function execNodeTask(packageName: string, executable: string | string[], args?: string[],
                             options: ExecTaskOptions = {}) {
  if (!args) {
    args = <string[]>executable;
    executable = undefined;
  }

  /**
   * Return function which will be used as gulp task
   */
  return (done: (err: any) => void) => {
    resolveBin(packageName, {executable: executable}, (err: any, binPath: string) => {
      if (err) {
        done(err);
      } else {
        // Forward to execTask.
        execTask(binPath, args, options)(done);
      }
    });
  }
}


/**
 * TS build task based on the options
 */
export function tsBuildTask(tsConfigPathOrDir: string) {
  let tsConfigPath;
  let tsConfigDir;

  // Check Whether tsConfigPathOrDir is directory or path of tsconfig
  try {
    fs.accessSync(path.join(tsConfigPathOrDir, 'tsconfig.json'));
    tsConfigPath = path.join(tsConfigPathOrDir, 'tsconfig.json');
    tsConfigDir = tsConfigPathOrDir;
  } catch (e) {
    tsConfigPath = tsConfigPathOrDir;
    tsConfigDir = path.dirname(tsConfigPathOrDir);
  }

  return () => {
    const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf-8'));
    const dest = path.join(tsConfigDir, tsConfig['compilerOptions']['outDir']);
    const tsProject = gulpTs.createProject(tsConfigPath, {
      typescript: require('typescript')
    });

    return tsProject.src()
      .pipe(<any>gulpTs(tsProject))
      .pipe(gulp.dest(dest));
  }

}