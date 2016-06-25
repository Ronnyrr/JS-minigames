/* eslint-disable global-require */
const globby = require('globby');
const gulp = require('gulp');
const gutil = require('gulp-util');

globby.sync(`${__dirname}/tasks/*.js`).forEach(taskFile => require(taskFile));

const tasks = ['babel', 'fonts', 'icons', 'images', 'scripts', 'styles', 'views', 'includes'];

if (gutil.env.dev) {
	tasks.push('nodemon');
}

gulp.task('default', tasks);
