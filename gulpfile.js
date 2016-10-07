var gulp = require('gulp')
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");

gulp.task("server", function() {
  browser({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('sass', function() {
  gulp.src('sass/**/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest('./css'))
      .pipe(browser.reload({stream:true}));
});

gulp.task("default", ["server"], function() {
  gulp.watch("sass/**/*.scss",["sass"]);
});
