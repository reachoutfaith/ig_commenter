let gulp = require('gulp'), //Сам gulp
    sass = require('gulp-sass'), //Модуль для преобразования sass в css
    uglifyJs = require('gulp-uglifyjs'), //Модуль для сжатия js
    rename = require('gulp-rename'), //Модуль для переименования файлов
    htmlMin = require('gulp-htmlmin'), //Модуль для минификации html
    delFiles = require('del'), //Удаление файлов
    BS = require('browser-sync'), //Веб-сервер
    cssMinify555 = require('gulp-csso'), //Модуль для сжатия css
    babel = require('gulp-babel'), //Для преобразования ES6 (ES2015) -> ES5
    concat = require('gulp-concat'); //Объединение файлов

/**
 Gulp
 1. gulp.task() - создание новой задачи
 2. gulp.src() - выбирает файлы для преобразования
 3. gulp.dest() - сохраняет уже преобразованные файлы
 4. gulp.watch() - выполняет отслеживание изменений
 */


gulp.task('test', function () {
    console.log('Gulp works!');
});

gulp.task('default', ['delFiles', 'test', 'html', 'sass', 'js', 'watchFiles', 'myServer'], function () {
    console.log('task default!');
});

gulp.task('html', function () {
    gulp.src(['./app/html/index.html'])
        .pipe(htmlMin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'));

    BS.reload({stream: false});
});

gulp.task('sass', function () {
    gulp.src('./app/sass/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))
        .pipe(cssMinify555())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'));

    BS.reload({stream: false});
});

gulp.task('js', function () {
    gulp.src('./app/js/**/*.js')
        .pipe(babel()) //Для ES6
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(uglifyJs())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/js'));

    BS.reload({stream: false});
});

gulp.task('watchFiles', function () {
    gulp.watch(['./app/html/index.html'], ['html']);
    gulp.watch('./app/sass/**/*.sass', ['sass']);
    gulp.watch('./app/js/**/*.js', ['js']);
});

gulp.task('myServer', function () {
    BS({
        server: {
            baseDir: './dist'
        }
    });
});

gulp.task('delFiles', function () {
    delFiles('./dist/*');
});