const path = require('path');

// Node.js 에서 사용하는 모듈 시스템
module.exports = {
    mode: 'development',
    entry: {
        main: './src/app.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve('./dist'), // 절대 경로를 계산해주는 resolve 함수
    }
}