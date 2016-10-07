var gulp = require('gulp')
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");

gulp.task('sass', function() {
  gulp.src('sass/**/*.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest('./css'));
});

gulp.task("default", function() {
  gulp.watch("sass/**/*.scss",["sass"]);
});
