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

        devtool: isDevMode ? 'eval-source-map' : 'source-map',

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
            'about/contact': {
                import: './about/contact.js',
                filename: 'about/contact.js',
            },
            'about/faculty-detail': {
                import: './about/faculty-detail.js',
                filename: 'about/faculty-detail.js',
            },
            'about/faculty': {
                import: './about/faculty.js',
                filename: 'about/faculty.js',
            },
            'about/index': {
                import: './about/index.js',
                filename: 'about/index.js',
            },
            'about/intro': {
                import: './about/intro.js',
                filename: 'about/intro.js',
            },
            'about/staff': {
                import: './about/staff.js',
                filename: 'about/staff.js',
            },

            // Route `announcement`.
            'announcement/activity': {
                import: './announcement/activity.js',
                filename: 'announcement/activity.js',
            },
            'announcement/all': {
                import: './announcement/all.js',
                filename: 'announcement/all.js',
            },
            'announcement/index': {
                import: './announcement/index.js',
                filename: 'announcement/index.js',
            },
            'announcement/detail': {
                import: './announcement/detail.js',
                filename: 'announcement/detail.js',
            },
            'announcement/recruitment': {
                import: './announcement/recruitment.js',
                filename: 'announcement/recruitment.js',
            },

            // Route `error`.
            'error/404': {
                import: './error/404.js',
                filename: 'error/404.js',
            },

            // Route `home`.
            'home/index': {
                import: './home/index.js',
                filename: 'home/index.js',
            },
            'home/search': {
                import: './home/search.js',
                filename: 'home/search.js',
            },

            // Route `research`.
            'research/index': {
                import: './research/index.js',
                filename: 'research/index.js',
            },
            'research/lab': {
                import: './research/lab.js',
                filename: 'research/lab.js',
            },
            'research/publication': {
                import: './research/publication.js',
                filename: 'research/publication.js',
            },

            // Route `resource`.
            'resource/alumni': {
                import: './resource/alumni.js',
                filename: 'resource/alumni.js',
            },
            'resource/fix': {
                import: './resource/fix.js',
                filename: 'resource/fix.js',
            },
            'resource/ieet': {
                import: './resource/ieet.js',
                filename: 'resource/ieet.js',
            },
            'resource/index': {
                import: './resource/index.js',
                filename: 'resource/index.js',
            },
            'resource/rent': {
                import: './resource/rent.js',
                filename: 'resource/rent.js',
            },
            'resource/rule': {
                import: './resource/rule.js',
                filename: 'resource/rule.js',
            },
            'resource/sitemap': {
                import: './resource/sitemap.js',
                filename: 'resource/sitemap.js',
            },
            'resource/link': {
                import: './resource/link.js',
                filename: 'resource/link.js',
            },

            // Route `student`.
            'student/high-school': {
                import: './student/high-school.js',
                filename: 'student/high-school.js',
            },
            'student/college': {
                import: './student/college.js',
                filename: 'student/college.js',
            },
            'student/index': {
                import: './student/index.js',
                filename: 'student/index.js',
            },
            'student/master': {
                import: './student/master.js',
                filename: 'student/master.js',
            },
            'student/phd': {
                import: './student/phd.js',
                filename: 'student/phd.js',
            },

            // Route `user`.
            'user/index': {
                import: './user/index.js',
                filename: 'user/index.js',
            },
            'user/faculty/profile': {
                import: './user/faculty/profile.js',
                filename: 'user/faculty/profile.js',
            },
            'user/faculty/award': {
                import: './user/faculty/award.js',
                filename: 'user/faculty/award.js',
            },
            'user/faculty/publication': {
                import: './user/faculty/publication.js',
                filename: 'user/faculty/publication.js',
            },
            'user/faculty/conference': {
                import: './user/faculty/conference.js',
                filename: 'user/faculty/conference.js',
            },
            'user/faculty/project': {
                import: './user/faculty/project.js',
                filename: 'user/faculty/project.js',
            },
            'user/faculty/patent': {
                import: './user/faculty/patent.js',
                filename: 'user/faculty/patent.js',
            },
            'user/faculty/student-award': {
                import: './user/faculty/student-award.js',
                filename: 'user/faculty/student-award.js',
            },
            'user/faculty/technology-transfer': {
                import: './user/faculty/technology-transfer.js',
                filename: 'user/faculty/technology-transfer.js',
            },
            'user/staff/profile': {
                import: './user/staff/profile.js',
                filename: 'user/staff/profile.js',
            },
            'user/resetPassword': {
                import: './user/resetPassword.js',
                filename: 'user/resetPassword.js',
            },
            'user/announcement/index': {
                import: './user/announcement/index.js',
                filename: 'user/announcement/index.js',
            },
            'user/announcement/add': {
                import: './user/announcement/add.js',
                filename: 'user/announcement/add.js',
            },
            'user/announcement/edit': {
                import: './user/announcement/edit.js',
                filename: 'user/announcement/edit.js',
            },

            // Route `auth`.
            'auth/login': {
                import: './auth/login.js',
                filename: 'auth/login.js',
            },

            // Route `developer`.
            'developer/index': {
                import: './developer/index.js',
                filename: 'developer/index.js',
            },
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
