'use strict';

// Gulpを読み込む
const gulp = require('gulp');
const sass = require('gulp-sass');

// sassでcssをbuildするタスク
// 名前は自由に設定できる.
// ただし、sassなどのツール名ではなくタスクの役割を表現する名前が好ましい。
gulp.task('styles', function() {
  /*
    @gulp.src: 素材となるファイルのパス
    @gulp.dest: build後にファイルを吐き出すディレクトリのパス
  */
  return gulp.src('./src/styles/**/*.scss') // => src/styles以下にある名前が'.scss'で終わる全てのファイル
    .pipe(sass().on('error', sass.logError)) // on('error', '...')はエラーの原因を教えてくれる
    .pipe(gulp.dest('./dist/styles')); // => distディレクトリが無い場合はgulpが作成してbuildファイルを吐き出す
});

// 実行するとコンソールに`Hellow Gulp!`と表示させるタスクを書いた
// `default`は特別なタスク。task名を指定せずに実行した場合はdefaultが呼び出される
gulp.task('default', function() {
  console.log('Hellow Gulp!');
});
