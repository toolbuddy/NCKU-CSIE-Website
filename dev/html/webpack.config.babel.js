import path from 'path';

import LanguageUtils from '../../models/common/utils/language.js';
import TagUtils from '../../models/announcement/utils/tag.js';
import ResearchGroupUtils from '../../models/faculty/utils/research-group';
import DepartmentUtils from '../../models/faculty/utils/department.js';
import UrlUtils from '../../static/src/js/utils/url.js';
import { projectRoot, host, staticHost, } from '../../settings/server/config.js';

const pugRoot = path.join( projectRoot, 'static/src/pug' );
const htmlRoot = path.join( projectRoot, 'static/dist/html' );

const isDevMode = process.env.NODE_ENV === 'development';

/**
 * Build different language version HTML for each `.pug` file.
 *
 * There are three types of `.pug` files:
 * 1. Language and data can be statically determined.
 *      - Statically build each language version HTML.
 *      - Build by webpack.
 *      - Fastest response time (client will see things quickly) among three.
 *      - Fastest completely loading page time (client will see all page content) among three.
 * 2. Language and data are dynamically determined.
 *      - Dynamically render required language version HTML with specific data.
 *      - Run time render by server template engine.
 *      - Lowest response time (client will need to wait some times to see things) among three.
 *      - Second lowest completely loading page time (client will see all page content) among three.
 * 3. Language and Part of data can be statically determined.
 *      - Statically build each language version HTML, and use AJAX to fetch additional data.
 *      - Build by webpack.
 *      - Second lowest response time (client will see things quickly, but not completely) among three.
 *      - Lowest completely loading page time (client will need to wait twice to see all page content) among three.
 */

export default LanguageUtils.supportedLanguageId.map( languageId => ( {
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
        'about/award':          path.join( pugRoot, 'about/award.pug' ),
        'about/contact':        path.join( pugRoot, 'about/contact.pug' ),
        'about/faculty':        path.join( pugRoot, 'about/faculty.pug' ),
        'about/index':          path.join( pugRoot, 'about/index.pug' ),
        'about/intro':          path.join( pugRoot, 'about/intro.pug' ),
        'about/staff':          path.join( pugRoot, 'about/staff.pug' ),

        // Route `announcement`
        'announcement/activity':     path.join( pugRoot, 'announcement/activity.pug' ),
        'announcement/all':          path.join( pugRoot, 'announcement/all.pug' ),
        'announcement/index':        path.join( pugRoot, 'announcement/index.pug' ),
        'announcement/recruitment':  path.join( pugRoot, 'announcement/recruitment.pug' ),

        // Route `error`
        'error/404': path.join( pugRoot, 'error/404.pug' ),

        // Route `home`
        'home/index': path.join( pugRoot, 'home/index.pug' ),

        // Route `research`
        'research/index':        path.join( pugRoot, 'research/index.pug' ),
        'research/labs':         path.join( pugRoot, 'research/labs.pug' ),
        'research/publications': path.join( pugRoot, 'research/publications.pug' ),

        // Route `resource`
        'resource/alumni':  path.join( pugRoot, 'resource/alumni.pug' ),
        'resource/fix':     path.join( pugRoot, 'resource/fix.pug' ),
        'resource/ieet':    path.join( pugRoot, 'resource/ieet.pug' ),
        'resource/index':   path.join( pugRoot, 'resource/index.pug' ),
        'resource/rent':    path.join( pugRoot, 'resource/rent.pug' ),
        'resource/rule':    path.join( pugRoot, 'resource/rule.pug' ),
        'resource/sitemap': path.join( pugRoot, 'resource/sitemap.pug' ),

        // Route `student`
        'student/college':       path.join( pugRoot, 'student/college.pug' ),
        'student/index':         path.join( pugRoot, 'student/index.pug' ),
        'student/master':        path.join( pugRoot, 'student/master.pug' ),
        'student/phd':           path.join( pugRoot, 'student/phd.pug' ),

        // Route `user`
        'user/index':              path.join( pugRoot, 'user/index.pug' ),
        'user/announcement/index': path.join( pugRoot, 'user/announcement/index.pug' ),
        'user/announcement/add':   path.join( pugRoot, 'user/announcement/add.pug' ),
        'user/announcement/edit':  path.join( pugRoot, 'user/announcement/edit.pug' ),
    },

    /**
     * Useless JS file destination.
     *
     * Target of this very `webpack.config.babel.js` is to build HTML.
     * It also generate unnecessary JS files, DO NOT USE THEM.
     */

    output: {
        path:     htmlRoot,
        filename: '[name]-do-not-use-me.js',
    },

    /**
     * Bundled environment.
     *
     * Because HTML run in browsers,
     * so this option must always be `target: 'web'`.
     */

    target:  'web',

    /**
     * Webpack loader modules.
     *
     * This `webpack.config.babel.js` is specific for client-side bundling,
     * it can be use with `.pug` and image related loaders.
     */

    module:  {
        rules: [

            /**
             * Loader for `.pug` files.
             *
             * Bundle `.pug` file into `.html` by following steps:
             * 1. Use `pug-html-loader` to transpile `.pug` files into HTML string.
             *      - Set `basedir: pugRoot` to interpret `/` in pug files `include` command.
             *      - Set `data` to provide variables for template.
             *      - Render template and generate HTML string.
             * 2. Use `html-loader` to export HTML as string.
             * 3. Use `extract-loader` to extract HTML into `.html` files.
             * 4. Use `file-loader` to rename each file `[name].${ language version }.html`.
             */

            {
                test: /\.pug$/,
                use:  [
                    {
                        loader:  'file-loader',
                        options: {
                            name ( file ) {
                                return `${ file.split( pugRoot )[ 1 ].split( '.pug' )[ 0 ] }.${ languageId }.html`;
                            },
                        },
                    },
                    'extract-loader',
                    {
                        loader:  'html-loader',
                    },
                    {
                        loader:  'pug-html-loader',
                        options: {
                            basedir: pugRoot,
                            data:    {
                                SERVER: {
                                    host,
                                    staticHost,
                                },
                                LANG: {
                                    id:            languageId,
                                    getLanguageId: LanguageUtils.getLanguageId,
                                },
                                UTILS: {
                                    url:             UrlUtils.serverUrl( new UrlUtils( host, languageId ) ),
                                    staticUrl:       UrlUtils.serverUrl( new UrlUtils( staticHost, languageId ) ),
                                    TagUtils,
                                    ResearchGroupUtils,
                                    DepartmentUtils,
                                },
                            },
                        },
                    },
                ],
            },
        ],
    },
} ) );
