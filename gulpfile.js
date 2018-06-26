const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass');

gulp.task('styles', function () {
    return sass('src/scss/main.scss', {style: 'expanded'})
        .pipe(autoprefixer('last 3 versions'))
        .pipe(gulp.dest('build/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleancss({inline: ['none']}))
        .pipe(gulp.dest('build/css'))
        .pipe(notify({message: 'Styles task complete'}));
});

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', ['styles']);
});