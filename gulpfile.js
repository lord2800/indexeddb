var gulp = require('gulp'),
	rename = require('gulp-rename'),
	browserify = require('gulp-browserify'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint');

gulp.task('default', ['build']);

gulp.task('lint', function () {
	gulp.src('src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('build', ['lint'], function () {
	gulp.src('src/idb.js')
		.pipe(browserify({
			ignoreMissing: true
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('dist', ['build'], function () {
	gulp.src('dist/idb.js')
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.js', ['build', 'dist']);
});
