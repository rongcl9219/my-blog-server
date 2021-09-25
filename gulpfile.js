const gulp = require('gulp');
const zip = require('gulp-zip');
const gulpClean = require('gulp-clean')

/**
 * 打包前清空dist
 */
gulp.task('clean', function () {
    return gulp.src('dist/', {read: false, allowEmpty: true})
        .pipe(gulpClean());
})

/**
 * 打包bin
 */
gulp.task('bin', function () {
    return gulp.src(['bin/**'])
        .pipe(gulp.dest('dist/bin'));
})

/**
 * 打包public
 */
gulp.task('public', function () {
    return gulp.src(['public/**'])
        .pipe(gulp.dest('dist/public'));
})

/**
 * 打包src
 */
gulp.task('src', function () {
    return gulp.src(['src/**'])
        .pipe(gulp.dest('dist/src'));
})

/**
 * 打包views
 */
gulp.task('views', function () {
    return gulp.src(['views/**'])
        .pipe(gulp.dest('dist/views'));
})

gulp.task('others', function () {
    return gulp.src(['app.js', 'package.json', 'package-lock.json'])
        .pipe(gulp.dest('dist'));
})

gulp.task('zip', function () {
    return gulp.src(['dist/**'])
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest('dist'));
})

gulp.task('build', gulp.series('clean', gulp.parallel('bin', 'public', 'src', 'views', 'others')))
