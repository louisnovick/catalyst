var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');


gulp.task('styles', function(){
  gulp.src(['sass/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename({basename: "catalyst"}))
    .pipe(gulp.dest('build/css'))
    .pipe(rename({basename: "catalyst", suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('build/css'))
    .pipe(livereload());
});

gulp.task('scripts', function(){
  return gulp.src('js/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('catalyst.js'))
    .pipe(babel())
    .pipe(gulp.dest('build/js'))
    .pipe(rename({basename: "catalyst", suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(livereload());
});

gulp.task('default', function(){
  livereload.listen();
  gulp.watch("sass/**/*.scss", ['styles']);
  gulp.watch("js/**/*.js", ['scripts']);
});
