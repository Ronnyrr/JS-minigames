/* eslint-disable global-require */
const gulp = require('gulp');
const gutil = require('gulp-util');
const c = gutil.colors;

function run(src) {
	gutil.log(`${c.cyan('fonts')}: copying`);
	return gulp.src(src)
		.pipe(gulp.dest('dist/public/assets/fonts'))
		.on('finish', () => {
			gutil.log(`${c.cyan('fonts')}: done`);
		});
}

gulp.task('fonts', () => {
	const src = 'src/fonts/*';

	if (gutil.env.dev) {
		gutil.log(`${c.cyan('fonts')}: watching`);
		gulp.watch(src, () => run(src));
	}

	return run(src);
});
