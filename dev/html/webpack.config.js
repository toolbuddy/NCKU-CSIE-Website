/**
 * Webpack configuration for transpiling and bundling `pug` files.
 * Run webpack using this configuration by the script: `npm run build:html`.
 *
 * This file only process `pug` entries (`.pug` files) and convert them into
 * HTML files (`.html`), for `.scss` and `.js` see
 * `dev/css/webpack.config.js` and `dev/js/webpack.config.js`.
 *
 * See pug's official website https://pugjs.org/ and webpack's official website
 * https://webpack.js.org/ for more information.
 */

const path = require('path');

const {host, staticHost} = require('../../settings/server/config.js');
const LanguageUtils = require('../../models/common/utils/language.js');
const announcementTagUtils = require('../../models/announcement/utils/tag.js');
const facultyResearchGroupUtils = require('../../models/faculty/utils/research-group');
const facultyDepartmentUtils = require('../../models/faculty/utils/department.js');
const UrlUtils = require('../../static/src/js/utils/url.js');

const projectRoot = path.resolve(__dirname, '../..');
const pugSrcRoot = path.join(projectRoot, 'static/src/pug');
const pugDistRoot = path.join(projectRoot, 'static/dist/html');

/**
 * Build different language version HTML for each `.pug` file.
 *
 * There are three types of `.pug` files:
 * 1. Language and data can be statically determined.
 *      - No need to dynamically render HTML.
 *      - Statically build each language version of HTML.
 *      - Statically built by webpack.
 *      - Fastest response time (client will see web page quickly) among the three.
 * 2. Language and data are dynamically determined.
 *      - Required `languageId` to output language-specific HTML.
 *      - Run time render according to server-side logic.
 *      - Lowest response time (client will need to wait render result) among the three.
 * 3. Language and Part of data can be statically determined.
 *      - Statically build each language version of HTML, and use AJAX to fetch additional data.
 *      - Statically built by webpack.
 */

