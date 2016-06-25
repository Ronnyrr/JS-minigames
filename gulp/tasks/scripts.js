/* eslint-disable global-require,strict */'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const c = gutil.colors;

/**
 * Bundle given bundler
 *
 * @param {Object} bundler
 * @param {String} bundleName
 * @param {Array} files
 */
function run(bundler, bundleName, files) {
	const sourcemaps = require('gulp-sourcemaps');

	if (files) {
		gutil.log(`${c.cyan('scripts')}: ${c.yellow(files[0].replace(process.cwd(), '.'))}  changed - bundling ${c.yellow(bundleName)}`);
	} else {
		gutil.log(`${c.cyan('scripts')}: bundling ${c.yellow(bundleName)}`);
	}

	return bundler.bundle()
		.on('error', err => console.error(err.message))
		.pipe(require('vinyl-source-stream')(bundleName))
		.pipe(require('vinyl-buffer')())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(gutil.env.dev ? gutil.noop() : require('gulp-uglify')())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/public/assets/js'));
}

/**
 * Bundle scripts for browser usage
 */
gulp.task('scripts', () => {
	let bundler = require('browserify')('src/scripts', {
		debug: true,
		extensions: ['.jsx'],
		transform: [require('babelify')],
	});

	if (gutil.env.dev) {
		gutil.log(`${c.cyan('scripts')}: watching`);

		bundler = require('watchify')(bundler);
		bundler.on('update', files => {
			run(bundler, 'app.js', files);
		});
	}

	return run(bundler, 'app.js');
});
