/**
 * Webpack configuration for transpiling and bundling `scss` files.
 * Run webpack using this configuration by the script: `npm run build:css`.
 *
 * This file only process `scss` entries (`.scss` files) and convert them into
 * CSS files (`.css`), for `.pug` and `.js` see
 * `dev/html/webpack.config.js` and `dev/js/webpack.config.js`.
 *
 * See SCSS's official website https://sass-lang.com/ and webpack's official website
 * https://webpack.js.org/ for more information.
 */

const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const {staticHost} = require('../../settings/server/config.js');

const projectRoot = path.resolve(__dirname, '../../');
const imageRoot = path.join(projectRoot, 'static/src/image');
const sassSrcRoot = path.join(projectRoot, 'static/src/sass');
const sassDistRoot = path.join(projectRoot, 'static/dist/css');
const nodeModulesRoot = path.join(projectRoot, 'node_modules');

/**
 * Build CSS off all language version HTML for each `.scss` file.
 *
 * For now, there is no difference in different language version.
 * Using single CSS to fit all is not a good idea, should be designed carefully later on.
 */

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

        context: sassSrcRoot,

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
            // Route `about`
            'about/award': {
                import: './about/award.scss',
                filename: 'about/award.scss',
            },
            'about/contact': {
                import: './about/contact.scss',
                filename: 'about/contact.scss',
            },
            'about/faculty-detail': {
                import: './about/faculty-detail.scss',
                filename: 'about/faculty-detail.scss',
            },
            'about/faculty': {
                import: './about/faculty.scss',
                filename: 'about/faculty.scss',
            },
            'about/index': {
                import: './about/index.scss',
                filename: 'about/index.scss',
            },
            'about/intro': {
                import: './about/intro.scss',
                filename: 'about/intro.scss',
            },
            'about/staff': {
                import: './about/staff.scss',
                filename: 'about/staff.scss',
            },

            // Route `announcement`
            'announcement/activity': {
                import: './announcement/activity.scss',
                filename: 'announcement/activity.scss',
            },
            'announcement/all': {
                import: './announcement/all.scss',
                filename: 'announcement/all.scss',
            },
            'announcement/index': {
                import: './announcement/index.scss',
                filename: 'announcement/index.scss',
            },
            'announcement/detail': {
                import: './announcement/detail.scss',
                filename: 'announcement/detail.scss',
            },
            'announcement/recruitment': {
                import: './announcement/recruitment.scss',
                filename: 'announcement/recruitment.scss',
            },

            // Route `error`
            'error/404': {
                import: './error/404.scss',
                filename: 'error/404.scss',
            },

            // Route `home`
            'home/index': {
                import: './home/index.scss',
                filename: 'home/index.scss',
            },
            'home/search': {
                import: './home/search.scss',
                filename: 'home/search.scss',
            },

            // Route `research`
            'research/index': {
                import: './research/index.scss',
                filename: 'research/index.scss',
            },
            'research/lab': {
                import: './research/lab.scss',
                filename: 'research/lab.scss',
            },
            'research/publication': {
                import: './research/publication.scss',
                filename: 'research/publication.scss',
            },

            // Route `resource`
            'resource/alumni': {
                import: './resource/alumni.scss',
                filename: 'resource/alumni.scss',
            },
            'resource/fix': {
                import: './resource/fix.scss',
                filename: 'resource/fix.scss',
            },
            'resource/ieet': {
                import: './resource/ieet.scss',
                filename: 'resource/ieet.scss',
            },
            'resource/index': {
                import: './resource/index.scss',
                filename: 'resource/index.scss',
            },
            'resource/rent': {
                import: './resource/rent.scss',
                filename: 'resource/rent.scss',
            },
            'resource/rule': {
                import: './resource/rule.scss',
                filename: 'resource/rule.scss',
            },
            'resource/sitemap': {
                import: './resource/sitemap.scss',
                filename: 'resource/sitemap.scss',
            },
            'resource/link': {
                import: './resource/link.scss',
                filename: 'resource/link.scss',
            },

            // Route `student`
            'student/high-school': {
                import: './student/high-school.scss',
                filename: 'student/high-school.scss',
            },
            'student/college': {
                import: './student/college.scss',
                filename: 'student/college.scss',
            },
            'student/index': {
                import: './student/index.scss',
                filename: 'student/index.scss',
            },
            'student/master': {
                import: './student/master.scss',
                filename: 'student/master.scss',
            },
            'student/phd': {
                import: './student/phd.scss',
                filename: 'student/phd.scss',
            },

            // Route `user`
            'user/index': {
                import: './user/index.scss',
                filename: 'user/index.scss',
            },
            'user/faculty/profile': {
                import: './user/faculty/profile.scss',
                filename: 'user/faculty/profile.scss',
            },
            'user/faculty/student-award': {
                import: './user/faculty/student-award.scss',
                filename: 'user/faculty/student-award.scss',
            },
            'user/faculty/award': {
                import: './user/faculty/award.scss',
                filename: 'user/faculty/award.scss',
            },
            'user/faculty/publication': {
                import: './user/faculty/publication.scss',
                filename: 'user/faculty/publication.scss',
            },
            'user/faculty/conference': {
                import: './user/faculty/conference.scss',
                filename: 'user/faculty/conference.scss',
            },
            'user/faculty/project': {
                import: './user/faculty/project.scss',
                filename: 'user/faculty/project.scss',
            },
            'user/faculty/patent': {
                import: './user/faculty/patent.scss',
                filename: 'user/faculty/patent.scss',
            },
            'user/faculty/technology-transfer': {
                import: './user/faculty/technology-transfer.scss',
                filename: 'user/faculty/technology-transfer.scss',
            },
            'user/staff/profile': {
                import: './user/staff/profile.scss',
                filename: 'user/staff/profile.scss',
            },
            'user/resetPassword': {
                import: './user/resetPassword.scss',
                filename: 'user/resetPassword.scss',
            },
            'user/announcement/edit': {
                import: './user/announcement/edit.scss',
                filename: 'user/announcement/edit.scss',
            },
            'user/announcement/add': {
                import: './user/announcement/add.scss',
                filename: 'user/announcement/add.scss',
            },

            // Route `auth`
            'auth/login': {
                import: './auth/login.scss',
                filename: 'auth/login.scss',
            },

            // Route `developer`
            'developer/index': {
                import: './developer/index.scss',
                filename: 'developer/index.scss',
            },
        },

        /**
         * Bundle mode.
         *
         * In development mode set to `mode: 'development'`.
         * In production mode set to `mode: 'production'`.
         * In test mode set to `mode: 'none'`.
         */

        mode: isDevMode ? 'development' : 'production',

        /**
         * Webpack loader modules.
         *
         * Modules (files) will be handle according to their extention
         * (`.css`, `.svg`, `.png`, `.jpg`, etc.).
         */

        module: {
            rules: [

                /**
                 * Loader for `.scss` files.
                 *
                 * Bundle `.scss` files into `.css` by following steps:
                 * 1. Use `sass-loader` to compile `.scss` files into CSS string.
                 *      - Set `includePaths` for easier writing `@import` statements.
                 * 2. Use `postcss-loader` to post-processing CSS.
                 *      - CSS string is input from the output of `sass-loader`.
                 *      - Use `postcss.config.js` to load `postcss` configuration.
                 * 3. Use `css-loader` to resolve dependencies in CSS string.
                 *      - CSS string is input from the output of `postcss-loader`.
                 *      - Interpret `@import` and `url()` like `import/require()` and will resolve them.
                 * 4. Use `MiniCssExtractPlugin.loader` to extract CSS files.
                 *      - CSS string is input from the output of `css-loader`.
                 *      - Rename each file with format: `[name].min.css`.
                 */

                {
                    test: /\.scss$/u,
                    use: [
                        // Extracts CSS into seperate files.
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },

                        // Interprets `@import` and `url()` like `import/require()`
                        // and will resolve them.
                        {
                            loader: 'css-loader',
                        },

                        // Post-process CSS.
                        {
                            loader: 'postcss-loader',
                            options: {
                                // The following options will be passed to `postcss`'s API.
                                postcssOptions: {
                                    config: path.resolve(__dirname, 'postcss.config.js'),
                                },
                            },
                        },

                        // Load `.scss` files and compile to CSS.
                        {
                            loader: 'sass-loader',
                            options: {
                                // The following options will be passed to `sass`'s API.
                                sassOptions: {
                                    // An array of paths that `sass` can look in to attempt to
                                    // resolve `@import` declarations.
                                    includePaths: [sassSrcRoot],
                                },
                            },
                        },
                    ],
                },

                /**
                 * Loader for image files.
                 *
                 * Use `file-loader` to convert image file path into
                 * public static file url `staticHost`.
                 * Image must only appear in `.pug` or `.css` files.
                 * Work with following image format:
                 * - `.gif`
                 * - `.png`
                 * - `.jpg` or `.jpeg`
                 * - `.svg`
                 */

                {
                    test: /\.(?<image>gif|png|jpe?g|svg)$/u,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name (file) {
                                    /**
                                     * Change `url()` path to public path `staticHost`.
                                     *
                                     * For example, if url is `~image/icon/404.png`,
                                     * then we have the following:
                                     * - `file === 'projectRoot/static/src/image/icon/404.png'`
                                     * - `file.split(imageRoot)[1] === '/icon/404.png'`
                                     * Then `file-loader` prefix url with `${staticHost}/image`.
                                     **/

                                    return `${staticHost}/image${file.split(imageRoot)[1]}`;
                                },

                                // `file-loader` will return a public URL but will not emit the file.
                                // See `name` function above to get return public URL format.
                                emitFile: false,
                            },
                        },
                    ],
                },
            ],
        },

        /**
         * Useless JS file destination.
         *
         * Webpack consider entry files will only be `.js`,
         * and thus generate `.js` as output even when we use `.scss` as entry.
         * So here we set output useless `.js` files to `do-not-use-me` as a reminder.
         */

        output: {
            path: sassDistRoot,
            publicPath: staticHost,
            filename: '[name]-do-not-use-me.js',
        },

        /**
         * Lint `.js` files before bundling.
         *
         * Use `eslint-webpack-plugin` since `eslint-loader` is deprecated.
         */

        plugins: [
            // Extracts CSS into seperate files.
            new MiniCssExtractPlugin({
                // The name of each output CSS file and save as `[name].min.css`,
                // where `[name]` will be replaced with origin SCSS file name.
                filename: '[name].min.css',
            }),

            // SCSS linter.
            new StyleLintPlugin({
                // File path for `stylelint` configuration.
                configFile: path.join(projectRoot, 'dev/css/.stylelintrc.js'),

                // Store the results of processed files so that
                // `stylelint` only operates on the changed ones.
                cache: true,

                // Path to the cache file location.
                cacheLocation: path.join(nodeModulesRoot, '.cache/.stylelintcache'),

                // Specify a non-standard syntax that should be used to parse source stylesheets.
                syntax: 'scss',

                // Fix as many error as possible.
                fix: true,
            }),
        ],

        /**
         * Relative url alias.
         *
         * When writing `@import` or `url()` statement to import module,
         * no need to write relative path such as `'./'` or `'../'`.
         * Only work for following path:
         * - `@import '~thirdPartyLib/...'`
         * - `url('~image/...')`
         */

        resolve: {
            alias: {
                image: imageRoot,
                thirdPartyLib: nodeModulesRoot,
            },
        },

        /**
         * Bundled environment.
         *
         * Because CSS run in browsers,
         * so this option must always be `target: 'web'`.
         */

        target: 'web',
    };
};
