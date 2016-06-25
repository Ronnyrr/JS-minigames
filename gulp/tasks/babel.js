/* eslint-disable global-require */
const gulp = require('gulp');
const gutil = require('gulp-util');
const c = gutil.colors;

function run(src) {
	const babel = require('gulp-babel');

	gutil.log(`${c.cyan('babel')}: converting`);
	return gulp.src(src, { base: 'src' })
		.pipe(babel())
		.on('error', function handleError(err) {
			gutil.log(`${c.cyan('babel')}: ${c.red('an error occured')}`);
			console.error(err.stack);
			this.emit('end');
		})
		.pipe(gulp.dest('dist'))
		.on('finish', () => {
			gutil.log(`${c.cyan('babel')}: done`);
		});
}

gulp.task('babel', () => {
	const src = [
		'src/**/*.{js,jsx}',
		'!src/scripts/**/*.{js,jsx}',
		'!src/includes/*.{js,jsx}',
		'!src/includes/**/*.{js,jsx}',
	];

	if (gutil.env.dev) {
		gutil.log(`${c.cyan('babel')}: watching`);
		gulp.watch(src, () => run(src));
	}

	return run(src);
});
