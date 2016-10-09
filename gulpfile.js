var gulp = require('gulp');
var webpack = require('gulp-webpack');
var haml = require('gulp-haml');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps')
var browser = require('browser-sync');
var plumber = require('gulp-plumber');

gulp.task('server', function() {
  browser({
    server: {
      baseDir: './public_html'
    }
  });
});

gulp.task('haml', function() {
  gulp.src('assets/htmls/*.haml')
      .pipe(plumber())
      .pipe(haml())
      .pipe(gulp.dest('./public_html'))
      .pipe(browser.reload({stream:true}));
});

gulp.task('sass', function() {
  gulp.src('assets/stylesheets/**/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest('./public_html/css'))
      .pipe(browser.reload({stream:true}));
});

gulp.task('webpack', function() {
  gulp.src('assets/javascripts/**/*.js')
      .pipe(plumber())
      .pipe(webpack({
        entry: './assets/javascripts/app.js',
        output: {
          filename: 'app.js'
        },
        devtool: 'inline-source-map',
        module: {
          loaders: [{
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              query: {
                comments: false,
                compact: true
              }
            }
          ]
        }
      }))
      .pipe(gulp.dest('./public_html/js'))
      .pipe(browser.reload({stream:true}));
});

gulp.task('default', ['server', 'sass', 'webpack', 'haml'], function() {
  gulp.watch('assets/**/*.scss',['sass']);
  gulp.watch('assets/**/*.js',['webpack']);
  gulp.watch('assets/**/*.haml',['haml']);
});
