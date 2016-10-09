var gulp = require('gulp');
var webpack = require('gulp-webpack');
var haml = require('gulp-haml');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browser = require('browser-sync');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var rev  = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var del = require('del');

gulp.task('server', function() {
  browser({
    server: {
      baseDir: './public'
    }
  });
});

gulp.task('haml', function() {
  return gulp.src('assets/htmls/*.haml')
      .pipe(plumber())
      .pipe(haml())
      .pipe(gulp.dest('./public'))
      .pipe(gulp.dest('./dist'))
      .pipe(browser.reload({stream:true}));
});

gulp.task('sass', function() {
  return gulp.src('assets/stylesheets/**/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest('./public/css'))
      .pipe(browser.reload({stream:true}));
});

gulp.task('webpack', function() {
  return gulp.src('assets/javascripts/**/*.js')
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
      .pipe(gulp.dest('./public/js'))
      .pipe(browser.reload({stream:true}));
});

gulp.task('image', function() {
  return gulp.src('assets/images/**/*.+(png|gif|jpg|jpeg|svg|woff)')
      .pipe(gulp.dest('./public/images'))
      .pipe(browser.reload({stream:true}));
});

gulp.task('rev', () => {
  return gulp.src('./public/**/*.+(js|css|png|gif|jpg|jpeg|svg|woff)')
    .pipe(rev())
    .pipe(gulp.dest('./dist'))
    .pipe(rev.manifest('rev-manifest.json', { merge: true }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('rev:replace', () => {
  var manifest = gulp.src('./dist/rev-manifest.json');
  return gulp.src('./dist/**/*.+(html|css|js)')
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', function(cb) {
  return del(['dist/*'])
});

gulp.task('default', runSequence('clean', ['server', 'sass', 'webpack', 'haml']), function() {
  gulp.watch('assets/**/*.scss', runSequence('sass', 'rev', 'rev:replace'));
  gulp.watch('assets/**/*.js', runSequence('webpack', 'rev', 'rev:replace'));
  gulp.watch('assets/**/*.haml', runSequence('haml', 'rev:replace'));
});
