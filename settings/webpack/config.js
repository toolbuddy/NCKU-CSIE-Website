const glob = require( 'glob' )
const path = require( 'path' )
const HtmlWebpackPlugin = require('html-webpack-plugin');


// 取得所有文件
let getEntry = ()=>{
    let entry = {}
    for (let file of glob.sync(path.resolve('./static/src/js/**/*.js')))
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
            test: /\.sass$/,
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
            template: './views/layouts/default.pug',
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

    // 添加Source Map
    devtool: "source-map", // 最詳細的種類
};