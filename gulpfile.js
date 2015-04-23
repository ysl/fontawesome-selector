var gulp = require('gulp');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var htmlreplace = require('gulp-html-replace');


var path = {
  HTML: 'src/index.html',
  LESS: 'src/less/app.less',
  JS: 'src/js/*.js',
  
  CSS_OUT: 'icon-selector.css',
  CSS_MINIFIED_OUT: 'icon-selector.min.css',

  JS_OUT: 'icon-selector.js',
  JS_MINIFIED_OUT: 'icon-selector.min.js',

  DEST: 'dist',
  DEST_SRC: 'dist/src',
  DEST_BUILD: 'dist/build',
};


gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('less', function(){
  gulp.src(path.LESS)
  	.pipe(less())
  	
  	.pipe(rename(path.CSS_OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('css', function(){
  return gulp.src([
	  	"src/bootstrap/css/bootstrap.css"
  	])
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('js', function(){
  return gulp.src([
	  	"src/js/icons.js", 
	  	"src/js/webchef.js", 
	  	"src/bootstrap/js/bootstrap.js", 
	  	"src/js/app.js"
  	])
    .pipe(gulp.dest(path.DEST_SRC))

    .pipe(concat(path.JS_OUT))
    .pipe(gulp.dest(path.DEST_BUILD))
    
    .pipe(concat(path.JS_MINIFIED_OUT))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('watch', ['copy', 'less', 'css', 'js'], function() {
  gulp.watch(path.HTML, ['copy']);
  gulp.watch(path.LESS, ['less']);
  gulp.watch(path.JS, ['js']);
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.JS_MINIFIED_OUT,
      'css': 'build/' + path.CSS_MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('build', ['copy', 'less', 'css', 'js'], function(){
	//build with bootstrap
	gulp.src([
		"dist/src/icons.js", 
		"dist/src/webchef.js", 
		"dist/src/bootstrap.js", 
		"dist/src/app.js"
	])
	.pipe(concat(path.JS_OUT))
	.pipe(gulp.dest(path.DEST_BUILD))

	.pipe(concat(path.JS_MINIFIED_OUT))
	.pipe(gulp.dest(path.DEST_BUILD));

	//build without bootstrap
	gulp.src([
		"dist/src/icons.js", 
		"dist/src/webchef.js", 
		"dist/src/app.js"
	])
	.pipe(concat("icon-selector-bootstrap.js"))
	.pipe(gulp.dest(path.DEST_BUILD))

	.pipe(concat("icon-selector-bootstrap.min.js"))
	.pipe(gulp.dest(path.DEST_BUILD));

	//build with bootstrap
	gulp.src([
		"dist/src/icon-selector.css",
		"dist/src/bootstrap.css"
	])
	.pipe(concat("icon-selector.css"))
	.pipe(gulp.dest(path.DEST_BUILD))

	.pipe(concat("icon-selector.min.css"))
	.pipe(gulp.dest(path.DEST_BUILD));


	//build without bootstrap
	gulp.src([
		"dist/src/icon-selector.css",
	])
	.pipe(concat("icon-selector.css"))
	.pipe(gulp.dest(path.DEST_BUILD))

	.pipe(concat("icon-selector.min.css"))
	.pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('production', ['replaceHTML', 'build']);

gulp.task('default', ['watch']);