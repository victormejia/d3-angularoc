'use strict';

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();

// Connect
gulp.task('connect', function () {
	$.connect.server({
		root: ['slides'],
		port: 9000,
		livereload: true
	});
});

// Scripts
// gulp.task('scripts', function () {
// 	return gulp.src('app/scripts/**/*.js')
// 		.pipe($.jshint('.jshintrc'))
// 		.pipe($.jshint.reporter('default'))
// 		.pipe($.size());
// });

// CSS
gulp.task('css', function () {
	return gulp.src('slides/css/source/main.scss')
		.pipe($.sass())
		.pipe(gulp.dest('slides/css/'));
})

// Watch
gulp.task('watch', ['connect'], function () {
	// Watch for changes in `slides` folder
	gulp.watch([
		'slides/**/*.html',
		'slides/js/**/*.js',
		'slides/css/**/*.scss',
		'slides/demos/**/*.js',
		'slides/demos/demos.css'
	], function(event) {
		console.log(event.path)
		return gulp.src(event.path)
			.pipe($.connect.reload());
	});

	// Watch .js files
	//gulp.watch('slides/js/**/*.js', ['js']);

	// Watch scss files
	gulp.watch('slides/css/**/*.scss', ['css']);
});