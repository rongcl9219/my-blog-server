const gulp = require('gulp');
const zip = require('gulp-zip');

// 将项目打包成zip文件，只打包了有后缀的文件，bin文件夹没有打包，需要单独复制到服务器
gulp.task('zip', function() {
    return gulp.src(['**/*.*', '!**/node_modules/**/*.*','!dist/**/*.*', '!README.md', '!gulpfile.js', '!table_sql.sql'])
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest('dist'));
});
