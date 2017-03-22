var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var gulpif = require('gulp-if');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var wiredep = require('wiredep').stream;
var useref = require('gulp-useref');
var del = require('del');
var proxy = require('http-proxy-middleware');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var bower = require('gulp-bower');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var filter = require('gulp-filter');

gulp.task('sass', function () {
    return gulp.src('web/styles/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('web/dist/styles'));
});

gulp.task('browserSync', function () {
    var apiProxy = proxy('/api', {
        target: 'http://localhost:8080',
        changeOrigin: true
    });
    browserSync.init({
        server: {
            baseDir: ['web'],
            middleware: [apiProxy]
        }
    });
});

gulp.task('wiredep', () => {
    gulp.src('web/index.html')
        .pipe(wiredep({
            directory: 'web/bower_components'
        }))
        .pipe(gulp.dest('web'));
});

gulp.task('run', ['bower', 'browserSync', 'icons', 'sass'], function () {
    gulp.watch('web/styles/*.scss', ['sass']);
    gulp.watch('web/**/*.js');
    gulp.watch('web/images/*.**');
    gulp.watch(['web/*.html', 'web/**']).on('change', browserSync.reload);
});

gulp.task('useref', function () {
    var cssAndJsFilter = filter(['**/*.js', '**/*.css'], {
        restore: true
    });
    return gulp.src('web/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssnano()))
        .pipe(cssAndJsFilter)
        .pipe(rev())
        .pipe(cssAndJsFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('web/dist'));
});

gulp.task('clean', function () {
    del.sync('web/dist');
});

gulp.task('icons', function () {
    gulp.src('web/bower_components/font-awesome/fonts/**.*')
        .pipe(gulp.dest('web/fonts'));
});

gulp.task('build', function (callback) {
    runSequence('clean', 'sass', 'wiredep', 'useref', 'copy', 'minify', 'icons');
});

gulp.task('copy', function () {
    gulp.src('web/bower_components/font-awesome/fonts/**.*')
        .pipe(gulp.dest('web/dist/fonts'));
    gulp.src('web/images/**.*')
        .pipe(gulp.dest('web/dist/images'));
});

gulp.task('minify', function () {
    gulp.src('web/app/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('web/dist/app'));
});

gulp.task('bower', function () {
    return bower({
        cmd: 'update'
    });
});