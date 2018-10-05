const path = require( 'path' );

// To exclude non-native node module
const nodeExternals = require( 'webpack-node-externals' );

const projectRoot = path.dirname( path.dirname( __dirname ) );
const devMode = true;

module.exports = function () {
    return ( {
        devtool: devMode ? 'inline-sourcemap' : null,
        mode:    devMode ? 'development' : 'production',

        // To get async-await function work
        entry:   [
            'babel-polyfill',
            path.join( projectRoot, 'server.js' ),
        ],
        output:  {
            path:     projectRoot,
            filename: 'server.min.js',
        },
        target:    'node',
        node:      {
            __dirname: true,
        },
        externals: [ nodeExternals(), ],

        resolve: {
            alias: {
                apis:     path.join( projectRoot, 'apis' ),
                dev:      path.join( projectRoot, 'dev' ),
                models:   path.join( projectRoot, 'models' ),
                routes:   path.join( projectRoot, 'routes' ),
                settings: path.join( projectRoot, 'settings' ),
                static:   path.join( projectRoot, 'static' ),
                test:     path.join( projectRoot, 'test' ),
            },
        },
        module:  {
            rules: [
                // ECMAScript components.
                {
                    test:    /\.js$/,
                    exclude: /(node_modules)/,
                    use:     [
                        {
                            loader:  'babel-loader',
                            options: {
                                presets: [ '@babel/preset-env', ],
                                babelrc: false,
                            },
                        },
                        {
                            loader:  'eslint-loader',
                            options: {
                                fix:        true,
                                configFile: path.join( projectRoot, 'dev/server/.eslintrc.js' ),
                            },
                        },
                    ],
                },
            ],
        },
    } );
};
