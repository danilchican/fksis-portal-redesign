const gulp = require('gulp'),
    uglify = require('gulp-uglify');

gulp.task('css', function () {
    gulp.src('src/scss/main.scss')
        .pipe(uglify())
        .pipe(gulp.dest('build/css'));
});