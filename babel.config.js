module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    ie: '11'
                },
                useBuiltIns: 'usage', // 폴리필 사용 방식 지정
                corejs: { // 폴리필은 corejs 라이브러리 사용 
                    // 폴리필 버전 지정
                    version: 2,
                },
            },
        ],
    ],
}