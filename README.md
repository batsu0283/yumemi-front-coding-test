# 都道府県別の総人口推移グラフ

## デプロイURL
https://batsu0283.github.io/yumemi-front-coding-test/

## プロジェクト概要
株式会社ゆめみ社の[フロントエンドコーディング試験](https://yumemi.notion.site/0e9ef27b55704d7882aab55cc86c999d)の課題

### 技術スタック
- React
- TypeScript
- Vite
- tailwindcss
- biome
- Vitest
- Testing Library
- Recharts

## 開発環境セットアップ
### 必要環境
- Node.js (v20)
- npm (Node.jsに付属)

### 環境変数の設定
1. プロジェクトのルートディレクトリに `.env` ファイルを作成します。
2. 以下の内容を `.env` ファイルに追加し、`<YOUR_API_KEY>` を取得したAPIキーに置き換えます。
    ```
    VITE_API_BASE_URL=<YOUR_API_KEY>
    ```
    - APIキーは以下のリンクから新規登録して取得します（2024/10/31で新規取得の終了とのこと）。
      - https://opendata.resas-portal.go.jp/

### ローカル環境起動
1. プロジェクトのルートディレクトリで以下のコマンドを実行し、依存関係をインストールします。
    ```sh
    npm install
    ```
2. 開発サーバーを起動します。
    ```sh
    npm run dev
    ```
3. consoleに表示されたURLをブラウザで開き、アプリケーションが正しく動作することを確認します。

### ビルド
1. プロジェクトのルートディレクトリで以下のコマンドを実行し、プロダクションビルドを作成します。
    ```sh
    npm run build
    ```
2. `dist` ディレクトリにビルドされたファイルが生成されます。

### リント
1. プロジェクトのコードをリントするには、以下のコマンドを実行します。
    ```sh
    npm run lint
    ```

### テスト
1. テストを実行するには、以下のコマンドを実行します。
    ```sh
    npm run test
    ```

## API仕様
以下のドキュメントを参照してください。
### 都道府県一覧取得
- [都道府県一覧取得 API](https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html)
### 都道府県別年毎人口構成
- [都道府県別年毎人口構成 API](https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html)

## その他
### 妥協点
- **フロントエンドでのAPIキーの露出**  
  APIキーは当然ながらGit管理の対象外としましたが、Viteでビルドした際にキーがビルドファイルに含まれるため、ブラウザの開発者ツールやネットワークタブから容易に確認できる状態となってしまう

  - **RESAS APIのAPIキーについて**  
    RESAS APIのAPIキーは誰でも簡単に取得でき、秘匿性の高い情報を含まないため、セキュリティ上の懸念は低いと判断しました。

  - **対策を行う場合**  
    よりセキュアな対応をする場合は、バックエンドサーバーを仲介する方法、もしくはバックエンド機能を内包するフレームワーク（Next.jsなど）を用いる必要あり。
