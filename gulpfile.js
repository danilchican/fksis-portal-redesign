let gulp = require('gulp'),
    cleancss = require('gulp-clean-css'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

// gulp task to minify styles
gulp.task('minify-styles', function () {
    return gulp.src('./build/css/**/*.css')
        .pipe(rename({suffix: '.min'}))
        .pipe(cleancss({inline: ['none']}))
        .pipe(gulp.dest('build/css'))
        .pipe(notify({message: 'Minify styles task is completed.'}));
});

// gulp task to minify scripts
gulp.task('minify-scripts', function () {
    return gulp.src('./build/js/**/*.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
        .pipe(notify({message: 'Minify scripts task is completed.'}));
});

// gulp task to minify all styles and scripts
gulp.task('minify', function () {
    gulp.start('minify-styles');
    gulp.start('minify-scripts');
});

// gulp watcher
gulp.task('watch', function () {
    gulp.watch('build/css/**/*.css', ['minify-styles']);
    gulp.watch('build/js/**/*.js', ['minify-scripts']);
});