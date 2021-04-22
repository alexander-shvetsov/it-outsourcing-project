let plumber = require('gulp-plumber'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    csscomb = require('gulp-csscomb'),
    removeCssComments = require('gulp-strip-css-comments'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    stylesPATH = {
        "input": "./dev/static/styles/",
        "ouput": "./build/static/css/"
    };

module.exports = function () {
    $.gulp.task('styles:dev', () => {
        return $.gulp.src(stylesPATH.input + 'styles.scss')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(scss())
            .pipe(autoprefixer(['last 15 versions']))
            .pipe(sourcemaps.write())
            .pipe(rename('styles.min.css'))
            .pipe($.gulp.dest(stylesPATH.ouput))
            .on('end', $.browserSync.reload);
    });
    $.gulp.task('styles:build', () => {
        return $.gulp.src(stylesPATH.input + 'styles.scss')
            .pipe(scss())
            .pipe(autoprefixer(['last 15 versions']))
            .pipe(csscomb())
            .pipe($.gulp.dest(stylesPATH.ouput))
    });
    $.gulp.task('styles:build-min', () => {
        return $.gulp.src(stylesPATH.input + 'styles.scss')
            .pipe(scss())
            .pipe(autoprefixer(['last 15 versions']))
            .pipe(removeCssComments({preserve: false}))
            .pipe(csscomb())
            .pipe(csso())
            .pipe(rename('styles.min.css'))
            .pipe($.gulp.dest(stylesPATH.ouput))
    });
};