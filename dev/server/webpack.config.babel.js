import path from 'path';

import nodeExternals from 'webpack-node-externals';

import config from '../../settings/server/config.js';

export default {
    /**
     * Webpack built-in develop tools.
     *
     * Use sourcemap to recover codes from bundle file.
     * `inline-sourcemap` make sourcemap inline, which is smaller.
     */

    devtool: 'inline-sourcemap',

    /**
     * Bundle mode.
     *
     * In develop, this option should be `mode: 'development'`.
     * In production, this option should be `mode: 'production'`.
     */

    mode:    'development',

    /**
     * Entry file for bundling.
     *
     * First convert ES6+ syntax into ES5 with ES6 polyfill.
     * Then bundle `server.js` into `server.min.js`.
     */

    entry:   [
        'babel-polyfill',
        path.join( config.projectRoot, 'server.js' ),
    ],

    /**
     * Bundled file destination.
     *
     * After bundling, put `server.min.js` to path `projectRoot/bin`.
     */

    output:  {
        path:     path.join( config.projectRoot, 'bin' ),
        filename: 'server.min.js',
    },

    /**
     * Bundled environment.
     *
     * Because server run in Node JS environment,
     * so this option must always be `target: 'node'`.
     */

    target:    'node',

    /**
     * Bundle without all `node_module` dependencies.
     *
     * Use `nodeExternals` for the following reason:
     * - There are too many dependencies to bundle.
     * - Cannot resolve critical dependency for `babel-polyfill`.
     */

    externals: [ nodeExternals(), ],

    /**
     * Relative import alias.
     *
     * When writing `import` statement for relative import,
     * no need to start with `'./'` or `'../'`.
     * Only work for following path:
     * - `import 'apis/.......'`
     * - `import 'dev/........'`
     * - `import 'models/.....'`
     * - `import 'routes/.....'`
     * - `import 'settings/...'`
     * - `import 'static/.....'`
     * - `import 'test/.......'`.
     */

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

    /**
     * Webpack loader modules.
     *
     * This `webpack.config.babel.js` is specific for server-side bundling,
     * therefore it can only use `.js` related loaders.
     */

    module:  {
        rules: [
            {

                /**
                 * Loader for `server.js` and other server-side `.js` files.
                 *
                 * Setting `exclude: /(node_modules)/` with same reason as option `externals`.
                 * 1. Use `eslint-loader` to lint.
                 * 2. Use `babel-loader` to transpile ES6+ syntax into ES5 syntax.
                 */

                test:    /\.js$/,
                exclude: /(node_modules)/,
                use:     [
                    {
                        loader:  'babel-loader',
                        options: {
                            /**
                             * Cache Babel transpiled result.
                             *
                             * Only need to transpile changed file each time doing bundle.
                             * Default cache directory: `node_modules/.cache/babel-loader`.
                             */

                            cacheDirectory: true,

                            /**
                             * Using latest ES6+ feature.
                             */

                            presets:        [ '@babel/preset-env', ],

                            /**
                             * Avoid using Babel settings in `package.json`.
                             *
                             * This very file `webpack.config.babel.js` is written in ES6+ syntax,
                             * which use Babel settings in `package.json` to transpile.
                             * `babel-loader` is aimed to transpile `server.js` and other server-side `.js` files,
                             * which need different Babel settings from `webpack.config.babel.js`.
                             */

                            babelrc:        false,
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
