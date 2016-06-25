const gulp = require('gulp');

function run(src) {
	return gulp.src(src)
		.pipe(gulp.dest('dist/public/assets/img'));
}

gulp.task('images', () => {
	const src = [
		'src/images/**',
		'!src/images/icons/*',
	];

	return run(src);
});
