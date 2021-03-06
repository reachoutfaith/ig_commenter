let gulp = require('gulp'), //Сам gulp
    sass = require('gulp-sass'), //Модуль для преобразования sass в css
    // htmlMin = require('gulp-htmlmin'), //Модуль для минификации html
    delFiles = require('del'), //Удаление файлов
    autoprefixer = require('gulp-autoprefixer'), // Префиксы для кроссбраузерности
    image = require('gulp-image'), // Модуль для изображений
    browserSync = require('browser-sync').create()
// uglifyJs = require('gulp-uglify'), //Модуль для сжатия js
// cssMinify555 = require('gulp-csso'), //Модуль для сжатия css
// babel = require('gulp-babel'); //Для преобразования ES6 (ES2015) -> ES5


/**
 Gulp
 1. gulp.task() - создание новой задачи
 2. gulp.src() - выбирает файлы для преобразования
 3. gulp.dest() - сохраняет уже преобразованные файлы
 4. gulp.watch() - выполняет отслеживание изменений
 */




// Deleting all the files from the dist2 
// gulp.task('delFiles', function () {
//     delFiles('./dist2/*');
// });

function clean() {
    return delFiles('./dist2/*');
}

//HTML 
// gulp.task('html', function () {
//     gulp.src(['./app/index.html'])
//         .pipe(gulp.dest('./dist2'));

//     browserSync.reload({ stream: false });
// });


function html() {
    return gulp.src(['./app/index.html'])
        .pipe(gulp.dest('./dist2'))
        .pipe(browserSync.reload({ stream: true }));
}

// Compiling sass in css
// gulp.task('sass', function () {
//     gulp.src(['./app/scss/main.scss', './app/scss/flickity.min.css'])
//         .pipe(sass())
//         .pipe(autoprefixer())
//         .pipe(gulp.dest('./dist2/css'))
//     browserSync.reload({ stream: false });
// });

function css() {
    return gulp.src(['./app/scss/main.scss', './app/scss/flickity.min.css'])
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist2/css'))
        .pipe(browserSync.reload({ stream: true }));
}


//Transferring images from app to dist2
// gulp.task('image', function () {
//     gulp.src('./app/images/*')
//         .pipe(image())
//         .pipe(gulp.dest('./dist2/images'));
//     browserSync.reload({ stream: false });
// });

function images() {
    return gulp.src('./app/images/*')
        .pipe(image())
        .pipe(gulp.dest('./dist2/images'))
        .pipe(browserSync.reload({ stream: true }));
}

//Transferring fonts from app to dist2 
// gulp.task('fonts', function () {
//     gulp.src('./app/fonts/*')
//         .pipe(gulp.dest('./dist2/fonts'));
//     browserSync.reload({ stream: false });
// });

function fonts() {
    return gulp.src('./app/fonts/*')
        .pipe(gulp.dest('./dist2/fonts'))
        .pipe(browserSync.reload({ stream: true }));
}

//Transferring js files from app to dist2
// gulp.task('js', function () {
//     gulp.src('./app/js/*')
//         .pipe(gulp.dest('./dist2/js'));

//     browserSync.reload({ stream: false });
// });

function js() {
    return gulp.src('./app/js/*')
        .pipe(gulp.dest('./dist2/js'));

}



// Watch the changes
// gulp.task('watch', ['browserSync'], function () {
//     gulp.watch(['app/index.html'], ['html']);
//     gulp.watch('./app/json/**/*.json', ['json']);
//     gulp.watch('./app/scss/**/*.scss', ['sass']);
//     gulp.watch('./app/js/**/*.js', ['js']);
// });


function watch() {
    browserSync.init({
        server: {
            baseDir: './dist2'
        }
    });

    // gulp.watch('./app/scss/**/*.scss').on('change', browserSync.reload)
    // gulp.watch(['app/index.html']).on('change', browserSync.reload);
    // gulp.watch('./app/js/**/*.js').on('change', browserSync.reload);

    // return gulp.watch(['./app/**/*.*'], ['server-reload']);

    gulp.watch(['app/index.html'], gulp.series(html));
    gulp.watch('./app/scss/**/*.scss', gulp.series(css));
    gulp.watch('./app/js/**/*.js', gulp.series(js));
}

// Browser Sync
// gulp.task('browserSync', function () {
//     browserSync.init({
//         server: {
//             baseDir: './dist2'
//         }
//     });
// });

// function browsersync() {
//     return browserSync.init({
//         server: {
//             baseDir: './dist2'
//         }
//     });


//     browserSync.watch('./dist2').on('change', browserSync.reload);
// }


// Default task

var build = gulp.series(clean, html, css, js, images, fonts, watch)
// gulp.task('default', gulp.series('delFiles', 'html', 'sass', 'js', 'image', 'fonts', 'watch'), function () {
//     console.log('default task is done');

// });

exports.default = build;