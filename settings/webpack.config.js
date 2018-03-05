const config = require( './server/config' );
const glob = require( 'glob' );
const path = require( 'path' );

let getEntry = ()=>{
    var entry = {};
    for (let file of glob.sync(config.rootPath + '/views/**/*.js'))
    {
        entry[path.parse(file).name] = file
        console.log(file)
    }
    return entry;
}; 

module.exports =
{
    entry: getEntry(),
    output:
    {
        path:       config.rootPath + '/static/dist/[name]',
        filename:   '[name].js'
    },
    // module:
    // {
    //     rules:
    //     [{
    //         test:    /\.js?$/,
    //         loader:  'babel-loader',
    //         options: { presets: [__dirname  + '/node_modules/babel-preset-es2015'] }
    //     }]
    // },
    // resolveLoader:
    // {
    //     modules: [__dirname  + '/node_modules']
    // }
};