'use strict';

// Gulpを読み込む
const gulp = require('gulp');
const sass = require('gulp-sass');
const path = require('path');

// src,distディレクトリをまとめて管理
const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
};

// dirnameの役割を示すためのテス
gulp.task('test:dirname', function () {
  console.log('dirname is' + __dirname);
})

gulp.task('styles', function() {
  return gulp.src(path.join(PATHS.src, 'styles/**/*.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${PATHS.dist}/styles`));
});

gulp.task('watch', ['styles'], function() {
  gulp.watch(path.join(PATHS.src, 'styles'));
});

gulp.task('default', function() {
  console.log('Hellow Gulp!');
});
