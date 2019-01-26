import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

import browserSupportConditions from './browserlist.js';
import { projectRoot, } from '../../settings/server/config.js';

const sassRoot = path.join( projectRoot, 'static/src/sass' );
const imageRoot = path.join( projectRoot, 'static/src/image' );
const cssRoot = path.join( projectRoot, 'static/dist/css' );

const isDevMode = process.env.NODE_ENV === 'development';

/**
 * Build CSS off all language version HTML for each `.scss` file.
 *
 * For now, there is no difference in different language version.
 * Using single CSS to fit all is not a good idea, should be designed carefully later on.
 */

export default {
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
     * Bundle mode.
     *
     * In develop, this option should be `mode: 'development'`.
     * In production, this option should be `mode: 'production'`.
     */

    mode:    isDevMode ? 'development' : 'production',

    /**
     * Entry files for bundling.
     */

    entry:   {
        // Route `about`
        'about/award':          path.join( sassRoot, 'about/award.scss' ),
        'about/contact':        path.join( sassRoot, 'about/contact.scss' ),
        'about/faculty-detail': path.join( sassRoot, 'about/faculty-detail.scss' ),
        'about/faculty':        path.join( sassRoot, 'about/faculty.scss' ),
        'about/index':          path.join( sassRoot, 'about/index.scss' ),
        'about/intro':          path.join( sassRoot, 'about/intro.scss' ),
        'about/staff':          path.join( sassRoot, 'about/staff.scss' ),

        // Route `announcement`
        'announcement/activity':     path.join( sassRoot, 'announcement/activity.scss' ),
        'announcement/all':          path.join( sassRoot, 'announcement/all.scss' ),
        'announcement/index':        path.join( sassRoot, 'announcement/index.scss' ),
        'announcement/announcement': path.join( sassRoot, 'announcement/announcement.scss' ),
        'announcement/recruitment':  path.join( sassRoot, 'announcement/recruitment.scss' ),

        // Route `home`
        'home/index': path.join( sassRoot, 'home/index.scss' ),
        'home/error': path.join( sassRoot, 'home/error.scss' ),

        // Route `research`
        'research/index':        path.join( sassRoot, 'research/index.scss' ),
        'research/labs':         path.join( sassRoot, 'research/labs.scss' ),
        'research/publications': path.join( sassRoot, 'research/publications.scss' ),

        // Route `resource`
        'resource/alumni':  path.join( sassRoot, 'resource/alumni.scss' ),
        'resource/fix':     path.join( sassRoot, 'resource/fix.scss' ),
        'resource/ieet':    path.join( sassRoot, 'resource/ieet.scss' ),
        'resource/index':   path.join( sassRoot, 'resource/index.scss' ),
        'resource/rent':    path.join( sassRoot, 'resource/rent.scss' ),
        'resource/rule':    path.join( sassRoot, 'resource/rule.scss' ),
        'resource/sitemap': path.join( sassRoot, 'resource/sitemap.scss' ),

        // Route `student`
        'student/college':       path.join( sassRoot, 'student/college.scss' ),
        'student/index':         path.join( sassRoot, 'student/index.scss' ),
        'student/master':        path.join( sassRoot, 'student/master.scss' ),
        'student/phd':           path.join( sassRoot, 'student/phd.scss' ),

        // Route `user`
        'user/index': path.join( sassRoot, 'user/index.scss' ),
    },

    /**
     * Useless JS file destination.
     *
     * Target of this very `webpack.config.babel.js` is to build CSS.
     * It also generate unnecessary JS files, DO NOT USE THEM.
     */

    output: {
        path:     cssRoot,
        filename: '[name]-do-not-use-me.js',
    },

    /**
     * Bundled environment.
     *
     * Because CSS run in browsers,
     * so this option must always be `target: 'web'`.
     */

    target:  'web',

    /**
     * Relative url alias.
     *
     * When writing `url` statement for relative import,
     * no need to start with `'./'` or `'../'`.
     * Only work for following path:
     * - `url('image/...')`
     */

    resolve: {
        alias: {
            image: imageRoot,
        },
    },

    /**
     * Webpack loader modules.
     *
     * This `webpack.config.babel.js` is specific for client-side bundling,
     * it can be use with `.scss` and image related loaders.
     */

    module:  {
        rules: [

            /**
             * Loader for `.scss` files.
             *
             * Bundle `.scss` files into `.css` by following steps:
             * 1. Use `sass-loader` to transpile `.scss` files into CSS string.
             *      - Set `includePaths` for easier writing `@import` statements.
             *      - Set `sourceMap: true` to debug original `.scss` files.
             * 2. Use `postcss-loader` to post-processing CSS.
             *      - Set `autoprefixer` to add vender prefix automatically.
             *      - Set `cssnano` to remove redundant or duplicate CSS code.
             * 3. Use `css-loader` to interpret `@import` and `url()` like `import/require()` and will resolve them.
             * 4. Use `MiniCssExtractPlugin.loader` to extract CSS files and rename to `[name].min.css`.
             */

            {
                // Rules for SCSS files.
                test: /\.scss$/,
                use:  [
                    {
                        loader:  MiniCssExtractPlugin.loader,
                        options: {
                            filename: '[name].min.css',
                        },
                    },
                    {
                        loader:  'css-loader',
                        options: {
                            sourceMap: isDevMode,
                        },
                    },
                    {
                        loader:  'postcss-loader',
                        options: {
                            sourceMap: isDevMode,
                            plugins:   [
                                autoprefixer( { browserSupportConditions, } ),
                                cssnano(),
                            ],
                        },
                    },
                    {
                        loader:  'sass-loader',
                        options: {
                            includePaths: [
                                sassRoot,
                            ],
                            sourceMap:    isDevMode,
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
                // Convert image binary file into data url.
                test: /\.(gif|png|jpe?g|svg)$/,
                use:  [
                    'url-loader',
                ],
            },
        ],
    },
    plugins: [
        // Extract CSS file.
        new MiniCssExtractPlugin( {
            // Extract and save as `[name].min.css`,
            // where `[name]` will be replaced with origin SCSS file name.
            filename: '[name].min.css',
        } ),

        // SCSS linter.
        new StyleLintPlugin( {
            // File path for `stylelint` configuration.
            configFile:    path.join( projectRoot, 'dev/css/.stylelintrc.js' ),

            // Store the info about processed files in order to
            // only operate on the changed ones the next time you run `stylelint`.
            // By default, the cache is stored in `.stylelintcache` in `process.cwd()`.
            cache:         true,

            // A path to a file or directory to be used for cache.
            cacheLocation: path.join( projectRoot, 'node_modules/.cache/.stylelintcache' ),

            // Specify a non-standard syntax that should be used to parse source stylesheets.
            syntax:         'scss',
            fix:           true,
        } ),
    ],
};
