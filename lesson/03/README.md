# Lesson 3

**できるようになること**

- sass以外のtaskを追加してみよう
   - stylelint
   - autoprefixer
- HTMLテンプレートエンジンnunjucksを使ってhtmlを作ってみる

## sass以外のtaskを追加してみよう

gulpはsassのbuild以外にも様々なタスクを作成することが可能です。
今回は業務で触れる機会の多いこの2つをgulpのタスクで実行します。

**stylelint**

https://stylelint.io/
https://github.com/olegskl/gulp-stylelint

- CSSの構文チェックツール。構文エラーだけでなくコーディングルールもチェックできる。
- カスタマイズできる（エラー時に日本語コメ入れたり、プロジェクト独自のルール追加したり）

**autoprefixer**

https://autoprefixer.github.io/
https://www.npmjs.com/package/gulp-autoprefixer

- ブラウザによって異なるCSSのプレフィックスを自動で追加してくれます。

### 準備

1. toolをインストール

    ```sh
    $ yarn add -D gulp-stylelint gulp-autoprefixer
    ```

1. 空のlint:styleタスクを作成する

    ```js
    const stylelint = require('gulp-stylelint');
    const autoprefixer = require('gulp-autoprefixer');

    // ...

    gulp.task('lint:style', function () {
      // ...
    });

    ```

### Stylelint

1. taskの内容を書く

    ```js
    gulp.task('lint:style', function () {
      return gulp.src(path.join(PATHS.src, 'styles', '**/*.scss'))
        .pipe(stylelint({
          // 実行結果の出力方法を設定してる
          reporters: [
            {formatter: 'string', console: true}
          ]
        }));
    });
    ```

1. 設定ファイル`.stylelintrc`を追加
   `gulp lint:style`を実行するとおそらくエラーが出るでしょう。
   これは、stylelintの設定が十分ではないためです。
   設定ファイル`.stylelintrc`をgulpfileと同じディレクトリに作成して
   以下ページのコードブロックの内容をコピペしてください

   https://stylelint.io/user-guide/configuration/#rules

1. `gulp lint:style`を実行しましょう。
   header.scssでErrorが発見されたら成功です。

   ```sh
   src/styles/_header.scss
   2:3  ✖  Expected indentation of 1 tab   indentation
   ```

### Autoprefixer

これまでtoolを追加する際は、新たにタスクを書いてきましたが、
今回は既にある`styles`タスク内にコードを追加して、この中で実行するようにします。

1. Autoprefixerのコードを追加する
   sass()より前に追加します。sassの後ろだと処理が遅くなります。
   autoprefixerの中には対象ブラウザを設定します。

   📝 びっくりするほど細かいブラウザ設定が可能です。(アメリカでのIEでユーザーが1%以上のバージョン、とか)
   詳しくは https://github.com/ai/browserslist

    ```js
    gulp.task('styles', function() {
      return gulp.src(path.join(PATHS.src, 'styles', '**/*.scss'))
        // sass()より前に追加する
        .pipe(autoprefixer({
            // lintの時と同じく設定。
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.join(PATHS.dist, 'styles')))
        .pipe(browserSync.stream());
    });

    ```

2. Autoprefixerの効果を試してみましょう
   例えば`display: flex;`をscssに書いて stylesタスクを実行

    ```scss
    .aaa {
      display: flex;
    }

    // こうなる

    .aaa {
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
    }
    ```

## HTMLテンプレートエンジンnunjucksを使ってhtmlを作ってみる

最後にHTMLテンプレートエンジンnunjucksを使ってみましょう。  
nunjucksは、例えばcssに対してのsassのようにHTMLを便利に書くことができるツールです。

https://mozilla.github.io/nunjucks/

1. toolインストールとtaskの準備
   `yarn add -D gulp-nunjucks-render` してから

    ```js
    const nunjucks = require('gulp-nunjucks-render');

    gulp.task('nunjucks', function() {

    });
    ```

1. タスクをかく

    ```js
    gulp.task('nunjucks', function() {

    });
    ```
