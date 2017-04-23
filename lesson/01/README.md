# Lesson 1

**できるようになること**

- node.jsツールのセッティング
- gulpをインストール
- gulpでtaskを作成する
- gulpでsassを実行する

## node.jsツールのセッティング

### node.jsとは

- javascriptでサーバーサイドの開発が可能なプラットフォーム
- chromeと同じV8エンジンにより実行される
- PC上で実行可能なツールの開発も可能
   - Gulp, stylelintなど

### プロジェクトの準備

1. コマンドを入力してpackage.jsonファイルを作成する。

    ```sh
    # npmの場合
    $ npm init -y
    # yarnの場合
    $ yarn init -y

    # `-y`を指定することでプロジェクト情報入力をスキップすることができる
    ```

    ```sh
    $ yarn init -y
    yarn init v0.21.3
    warning The yes flag has been set. This will automatically answer yes to all questions which may have security implications.
    success Saved package.json
    ✨  Done in 0.43s.

    # package.jsonが作成されたか確認(Finderやエディタでの目視でもok)
    $ ls package.json
    package.json
    ```

1. package.jsonの中身を確認する  
新規の状態。本レッスンでは編集不要です。  
ここに情報がどんどん追加されていきます。  
（内容は要件によって変更してください。）

    ```json
    {
      "name": "gulp-tutorial", // プロジェクト名
      "version": "1.0.0", // version名
      "main": "index.js", // mainとして扱うファイルの名前
      "author": "m-yoshiro <massugu.massugu@gmail.com>", // 管理者の名前
      "license": "MIT" // ライセンスの設定
    }
    ```

### Gulpをインストール

Gulpを利用するには２つのツールをインストールします。

- gulp: http://gulpjs.com/
   - 色々な処理を実行するgulpの本体。
   - プロジェクト毎にインストールする。
- gulp-cli
   - gulpを起動するためのコマンドを提供してくれるツール。ラジコンを操作するためのリモコンのようなもの。
   - PC上のどこでもgulpコマンドが実行できるように、globalオプションをつけてインストールする。

1. コマンドでインストール

    ```sh
    # npmの場合
    $ npm i -g gulp-cli
    $ npm i -D gulp

    # yarnの場合
    $ yarn global add gulp-cli
    $ yarn add -D gulp
    ```

1. インストール後の変化を確認してみる
   - node_modules/ディレクトリが追加されている  
   ツールをインストールすると生成されるディレクトリです。この中にツールが追加されていきます。
   - package.jsonに`devDependencies`が追記されている

    ```json
    "devDependencies": {
      "gulp": "^3.9.1"
    }
    ```

### gulpfile.jsにタスクを書く

Gulpのタスクや設定を記述するために`gulpfile.js`を作成します。

1. `touch gulpfile.js`, またはエディタでgulpfile.jsファイルをプロジェクトのルートディレクトリに作成する。
1. gulpfileに下のtaskを書いてみる。

    ```js
    // gulpfile.js
    // Gulpを読み込む
    const gulp = require('gulp');

    // 実行するとコンソールに`Hellow Gulp!`と表示させるタスクを書いた
    gulp.task('default', function() {
      console.log('Hellow Gulp!');
    });
    ```
1. Gulpを実行する
    ```sh
    $ gulp

    # 実行ご
    [21:43:42] Using gulpfile ~/Works/Private/gulp-tutorial/lesson/01/gulpfile.js
    [21:43:42] Starting 'default'...
    Hellow Gulp!
    [21:43:42] Finished 'default' after 117 μs
    ```

### sassをbuildしてみる

gulp-sassを使用します。
ドキュメントを参考にbuildするところまでやってみます。
https://www.npmjs.com/package/gulp-sass

1. gulp-sassをインストールする

    ```
    yarn add -D gulp-sass
    # npmは今後省略します
    ```

1. sassをbuildするtask, `styles`をgulpfileに追加する。  
[gulpfile.js](gulpfile.js)をご覧ください
1. styleタスクを実行してみる。distディレクトリにcssファイルが作成される

    ```
    $ gulp styles
    ```
