const { src, dest, watch, series } = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');

function styles() {
    return src('./src/styles/style.less')
        .pipe(less()) 
        .pipe(cleanCSS())
        .pipe(dest('./dist/styles'))
}

function watchFiles() {
 
    watch('./src/styles/*.less', styles);
}

exports.default = series(styles, watchFiles);
