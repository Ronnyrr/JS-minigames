/* eslint-disable global-require */
const gulp = require('gulp');
const gutil = require('gulp-util');
// const order = require('gulp-order'); .pipe(order['', ''])
// const concat = require('gulp-concat'); .pipe(concat('libraries.js'))
const c = gutil.colors;

function run(src) {
	return gulp.src(src)
		.pipe(gulp.dest('dist/public/assets/inc'))
		.on('finish', () => {
			gutil.log(`${c.cyan('includes')}: done`);
		});
}

gulp.task('includes', () => {
	const src = 'src/includes/*.js';

	if (gutil.env.dev) {
		gutil.log(`${c.cyan('includes')}: watching`);
		gulp.watch([
			'src/includes/*.js',
			'src/includes/**/*.js',
		], () => run(src));
	}

	return run(src);
});
