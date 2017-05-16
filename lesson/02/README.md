# Lesson 2

**できるようになること**

- ファイルの変更を監視して自動でtaskを実行する
- ディレクトリ管理を一箇所にまとめよう
- ローカルサーバーを起動する
   - Browsersync

## ファイルの変更を監視して自動でtaskを実行する

Gulpの標準機能である`gulp.watch`を使います。
これを利用すると、ファイルが変更(*)されたタイミングに任意のタスクを自動で
実行することが可能となります。

📝 ファイルの変更: ここでは、「エディタで保存されたタイミング」と考えてください

gulp.watchドキュメント  

https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb

### 準備

1. watchタスクを作成する
   sassの時と同じように、まずは空の`watch`taskを作成します。

    ```js
    gulp.task('watch', function () {
      // ...
    });
    ```

1. taskの内容を書く
   こんだけ！  
   `gulp.watch('{{ 監視したいファイルのパス }}', ['{{ 実行したいタスク名 }}', '...'])`

    ```js
    gulp.task('watch', function () {
      // scssのファイルが変更されたタイミングに`styles`が実行される
      gulp.watch('./src/styles/**/*.scss', ['styles']);
    });
    ```

1. 実行
   `gulp watch`を実行します。
   実行後はscssファイルが変更されると自動で`styles`タスクが実行されます。

    ```sh
    $ gulp watch

    # 実行結果
    [16:56:31] Using gulpfile ~/Works/Private/gulp-tutorial/lesson/02/gulpfile.js
    [16:56:31] Starting 'watch'...
    [16:56:31] Finished 'watch' after 12 ms
    ```

1. おまけ: `gulp watch`実行時に1度`styles`タスクを実行させる
   今のままでは、watchタスク実行してもファイルが変更されるまで`styles`タスクが実行されません。
   functionの前に `['styles']` を追加すると  
   watch実行後すぐに`styles`タスクが実行されます。

   ```js
    gulp.task('watch', ['styles'], function () {
      gulp.watch('./src/styles/**/*.scss', ['styles']);
    });
   ```

## ディレクトリ管理を一箇所にまとめよう

読み込み元・書き出し先の二つのディレクトリを
一箇所で管理しましょう。

こうしておくと、読み込み元のディレクトリを変更したい場合、
ディレクトリ管理する一箇所のみを修正すれば対応できるようになります。

ここでは、連想配列を利用します。

1. モジュール`path`をrequirする
   ファイルパスの参照に便利な機能を持ったツールです。
   node.jsに標準で備わっています。

    ```js
    const gulp = require('gulp');
    const sass = require('gulp-sass');
    // こいつを追加
    const path = require('path');
    ```

1. ファイル管理のための変数 `PATHS` を定義

    ```js
    const PATHS = {};

    // 📝 複数のパスを管理するので変数名を複数形で表しています。
    // 欧米圏だと単数・複数形の違いはとても重要なようで,
    // 実際に同一単語の単数・複数が機能によって使い分けられてるケースは少なくないです。
    // 慣れておくと今後良いです。
    ```

1. `path`モジュールと`__dirname`を持ちいてファイルパスを指定する
   今回は読み込み元と出力先の2つのパスを指定します。

    ```js
    // `__dirname`はnodejsの特別な変数で、実行中の環境での絶対パスを表します。
    // `path.join()`は()内に記されたディレクトリ名を連結して一つのパスを表します。

    const PATHS = {
      src: path.join(__dirname, 'src'),
      dist: path.join(__dirname, 'dist'),
    }

    // 📝 dirnameの役割を示すためのテスト
    // `gulp test:dirname` でdirnameの中のファイルパスが確認できます
    gulp.task('test:dirname', function () {
      console.log('dirname is' + __dirname);
    })
    ```

1. `PATHS`をタスクに適用してみる

    ```js
    gulp.task('styles', function() {
      return gulp.src(path.join(PATHS.src, 'styles', '**/*.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.join(PATHS.dist, 'styles')));
    });

    gulp.task('watch', ['styles'], function() {
      gulp.watch(path.join(PATHS.src, 'styles'));
    });

    ```

## ローカルサーバーを起動する

本レッスンの最後はローカルサーバーの起動です。
Gulp等のタスクランナーが面白い！と感じてもらうために
Browsersyncを使ってみます。

Browsersyncを使うと、ローカルサーバーだけでなく、
変更ごとにブラウザの自動リロードや、
あるページを複数のブラウザで開いた場合に、
一つの画面での変更が他画面でも同期されます。

今回は公式ドキュメントを参考にgulpとBrowsersyncの連携を行います。
https://www.browsersync.io/docs/gulp

### 準備

1. Browsersyncをインストール

    ```sh
    $ yarn add -D browser-sync
    ```

1. BrowserSyncの動作確認のためにhtmlファイルを準備しておく

1. browserSyncの読み込みとサーバー用タスク`serve`を用意する

    ```js
    // requireで読み込む
    const browserSync = require('browser-sync');

    // Static Server
    gulp.task('serve', function() {

    });
    ```

### taskの中身をかく

    ```js
    // Static Server
    gulp.task('serve',function() {

      // サーバーの設定を{}の中に書く
      browserSync.init({
        // サーバーのルートディレクトリを指定
        server: './',
      });

      // htmlが`change`された時にページをリロードする
      gulp.watch(path.resolve(__dirname, '*.html')).on('change', browserSync.reload);
    });
    ```

### 実行しましょう！  

サーバーが起動したらブラウザが自動で立ち上がります。
htmlを変更すると自動でリロードされます。

    ```sh
    $ gulp serve

    # 実行後

    [14:25:58] Starting 'serve'...
    [14:25:58] Finished 'serve' after 20 ms
    [BS] Access URLs:
     ----------------------------------
           Local: http://localhost:3000
        External: http://10.0.1.3:3000
     ----------------------------------
              UI: http://localhost:3001
     UI External: http://10.0.1.3:3001
     ----------------------------------
    [BS] Serving files from: ./
    ```

### html以外の変更でも自動リロードを実行する

1. serveタスクの実行前に`styles`タスクを実行するようにする
1. `styles`タスク内にbrowserSyncのリロード用のコードを追加する

    ```diff
    // Static Server
    + gulp.task('serve', ['styles'], function() {

      // サーバーの設定を{}の中に書く
      browserSync.init({
        // サーバーのルートディレクトリを指定
        server: './',
      });

    +  // watchタスクと全く同じ
    +  gulp.watch(path.join(PATHS.src, 'styles', '**/*.scss'), ['styles']);
      // htmlが`change`された時にページをリロードする
      gulp.watch(path.resolve(__dirname, '*.html')).on('change', browserSync.reload);
    });
    ```

### 実行しましょう！

html, scssの変更に合わせてページがリロードされるはず。
