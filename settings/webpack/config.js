const glob = require( 'glob' )
const path = require( 'path' )
const HtmlWebpackPlugin = require('html-webpack-plugin');


// 取得所有文件
let getEntry = ()=>{
    let entry = {}
    for (let file of glob.sync(path.resolve('./static/src/*.js')))
    {
        entry[path.parse(file).name] = file
    }
    entry.vendors = ['path']
    return entry
}


module.exports =
{
    entry: getEntry(),
    output:
    {
        path:       path.resolve('./static/dist'),
        publicPath: '../dist/',
        filename:   '[name].js'
    },
    module: {
    rules: [
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.(png|gif|jpe?g|svg|woff2?|ttf|eot)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: { limit: 8192 } // 超過大小限制會自動用file-loader
                }
            ]
        },
        {
            test: /\.pug$/,
            use: 
            {
                loader: 'pug-loader',
                query: {} // 修復TypeError: Cannot read property 'pugLoader' of undefined
            }
        }
    ]},
    plugins: [
        new HtmlWebpackPlugin(
        {
            template: './static/src/index.pug',
            // 設定壓縮規則
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                html5: true,
                minifyCSS: true,
                removeComments: true,
                removeEmptyAttributes: true,
            },
        }),
    ],

    // 各種優化設定
    optimization: {
        // 提取共用模組設定 (有預設提取條件)
        splitChunks: {
            // cacheGroups:{ // 設定自訂的chunk
            //     index: { // key為entry的key
            //         test: /glob|webpack/, // 要提取的共用模組，用正規表達式
            //         name: "vendor", // 提取的chunk名 
            //     }
        }
    },

    // 添加Source Map
    devtool: "source-map", // 最詳細的種類
};