module.exports = (env, argv) => {
    /**
     * Get mode from command line argument `--mode`.
     * See `package.json`'s script section.
     */

    const isDevMode = argv.mode === 'development';
    const isProdMode = argv.mode === 'production';

    return LanguageUtils.supportedLanguageId.map(languageId => ({
        /**
         * The base directory, an absolute path, for resolving entry points and
         * loaders from configuration.
         */

        context: pugSrcRoot,

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
            // Route `about`
            'about/award': './about/award.pug',
            'about/contact': './about/contact.pug',
            'about/faculty': './about/faculty.pug',
            'about/index': './about/index.pug',
            'about/intro': './about/intro.pug',
            'about/staff': './about/staff.pug',
            'about/rule': './about/rule.pug',

            // Route `research`
            'research/lab': './research/lab.pug',
            'research/center': './research/center.pug',
            'research/index': './research/index.pug',
            'research/research-group': './research/research-group.pug',

            // Route `announcement`
            'announcement/activity': './announcement/activity.pug',
            'announcement/all': './announcement/all.pug',
            'announcement/index': './announcement/index.pug',
            'announcement/admission': './announcement/admission.pug',
            'announcement/recruitment': './announcement/recruitment.pug',

            // Route `error`
            'error/404': './error/404.pug',

            // Route `home`
            'home/index': './home/index.pug',
            'home/search': './home/search.pug',

            // Route `resource`
            'resource/alumni': './resource/alumni.pug',
            'resource/fix': './resource/fix.pug',
            'resource/ieet': './resource/ieet.pug',
            'resource/index': './resource/index.pug',
            'resource/rent': './resource/rent.pug',
            'resource/sitemap': './resource/sitemap.pug',
            'resource/link': './resource/link.pug',
            'resource/venue': './resource/venue.pug',

            // Route `student`
            'student/high-school': './student/high-school.pug',
            'student/college': './student/college.pug',
            'student/index': './student/index.pug',
            'student/master': './student/master.pug',
            'student/phd': './student/phd.pug',
            'student/international': './student/international.pug',

            // Route `user`
            'user/faculty/index': './user/faculty/index.pug',
            'user/staff/index': './user/staff/index.pug',
            'user/announcement/index': './user/announcement/index.pug',
            'user/announcement/add': './user/announcement/add.pug',
            'user/announcement/edit': './user/announcement/edit.pug',
            'user/announcement/news-list': './user/announcement/news-list.pug',

            // Route `developer`
            'developer/index': './developer/index.pug',
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
                 * Loader for `.pug` files.
                 *
                 * Bundle `.pug` files into `.html` by the following steps:
                 * 1. Use `pug-html-loader` to compile `.pug` files into HTML DOM object.
                 *      - Set `basedir: pugSrcRoot` to interpret `/` in pug files `include` command.
                 *      - Set `data` to provide variables for template.
                 *      - Render template and generate HTML string.
                 * 2. Use `html-loader` to exports HTML DOM object as JS string.
                 *      - HTML DOM object is input from the output of `pug-html-loader`.
                 * 3. Use `extract-loader` to extract JS string as text.
                 *      - JS string is input from the output of `html-loader`.
                 * 4. Use `file-loader` to save text into file.
                 *      - Text is input from the output of `extract-loader`.
                 *      - Rename each file with format: `[name].${languageId}.html`.
                 */

                {
                    test: /\.pug$/u,
                    use: [
                        // Save text into file.
                        {
                            loader: 'file-loader',
                            options: {
                                name (file) {
                                    /**
                                     * Build HTML files for each language.
                                     *
                                     * For example, if the source file name is `about/award.pug`,
                                     * then we have the following:
                                     * - `file === 'projectRoot/static/src/pug/about/award.pug'`
                                     * - `file.split(pugSrcRoot)[1] === 'about/award.pug'`
                                     * - `file.split(pugSrcRoot)[1].split('.pug')[0] === 'about/award'`
                                     * If `languageId` include `0` and `1`, then we output to files
                                     * - `about/award.0.html`
                                     * - `about/award.1.html`
                                     **/

                                    return `${file.split(pugSrcRoot)[1].split('.pug')[0]}.${languageId}.html`;
                                },
                            },
                        },

                        // Extract JS string as text.
                        {
                            loader: 'extract-loader',
                        },

                        // Exports HTML DOM object as JS string.
                        {
                            loader: 'html-loader',
                            options: {
                                minimize: isProdMode,
                            },
                        },

                        // Compile `.pug` files into HTML DOM object.
                        {
                            loader: 'pug-html-loader',

                            // The following options will be passed to `pug`'s API.
                            options: {
                                // The root directory of all absolute inclusion.
                                basedir: pugSrcRoot,

                                // Compile `.pug` files with better error messages.
                                compileDebug: !isProdMode,

                                // Set of data to pass to the pug render.
                                data: {
                                    SERVER: {
                                        host,
                                        staticHost,
                                    },
                                    LANG: {
                                        id: languageId,
                                        getLanguageId: LanguageUtils.getLanguageId,
                                    },
                                    UTILS: {
                                        url: UrlUtils.serverUrl(new UrlUtils(host, languageId)),
                                        staticUrl: UrlUtils.serverUrl(new UrlUtils(staticHost, languageId)),
                                        announcement: {
                                            tagUtils: announcementTagUtils,
                                        },
                                        faculty: {
                                            researchGroupUtils: facultyResearchGroupUtils,
                                            departmentUtils: facultyDepartmentUtils,
                                        },
                                    },
                                },
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
         * and thus generate `.js` as output even when we use `.pug` as entry.
         * So here we set output useless `.js` files to `do-not-use-me` as a reminder.
         */

        output: {
            path: pugDistRoot,
            filename: '[name]-do-not-use-me.js',
        },

        /**
         * Bundled environment.
         *
         * Because HTML run in browsers,
         * so this option must always be `target: 'web'`.
         */

        target: 'web',
    }));
};
