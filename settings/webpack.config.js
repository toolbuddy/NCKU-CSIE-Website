const config = require( './server/config' );
const glob = require( 'glob' );

let getEntry = ()=>{
    var entry = {};
    glob.sync(config.rootPath + '/views/**/*.js')
        .forEach(function(name) {
            entry[n] = name;
        });
    return entry;
};

module.exports =
{
    entry: getEntry(),
    output:
    {
        path:       config.rootPath + '/static/dist',
        filename:   '[name].js'
    },
    module:
    {
        rules:
        [{
            test:    /\.js?$/,
            loader:  'babel-loader',
            options: { presets: [__dirname  + '/node_modules/babel-preset-es2015'] }
        }]
    },
    resolveLoader:
    {
        modules: [__dirname  + '/node_modules']
    }
};