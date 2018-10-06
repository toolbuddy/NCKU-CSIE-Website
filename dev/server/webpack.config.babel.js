import path from 'path';
import config from '../../settings/server/config.js';
import nodeExternals from 'webpack-node-externals';

export default {
    devtool: 'inline-sourcemap',
    mode:    'development',

    // To get async-await function work
    entry:   [
        'babel-polyfill',
        path.join( config.projectRoot, 'server.js' ),
    ],
    output:  {
        path:     path.join( config.projectRoot, 'bin' ),
        filename: 'server.min.js',
    },
    target:    'node',
    node:      {
        __dirname:  true,
        __filename: true,
    },
    // To exclude non-native node module
    externals: [ nodeExternals(), ],
    resolve:   {
        alias: {
            apis:     path.join( config.projectRoot, 'apis' ),
            dev:      path.join( config.projectRoot, 'dev' ),
            models:   path.join( config.projectRoot, 'models' ),
            routes:   path.join( config.projectRoot, 'routes' ),
            settings: path.join( config.projectRoot, 'settings' ),
            static:   path.join( config.projectRoot, 'static' ),
            test:     path.join( config.projectRoot, 'test' ),
        },
    },
    module:  {
        rules: [
            // ECMAScript components.
            {
                test:    /\.js$/,
                // To prevent node modules being transpiled and linted
                exclude: /(node_modules)/,
                use:     [
                    {
                        loader:  'babel-loader',
                        options: {
                            // to avoid needing to run Babel recompilation process on each run
                            // default cache directory in node_modules/.cache/babel-loader
                            cacheDirectory: true,
                            presets: [ '@babel/preset-env', ],
                            // to avoid babel to read babelrc in package.json, which will make transpilng fail
                            babelrc: false,
                        },
                    },
                    {
                        loader:  'eslint-loader',
                        options: {
                            fix:        true,
                            configFile: path.join( config.projectRoot, 'dev/server/.eslintrc.js' ),
                        },
                    },
                ],
            },
        ],
    },
};
