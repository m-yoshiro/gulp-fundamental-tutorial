# Lesson 2

**できるようになること**

- ファイルの変更を監視して自動でtaskを実行する
- ディレクトリ管理を一箇所にまとめよう
- sass以外のtaskを追加してみよう
   - stylelint
   - autoprefixer
- ローカルサーバーを起動する
   - Browsersync
- HTMLテンプレートエンジンnunjacsを使ってhtmlを作ってみる

## ファイルの変更を監視して自動でtaskを実行する

Gulpの標準機能である`gulp.watch`で、ファイルの変更(*)を監視できます。
これを利用すると、ファイルが変更されたタイミングに任意のタスクを自動で
実行することが可能となります。

gulp.watchドキュメント  
https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb

(*) ファイルの変更: エディタで保存されたタイミングと捉えていただいて良いかと

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
   watch実行後すぐに`styles`タスクが実行されます。（解説は後ほど）

   ```js
    gulp.task('watch', ['styles'], function () {
      gulp.watch('./src/styles/**/*.scss', ['styles']);
    });
   ```

## sass以外のtaskを追加してみよう
