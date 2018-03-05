module.exports =
{
    entry:
    {
        background: './frontend/js-pre/xxx.js',
    },
    output:
    {
        path:       __dirname + '/frontend/js',
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