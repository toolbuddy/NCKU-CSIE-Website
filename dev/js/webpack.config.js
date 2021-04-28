/**
 * Webpack configuration for transpiling and bundling ECMAScript files.
 * Run webpack using this configuration by the script: `npm run build:js`.
 *
 * This file only process ECMAScripts entries (`.js` files), for `.scss` and `.pug`
 * see `dev/css/webpack.config.js` and `dev/html/webpack.config.js`.
 *
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
         * In development mode set to `devtool: 'eval-source-map'` for fast
         * rebuild speed and yields real files Line numbers are correctly mapped.
         * In production mode set to `devtool: 'source-map'` which separate
         * source maps that are accurate and supporting minimizing.
         */

        devtool: 'source-map',

        /**
         * Bundled files' source.
         */

        entry: {

            // Route `about`.
            'about/award': './about/award.js',
            'about/contact': './about/contact.js',
            'about/faculty-detail': './about/faculty-detail.js',
            'about/faculty': './about/faculty.js',
            'about/index': './about/index.js',
            'about/intro': './about/intro.js',
            'about/staff': './about/staff.js',

            // Route `research`.
            'research/lab': './research/lab.js',
            'research/center': './research/center.js',
            'research/index': './research/index.js',
            'research/research-group': './research/research-group.js',

            // Route `announcement`.
            'announcement/activity': './announcement/activity.js',
            'announcement/all': './announcement/all.js',
            'announcement/index': './announcement/index.js',
            'announcement/detail': './announcement/detail.js',
            'announcement/admission': './announcement/admission.js',
            'announcement/recruitment': './announcement/recruitment.js',

            // Route `error`.
            'error/404': './error/404.js',

            // Route `home`.
            'home/index': './home/index.js',
            'home/search': './home/search.js',

            // Route `resource`.
            'resource/alumni': './resource/alumni.js',
            'resource/fix': './resource/fix.js',
            'resource/ieet': './resource/ieet.js',
            'resource/index': './resource/index.js',
            'resource/rent': './resource/rent.js',
            'resource/sitemap': './resource/sitemap.js',
            'resource/link': './resource/link.js',

            // Route `student`.
            'student/high-school': './student/high-school.js',
            'student/college': './student/college.js',
            'student/index': './student/index.js',
            'student/master': './student/master.js',
            'student/phd': './student/phd.js',
            'student/international': './student/international.js',

            // Route `user`.
            'user/index': './user/index.js',
            'user/faculty/profile': './user/faculty/profile.js',
            'user/faculty/award': './user/faculty/award.js',
            'user/faculty/publication': './user/faculty/publication.js',
            'user/faculty/conference': './user/faculty/conference.js',
            'user/faculty/project': './user/faculty/project.js',
            'user/faculty/patent': './user/faculty/patent.js',
            'user/faculty/student-award': './user/faculty/student-award.js',
            'user/faculty/technology-transfer': './user/faculty/technology-transfer.js',
            'user/staff/profile': './user/staff/profile.js',
            'user/resetPassword': './user/resetPassword.js',
            'user/announcement/index': './user/announcement/index.js',
            'user/announcement/add': './user/announcement/add.js',
            'user/announcement/edit': './user/announcement/edit.js',
            'user/announcement/news': './user/announcement/news.js',
            'user/announcement/news-update': './user/announcement/news-update.js',
            'user/announcement/news-list': './user/announcement/news-list.js',

            // Route `attachment`.
            'attachment/attachment': './attachment/attachment.js',

            // Route `auth`.
            'auth/login': './auth/login.js',

            // Route `developer`.
            'developer/index': './developer/index.js',
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
                                plugins: ['@babel/transform-runtime'],
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

        /**
         * Lint `.js` files before bundling.
         *
         * Use `eslint-webpack-plugin` since `eslint-loader` is deprecated.
         */

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
