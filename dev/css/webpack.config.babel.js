import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import browserlist from './browserlist.js';
import config from '../../settings/server/config.js';

const sassRoot = path.join( config.projectRoot, 'static/src/sass' );
const imageRoot = path.join( config.projectRoot, 'static/src/image' );
const cssRoot = path.join( config.projectRoot, 'static/dist/css' );

export default {
    devtool: 'inline-sourcemap',
    mode:    'development',
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

        // Route `research`
        'research/groups':       path.join( sassRoot, 'research/groups.scss' ),
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
        'student/course':        path.join( sassRoot, 'student/course.scss' ),
        'student/index':         path.join( sassRoot, 'student/index.scss' ),
        'student/international': path.join( sassRoot, 'student/international.scss' ),
        'student/internship':    path.join( sassRoot, 'student/internship.scss' ),
        'student/master':        path.join( sassRoot, 'student/master.scss' ),
        'student/phd':           path.join( sassRoot, 'student/phd.scss' ),
        'student/scholarship':   path.join( sassRoot, 'student/scholarship.scss' ),

        // Route `user`
        'user/index': path.join( sassRoot, 'user/index.scss' ),
    },
    output: {
        path:     cssRoot,
        filename: '[name].js',
    },
    target:  'web',
    module:  {
        rules: [
            {
                // Rules for SCSS files.
                test: /\.scss$/,
                use:  [
                    // Extract CSS file.
                    {
                        loader:  MiniCssExtractPlugin.loader,
                        options: {
                            filename: '[name].min.css',
                        },
                    },

                    // The `css-loader` interprets `@import` and `url()` like `import/require()` and will resolve them.
                    {
                        loader:  'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },

                    // Post-Precessing CSS files.
                    {
                        loader:  'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins:   [
                                // Automatically add vendor prefixed to CSS files.
                                autoprefixer( { browserlist, } ),

                                // Optimize CSS files.
                                // Remove redundant and repeated rules.
                                cssnano(),
                            ],
                        },
                    },

                    // Compile SCSS files into CSS files.
                    {
                        loader:  'sass-loader',
                        options: {
                            // Short-hand setting for `path` in `@import path`.
                            includePaths: [
                                sassRoot,
                                imageRoot,
                            ],
                            sourceMap:    true,
                        },
                    },
                ],
            },
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
            configFile:    path.join( config.projectRoot, 'dev/css/.stylelintrc.js' ),

            // Store the info about processed files in order to
            // only operate on the changed ones the next time you run `stylelint`.
            // By default, the cache is stored in `.stylelintcache` in `process.cwd()`.
            cache:         true,

            // A path to a file or directory to be used for cache.
            cacheLocation: path.join( config.projectRoot, 'node_modules/.cache/.stylelintcache' ),

            // Specify a non-standard syntax that should be used to parse source stylesheets.
            syntax:         'scss',
            fix:           true,
        } ),
    ],
};
