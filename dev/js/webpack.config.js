const path = require( 'path' );
const StyleLintPlugin = require( 'stylelint-webpack-plugin' );
const autoprefixer = require( 'autoprefixer' );
const cssnano = require( 'cssnano' );

const projectRoot = path.dirname( path.dirname( __dirname ) );
const jsRoot = path.resolve( projectRoot, 'static/src/js' );
const cssRoot = path.resolve( projectRoot, 'static/dist/css' );
const browsers = require( path.resolve( projectRoot, 'settings/browserlist/config.js' ) );
const devMode = true;

/* Process.env.NODE_ENV !== 'production'*/

module.exports = {
    devtool: devMode ? 'inline-sourcemap' : null,
    mode:    devMode ? 'development' : 'production',
    entry:   {
        // Route `about`
        'about/honor':    path.resolve( jsRoot, 'about/honor.js' ),
        'about/intro':    path.resolve( jsRoot, 'about/intro.js' ),
        'about/location': path.resolve( jsRoot, 'about/location.js' ),
        'about/members':  path.resolve( jsRoot, 'about/members.js' ),
        'about/teacher':  path.resolve( jsRoot, 'about/teacher.js' ),
        'about/teachers': path.resolve( jsRoot, 'about/teachers.js' ),

        // Route `announcement`
        'announcement/activity':      path.resolve( jsRoot, 'announcement/activity.js' ),
        'announcement/administrator': path.resolve( jsRoot, 'announcement/administrator.js' ),
        'announcement/all':           path.resolve( jsRoot, 'announcement/all.js' ),
        'announcement/announcement':  path.resolve( jsRoot, 'announcement/announcement.js' ),
        'announcement/recruitment':   path.resolve( jsRoot, 'announcement/recruitment.js' ),
        'announcement/speech':        path.resolve( jsRoot, 'announcement/speech.js' ),

        // Route `home`
        'home/index': path.resolve( jsRoot, 'home/index.js' ),

        // Route `research`
        'research/awards':       path.resolve( jsRoot, 'research/awards.js' ),
        'research/conferences':  path.resolve( jsRoot, 'research/conferences.js' ),
        'research/groups':       path.resolve( jsRoot, 'research/groups.js' ),
        'research/labs':         path.resolve( jsRoot, 'research/labs.js' ),
        'research/publications': path.resolve( jsRoot, 'research/publications.js' ),

        // Route `resource`
        'resource/fix':       path.resolve( jsRoot, 'resource/fix.js' ),
        'resource/ieet':      path.resolve( jsRoot, 'resource/ieet.js' ),
        'resource/law':       path.resolve( jsRoot, 'resource/law.js' ),
        'resource/rent':      path.resolve( jsRoot, 'resource/rent.js' ),
        'resource/resources': path.resolve( jsRoot, 'resource/resources.js' ),

        // Route `student`
        'student/college':       path.resolve( jsRoot, 'student/college.js' ),
        'student/course':        path.resolve( jsRoot, 'student/course.js' ),
        'student/international': path.resolve( jsRoot, 'student/international.js' ),
        'student/master':        path.resolve( jsRoot, 'student/master.js' ),
        'student/phd':           path.resolve( jsRoot, 'student/phd.js' ),
        'student/scholarship':   path.resolve( jsRoot, 'student/scholarship.js' ),
    },
    output: {
        path: cssRoot,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use:  [
                    // Extract CSS file.
                    {
                        loader:  'style-loader',
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

                    // Do some trick to CSS.
                    {
                        loader:  'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins:   [
                                // Parse CSS and add vendor prefixed to CSS rules.
                                autoprefixer( { browsers, } ),

                                // CSS optimizations.
                                cssnano(),
                            ],
                        },
                    },

                    // Compile `.scss` files to CSS files.
                    {
                        loader:  'sass-loader',
                        options: {
                            includePaths: [ sassRoot, ],
                            sourceMap:    true,
                        },
                    },
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use:  [
                    'url-loader',
                ],
            },
        ],
    },
    plugins: [
        // `stylelint` plugin for webpack.
        new StyleLintPlugin( {
            // The path to ECMAScript file that contains `stylelint` configuration object.
            configFile:    path.resolve( projectRoot, 'dev/css/.stylelintrc.js' ),

            // Store the info about processed files in order to
            // only operate on the changed ones the next time you run `stylelint`.
            // By default, the cache is stored in `.stylelintcache` in `process.cwd()`.
            cache:         true,

            // A path to a file or directory to be used for cache.
            cacheLocation: projectRoot,

            // Specify the formatter that you would like to use to format your results.
            formatter:      'string',

            // Specify a non-standard syntax that should be used to parse source stylesheets.
            syntax:         'scss',
            fix:           true,
        } ),
    ],
};
