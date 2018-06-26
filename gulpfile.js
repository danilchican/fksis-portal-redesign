let gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    uglify = require('gulp-uglify');

// gulp task to combine styles
gulp.task('styles', function () {
    return sass('src/scss/**/*.scss', {style: 'expanded'})
        .pipe(autoprefixer('last 3 versions'))
        .pipe(gulp.dest('build/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleancss({inline: ['none']}))
        .pipe(gulp.dest('build/css'))
        .pipe(notify({message: 'Styles task complete'}));
});

// gulp task to combine scripts
gulp.task('scripts', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(gulp.dest('build/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

// gulp watcher
gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js', ['scripts']);
});