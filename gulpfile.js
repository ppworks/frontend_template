var gulp = require('gulp')
var haml = require('gulp-haml');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify');
var browser = require('browser-sync');
var plumber = require('gulp-plumber');

gulp.task('server', function() {
  browser({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('haml', function() {
  gulp.src('assets/htmls/*.haml')
      .pipe(plumber())
      .pipe(haml())
      .pipe(gulp.dest('./'))
      .pipe(browser.reload({stream:true}));
});

gulp.task('sass', function() {
  gulp.src('assets/stylesheets/**/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest('./css'))
      .pipe(browser.reload({stream:true}));
});

gulp.task('babel', function() {
  gulp.src('assets/javascripts/**/*.js')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./js'))
      .pipe(browser.reload({stream:true}));
});

gulp.task('default', ['server', 'sass', 'babel', 'haml'], function() {
  gulp.watch('assets/**/*.scss',['sass']);
  gulp.watch('assets/**/*.js',['babel']);
  gulp.watch('assets/**/*.haml',['haml']);
});
