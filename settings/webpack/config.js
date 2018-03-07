const glob = require( 'glob' );
const path = require( 'path' );


// 取得所有文件
let getEntry = ()=>{
    let entry = {};
    for (let file of glob.sync(path.resolve('./static/src/*.js')))
    {
        entry[path.parse(file).name] = file
    }
    return entry;
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
                'file-loader',
                {
                    loader: 'url-loader',
                    options: { limit: 8192 }
                }
            ]
        },
    ]}
};