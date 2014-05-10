var gulp		= require('gulp'),
	rename		= require('gulp-rename'),
	source		= require('vinyl-source-stream'),
	browserify	= require('browserify'),
	es6ify		= require('es6ify'),
	header		= require('gulp-header'),
	buffer		= require('gulp-buffer'),
	uglify		= require('gulp-uglify'),
	jshint		= require('gulp-jshint');

gulp.task('default', ['build']);

gulp.task('lint', function () {
	gulp.src('src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('build', ['lint'], function () {
	var copyright = require('fs').readFileSync('copyright.js', 'utf8');

	return browserify()
			.add(es6ify.runtime).transform(es6ify)
			.require(require.resolve('./src/idb.js'), { entry: true }).bundle()
			.pipe(source('idb.js'))
			.pipe(buffer())
			.pipe(header(copyright, require('./package.json')))
			.pipe(gulp.dest('dist/'));
});

gulp.task('dist', ['build'], function () {
	gulp.src('dist/idb.js')
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.js', ['build', 'dist']);
});
