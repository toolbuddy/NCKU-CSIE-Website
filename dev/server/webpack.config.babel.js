import path from 'path';
import config from '../../settings/server/config.js';

// Exclude non-native node module
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
        path:     config.projectRoot,
        filename: 'server.min.js',
    },
    target:    'node',
    node:      {
        __dirname:  true,
        __filename: true,
    },
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
                            configFile: path.join( config.projectRoot, 'dev/server/.eslintrc.js' ),
                        },
                    },
                ],
            },
        ],
    },
};
