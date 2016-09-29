import {join} from 'path';

export const PROJECT_ROOT = join(__dirname, '..');
export const SOURCE_ROOT = join(PROJECT_ROOT, 'src');
export const DIST_ROOT = join(PROJECT_ROOT, 'dist');

export const NPM_MODULES_TO_SERVE_IN_DEVELOP: string[] = [
  join(PROJECT_ROOT, 'node_modules/@angular/core/bundles/core.umd.js'),
  join(PROJECT_ROOT, 'node_modules/@angular/common/bundles/common.umd.js'),
  join(PROJECT_ROOT, 'node_modules/@angular/compiler/bundles/compiler.umd.js'),
  join(PROJECT_ROOT, 'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js'),
  join(PROJECT_ROOT, 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js'),
  join(PROJECT_ROOT, 'node_modules/@angular/http/bundles/http.umd.js'),
  join(PROJECT_ROOT, 'node_modules/@angular/router/bundles/router.umd.js'),
  join(PROJECT_ROOT, 'node_modules/@angular/forms/bundles/forms.umd.js'),
  join(PROJECT_ROOT, 'node_modules/@angular2-material/core/**/*.js'),
  join(PROJECT_ROOT, 'node_modules/@angular2-material/button/**/*.js'),
  join(PROJECT_ROOT, 'node_modules/@angular2-material/icon/**/*.js'),
  join(PROJECT_ROOT, 'node_modules/rxjs/**/*.js'),
  join(PROJECT_ROOT, 'node_modules/core-js/client/shim.min.js'),
  join(PROJECT_ROOT, 'node_modules/zone.js/dist/zone.js'),
  join(PROJECT_ROOT, 'node_modules/reflect-metadata/Reflect.js'),
  join(PROJECT_ROOT, 'node_modules/systemjs/dist/system.src.js')
];

export const SOURCE_STATIC_FILES: string[] = [
  join(SOURCE_ROOT, 'index.html'),
  join(SOURCE_ROOT, 'systemjs.config.js')
];