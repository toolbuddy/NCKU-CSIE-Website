const glob = require( 'glob' );
const path = require( 'path' );


// 取得所有文件
let getEntry = ()=>{
    let entry = {};
    for (let file of glob.sync(path.resolve('./views/**/*.js')))
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
        filename:   '[name].js'
    },
    // module:
    // {
    //     rules:
    //     [{
    //         test:    /\.js?$/,
    //         // loader:  'babel-loader',
    //         // options: { presets: [__dirname  + '/node_modules/babel-preset-es2015'] }
    //     }]
    // }
};