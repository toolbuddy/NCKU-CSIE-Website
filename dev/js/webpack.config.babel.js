import path from 'path';

import { projectRoot, } from '../../settings/server/config.js';

const jsSrcRoot = path.join( projectRoot, 'static/src/js' );
const jsDistRoot = path.join( projectRoot, 'static/dist/js' );
const staticRoot = path.join( projectRoot, 'static' );

export default {
    /**
     * Webpack built-in develop tools.
     *
     * Use sourcemap to recover codes from bundle file.
     * `inline-sourcemap` make sourcemap inline, which is smaller.
     * In develop, this option should be `devtool: 'inline-sourcemap'`.
     * In production, this option should be `devtool: false`.
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
     * Entry files for bundling.
     *
     * @todo convert ES6+ syntax into ES5 with ES6 polyfill.
     */

    entry:   {
        // Route `about`
        'about/award':          path.join( jsSrcRoot, 'about/award.js' ),
        'about/contact':        path.join( jsSrcRoot, 'about/contact.js' ),
        'about/faculty-detail': path.join( jsSrcRoot, 'about/faculty-detail.js' ),
        'about/faculty':        path.join( jsSrcRoot, 'about/faculty.js' ),
        'about/index':          path.join( jsSrcRoot, 'about/index.js' ),
        'about/intro':          path.join( jsSrcRoot, 'about/intro.js' ),
        'about/staff':          path.join( jsSrcRoot, 'about/staff.js' ),

        // Route `announcement`
        'announcement/activity':     path.join( jsSrcRoot, 'announcement/activity.js' ),
        'announcement/all':          path.join( jsSrcRoot, 'announcement/all.js' ),
        'announcement/index':        path.join( jsSrcRoot, 'announcement/index.js' ),
        'announcement/announcement': path.join( jsSrcRoot, 'announcement/announcement.js' ),
        'announcement/recruitment':  path.join( jsSrcRoot, 'announcement/recruitment.js' ),

        // Route `home`
        'home/index': path.join( jsSrcRoot, 'home/index.js' ),
        'home/error': path.join( jsSrcRoot, 'home/error.js' ),

        // Route `research`
        'research/index':        path.join( jsSrcRoot, 'research/index.js' ),
        'research/labs':         path.join( jsSrcRoot, 'research/labs.js' ),
        'research/publications': path.join( jsSrcRoot, 'research/publications.js' ),

        // Route `resource`
        'resource/alumni':  path.join( jsSrcRoot, 'resource/alumni.js' ),
        'resource/fix':     path.join( jsSrcRoot, 'resource/fix.js' ),
        'resource/ieet':    path.join( jsSrcRoot, 'resource/ieet.js' ),
        'resource/index':   path.join( jsSrcRoot, 'resource/index.js' ),
        'resource/rent':    path.join( jsSrcRoot, 'resource/rent.js' ),
        'resource/rule':    path.join( jsSrcRoot, 'resource/rule.js' ),
        'resource/sitemap': path.join( jsSrcRoot, 'resource/sitemap.js' ),

        // Route `student`
        'student/college':       path.join( jsSrcRoot, 'student/college.js' ),
        'student/index':         path.join( jsSrcRoot, 'student/index.js' ),
        'student/master':        path.join( jsSrcRoot, 'student/master.js' ),
        'student/phd':           path.join( jsSrcRoot, 'student/phd.js' ),

        // Route `user`
        'user/index':              path.join( jsSrcRoot, 'user/index.js' ),
        'user/announcement/index': path.join( jsSrcRoot, 'user/announcement/index.js' ),
        'user/announcement/add':   path.join( jsSrcRoot, 'user/announcement/add.js' ),
        'user/announcement/edit':  path.join( jsSrcRoot, 'user/announcement/edit.js' ),
    },

    /**
     * Bundled file destination.
     *
     * After bundling, put file to path `jsDistRoot`.
     * Rename original file name `f.js` to `f.min.js`.
     */

    output: {
        path:     jsDistRoot,
        filename: '[name].min.js',
    },

    /**
     * Bundled environment.
     *
     * Because JS run in browsers,
     * so this option must always be `target: 'web'`.
     */

    target:  'web',

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
            models:   path.join( projectRoot, 'models' ),
            static:   staticRoot,
            settings: path.join( projectRoot, 'settings' ),
        },
    },

    /**
     * Webpack loader modules.
     *
     * This `webpack.config.babel.js` is specific for client-side bundling,
     * therefore it can be use with `.css`, `.js`, `.pug` and image related loaders.
     */

    module:  {
        rules: [

            /**
             * Loader for `.css` files.
             *
             * Bundle `.css` file into `.js` by following steps:
             * 1. Use `css-loader` to resolve `@import` and `url()` in `.css` files.
             *      - `@import '...css'` will bundle local `.css` file.
             *      - `@import url('...css')` will fetch and bundle remote `.css` file.
             *      - `@import url(image)` will use `url-loader` to convert image into data url.
             * 2. Use `style-loader` to add CSS to DOM by injecting a `<style>` tag.
             */

            {
                test: /\.css$/,
                use:  [
                    {
                        loader:    'style-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader:  'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },

            /**
             * Loader for `.js` files.
             *
             * Use `eslint-loader` to lint.
             */

            {
                test:    /\.js$/,
                use:     {
                    loader:  'eslint-loader',
                    options: {
                        fix:           true,
                        configFile:    path.join( projectRoot, 'dev/js/.eslintrc.js' ),
                    },
                },
            },

            /**
             * Loader for `.pug` files.
             *
             * Use `pug-loader` to convert `.pug` file into JS function.
             * Call function with data will return HTML string literal.
             */

            {
                test: /\.pug$/,
                use:  [
                    {
                        loader:  'pug-loader',
                        options: {
                            root: path.join( staticRoot, 'src/pug' ),
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
                test: /\.(gif|png|jpe?g|svg)$/,
                use:  [
                    'url-loader',
                ],
            },
        ],
    },
};
