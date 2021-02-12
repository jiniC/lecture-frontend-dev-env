const path = require("path");
const webpack = require('webpack');
const childProcess =  require('child_process'); // 터미널 명령어 실행가능하게하는 노드 모듈
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // default 로 export 가 안되어있어서 {} 필요
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production'
          ? MiniCssExtractPlugin.loader
          : "style-loader",
          "css-loader"]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: "url-loader",
        options: {
          name: "[name].[ext]?[hash]",
          limit: 10000 // 10Kb
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({ // 배포 잘 되었는지 확인 용
      banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
        Author: ${childProcess.execSync('git config user.name')}
      `
    }),
    new webpack.DefinePlugin({
      TWO: '1+1',
      TWO_STRING: JSON.stringify('1+1'),
      'api.domain': JSON.stringify('http://dev.api.domain.com')
    }),
    new HtmlWebpackPlugin({ // 빌드 과정에 html도 포함시켜서 좀 덜 의존적인 html 작성 가능
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : ''
      },
      // NODE_ENV=production npm run build => 하면 오류 남
      // minify: process.env.NODE_ENV === 'production' ? {
      //   collapseWhitespace: true, // 빈칸 제거
      //   removeComments: true, // 주석 제거
      // } : false,
    }),
    new CleanWebpackPlugin({ // 빌드 결과 깔끔하게
    }),
    ...(process.env.NODE_ENV === 'production'
    ? [new MiniCssExtractPlugin({ filename: '[name].css' })] // 자바스크립트에서 css 뽑아내는 과정
    : []
    )
  ]
  /**
   * TODO: 아래 플러그인을 추가해서 번들 결과를 만들어 보세요.
   * 1. BannerPlugin: 결과물에 빌드 시간을 출력하세요.
   * 2. HtmlWebpackPlugin: 동적으로 html 파일을 생성하세요.
   * 3. CleanWebpackPlugin: 빌드 전에 아웃풋 폴더를 깨끗히 정리하세요.
   * 4. MiniCssExtractPlugin: 모듈에서 css 파일을 분리하세요.
   */
};
