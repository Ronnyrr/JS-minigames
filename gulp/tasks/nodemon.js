/* eslint-disable global-require */
const gulp = require('gulp');
const gutil = require('gulp-util');
const c = gutil.colors;

gulp.task('nodemon', ['babel'], (cb) => {
	require('nodemon')({
		ignore: 'dist/public',
		script: 'dist/server/index.js',
		watch: 'dist',
	})
	.once('start', () => {
		gutil.log(`${c.cyan('nodemon')}: started`);
		cb();
	})
	.on('restart', (files) => {
		gutil.log(`${c.cyan('nodemon')}: ${c.yellow(files[0])} changed - restarting`);
	});
});
