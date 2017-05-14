'use strict';

// Gulpを読み込む
const gulp = require('gulp');
const sass = require('gulp-sass');
const path = require('path');
const browserSync = require('browser-sync').create();

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
  return gulp.src(`${PATHS.src}/styles/**/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${PATHS.dist}/styles`));
});

gulp.task('watch', ['styles'], function() {
  gulp.watch(`${PATHS.src}/styles/**/*.scss`, 'styles');
});

// Static Server
gulp.task('serve', function() {

  browserSync.init({
    server: './',
  });

  gulp.watch(`${PATHS.src}/styles/**/*.scss`, ['styles']);
  gulp.watch(path.resolve(__dirname, '*.html')).on('change', browserSync.reload);
});

gulp.task('default', function() {
  console.log('Hellow Gulp!');
});
