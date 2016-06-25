/* eslint-disable global-require */
const gulp = require('gulp');
const gutil = require('gulp-util');
const swig = require('gulp-swig');
const c = gutil.colors;

function run(src) {
	gutil.log(`${c.cyan('views')}: copying`);

	const swigOptions = {
		defaults: { cache: false, locals: { simlink: '../public' } },
	};

	return gutil.env.dev
		? gulp.src(src)
			.pipe(gulp.dest('dist/views'))
		: gulp.src(src)
			.pipe(swig(swigOptions))
			.pipe(gulp.dest('dist/views'));
}

gulp.task('views', () => {
	const src = [
		'src/views/*.html',
		'src/views/**/*.html',
	];

	if (gutil.env.dev) {
		gutil.log(`${c.cyan('views')}: watching`);
		gulp.watch(src, () => run(src));
	}

	return run(src);
});
