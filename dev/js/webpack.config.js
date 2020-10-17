/**
 * Webpack configuration for transpiling and bundling ECMAScripts.
 * Run webpack using this configuration by the script: `npm run build:js`.
 *
 * This file only process ECMAScripts entries (`.js` files), for `.scss` and `.pug`
 * see `dev/css/webpack.config.js` and `dev/html/webpack.config.js`.
 *
 * When adding another page, go to `entry` and add new entry file.
 * See webpack's official website https://webpack.js.org/ for more information.
 */

const path = require('path');

const ESLintPlugin = require('eslint-webpack-plugin');

const eslintConfig = require('./.eslintrc.js');
const {staticHost} = require('../../settings/server/config.js');

const projectRoot = path.resolve(__dirname, '../..');
const staticRoot = path.join(projectRoot, 'static');
const jsSrcRoot = path.join(staticRoot, 'src/js');
const jsDistRoot = path.join(staticRoot, 'dist/js');

module.exports = (env, argv) => {
    /**
     * Get mode from command line argument `--mode`.
     * See `package.json`'s script section.
     */

    const isDevMode = argv.mode === 'development';
    const isProdMode = argv.mode === 'production';

    return {
        /**
         * The base directory, an absolute path, for resolving entry points and
         * loaders from configuration.
         */

        context: jsSrcRoot,

        /**
         * Webpack built-in develop tools.
         *
         * Use sourcemap to recover codes from bundle file.
         * `inline-sourcemap` make sourcemap inline, which is smaller.
         * In develop, this option should be `devtool: 'inline-sourcemap'`.
         * In production, this option should be `devtool: false`.
         */

        devtool: isDevMode ? 'inline-sourcemap' : false,

        /**
         * Bundled files' source.
         */

        entry: {
            // Dependencies.
            // 'pug': ['pug'],

            // Route `about`.
            'about/award': {
                // DependOn: 'pug',
                import: './about/award.js',
                filename: 'about/award.js',
            },

            // 'about/contact': path.join(jsSrcRoot, 'about/contact.js'),
            // 'about/faculty-detail': path.join(jsSrcRoot, 'about/faculty-detail.js'),
            // 'about/faculty': path.join(jsSrcRoot, 'about/faculty.js'),
            // 'about/index': path.join(jsSrcRoot, 'about/index.js'),
            // 'about/intro': path.join(jsSrcRoot, 'about/intro.js'),
            // 'about/staff': path.join(jsSrcRoot, 'about/staff.js'),

            // // Route `announcement`.
            // 'announcement/activity': path.join(jsSrcRoot, 'announcement/activity.js'),
            // 'announcement/all': path.join(jsSrcRoot, 'announcement/all.js'),
            // 'announcement/index': path.join(jsSrcRoot, 'announcement/index.js'),
            // 'announcement/detail': path.join(jsSrcRoot, 'announcement/detail.js'),
            // 'announcement/recruitment': path.join(jsSrcRoot, 'announcement/recruitment.js'),

            // // Route `error`.
            // 'error/404': path.join(jsSrcRoot, 'error/404.js'),

            // // Route `home`.
            // 'home/index': path.join(jsSrcRoot, 'home/index.js'),
            // 'home/search': path.join(jsSrcRoot, 'home/search.js'),

            // // Route `research`.
            // 'research/index': path.join(jsSrcRoot, 'research/index.js'),
            // 'research/lab': path.join(jsSrcRoot, 'research/lab.js'),
            // 'research/publication': path.join(jsSrcRoot, 'research/publication.js'),

            // // Route `resource`.
            // 'resource/alumni': path.join(jsSrcRoot, 'resource/alumni.js'),
            // 'resource/fix': path.join(jsSrcRoot, 'resource/fix.js'),
            // 'resource/ieet': path.join(jsSrcRoot, 'resource/ieet.js'),
            // 'resource/index': path.join(jsSrcRoot, 'resource/index.js'),
            // 'resource/rent': path.join(jsSrcRoot, 'resource/rent.js'),
            // 'resource/rule': path.join(jsSrcRoot, 'resource/rule.js'),
            // 'resource/sitemap': path.join(jsSrcRoot, 'resource/sitemap.js'),
            // 'resource/link': path.join(jsSrcRoot, 'resource/link.js'),

            // // Route `student`.
            // 'student/high-school': path.join(jsSrcRoot, 'student/high-school.js'),
            // 'student/college': path.join(jsSrcRoot, 'student/college.js'),
            // 'student/index': path.join(jsSrcRoot, 'student/index.js'),
            // 'student/master': path.join(jsSrcRoot, 'student/master.js'),
            // 'student/phd': path.join(jsSrcRoot, 'student/phd.js'),

            // // Route `user`.
            // 'user/index': path.join(jsSrcRoot, 'user/index.js'),
            // 'user/faculty/profile': path.join(jsSrcRoot, 'user/faculty/profile.js'),
            // 'user/faculty/award': path.join(jsSrcRoot, 'user/faculty/award.js'),
            // 'user/faculty/publication': path.join(jsSrcRoot, 'user/faculty/publication.js'),
            // 'user/faculty/conference': path.join(jsSrcRoot, 'user/faculty/conference.js'),
            // 'user/faculty/project': path.join(jsSrcRoot, 'user/faculty/project.js'),
            // 'user/faculty/patent': path.join(jsSrcRoot, 'user/faculty/patent.js'),
            // 'user/faculty/student-award': path.join(jsSrcRoot, 'user/faculty/student-award.js'),
            // 'user/faculty/technology-transfer': path.join(jsSrcRoot, 'user/faculty/technology-transfer.js'),
            // 'user/staff/profile': path.join(jsSrcRoot, 'user/staff/profile.js'),
            // 'user/resetPassword': path.join(jsSrcRoot, 'user/resetPassword.js'),
            // 'user/announcement/index': path.join(jsSrcRoot, 'user/announcement/index.js'),
            // 'user/announcement/add': path.join(jsSrcRoot, 'user/announcement/add.js'),
            // 'user/announcement/edit': path.join(jsSrcRoot, 'user/announcement/edit.js'),

            // // Route `auth`.
            // 'auth/login': path.join(jsSrcRoot, 'auth/login.js'),

            // // Route `developer`.
            // 'developer/index': path.join(jsSrcRoot, 'developer/index.js'),
        },

        /**
         * Bundle mode.
         *
         * In development mode set to `mode: 'development'`.
         * In production mode set to `mode: 'production'`.
         * In test mode set to `mode: 'none'`.
         */

        mode: isDevMode ? 'development' : isProdMode ? 'production' : 'none',

        /**
         * Webpack loader for each modules.
         *
         * Modules (files) will be handle according to their extention
         * (`.css`, `.js`, `.pug`, etc.).
         */

        module: {
            rules: [

                /**
                 * Loaders for `.js` files.
                 *
                 * Use `babel-loader` to convert ES6 module and ES6+ syntax.
                 */

                {
                    test: /\.js$/u,
                    include: [jsSrcRoot],
                    exclude: /node_modules/u,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                            },
                        },
                    ],
                },

                /**
                 * Loader for `.pug` files.
                 *
                 * Use `pug-loader` to convert `.pug` file into JS function.
                 * Call function with data will return HTML string literal.
                 */

                {
                    test: /\.pug$/u,
                    use: [
                        {
                            loader: 'pug-loader',
                            options: {
                                root: path.join(staticRoot, 'src/pug'),
                            },
                        },
                    ],
                },

                /**
                 * Loader for image files.
                 *
                 * Use `url-loader` to convert image file into data url.
                 * Image should only appear in `.pug` or `.css` files.
                 * Work with following image format:
                 * - `.gif`
                 * - `.png`
                 * - `.jpg` or `.jpeg`
                 * - `.svg`
                 */

                {
                    test: /\.(?<image>gif|png|jpe?g|svg)$/u,
                    use: ['url-loader'],
                },
            ],
        },

        /**
         * Bundled files' destination.
         *
         * After bundling, put files to path `jsDistRoot` and
         * rename original file name `file.js` into `file.min.js`.
         */

        output: {
            filename: '[name].min.js',
            iife: true,
            module: false,
            path: jsDistRoot,
            publicPath: `${staticHost}/`,
            sourceMapFilename: '[name].js.map',
        },

        plugins: [
            new ESLintPlugin({
                baseConfig: eslintConfig,
                cache: true,
                cacheLocation: path.join(projectRoot, 'node_modules/.cache/.eslintcache-js'),
                context: jsSrcRoot,
                fix: true,
            }),
        ],

        /**
         * Relative import alias.
         *
         * When writing `import` statement for relative import,
         * no need to start with `'./'` or `'../'`.
         * Only work for following path:
         * - `import 'models/.......'`
         * - `import 'settings/...'`
         * - `import 'static/.....'`
         */

        resolve: {
            alias: {
                models: path.join(projectRoot, 'models'),
                static: staticRoot,
                settings: path.join(projectRoot, 'settings'),
            },
        },

        /**
         * Bundled environment.
         *
         * Because JS run in browsers,
         * so this option must always be `target: 'web'`.
         */

        target: 'web',
    };
};
