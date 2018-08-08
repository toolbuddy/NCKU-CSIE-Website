const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const StyleLintPlugin = require( 'stylelint-webpack-plugin' );
const autoprefixer = require( 'autoprefixer' );
const cssnano = require( 'cssnano' );

const projectRoot = path.dirname( path.dirname( __dirname ) );
const sassRoot = path.join( projectRoot, 'static/src/sass' );
const imageRoot = path.join( projectRoot, 'static/src/image' );
const cssRoot = path.join( projectRoot, 'static/dist/css' );
const browsers = require( path.join( projectRoot, 'settings/browserlist/config.js' ) );
const devMode = true;

module.exports = {
    devtool: devMode ? 'inline-sourcemap' : null,
    mode:    devMode ? 'development' : 'production',
    entry:   {
        // Route `about`
        'about/honor':    path.join( sassRoot, 'about/honor.scss' ),
        'about/intro':    path.join( sassRoot, 'about/intro.scss' ),
        'about/location': path.join( sassRoot, 'about/location.scss' ),
        'about/members':  path.join( sassRoot, 'about/members.scss' ),
        'about/teacher':  path.join( sassRoot, 'about/teacher.scss' ),
        'about/teachers': path.join( sassRoot, 'about/teachers.scss' ),

        // Route `announcement`
        'announcement/activity':      path.join( sassRoot, 'announcement/activity.scss' ),
        'announcement/all':           path.join( sassRoot, 'announcement/all.scss' ),
        'announcement/announcement':  path.join( sassRoot, 'announcement/announcement.scss' ),
        'announcement/recruitment':   path.join( sassRoot, 'announcement/recruitment.scss' ),

        // Route `home`
        'home/index': path.join( sassRoot, 'home/index.scss' ),

        // Route `research`
        'research/awards':       path.join( sassRoot, 'research/awards.scss' ),
        'research/conferences':  path.join( sassRoot, 'research/conferences.scss' ),
        'research/groups':       path.join( sassRoot, 'research/groups.scss' ),
        'research/labs':         path.join( sassRoot, 'research/labs.scss' ),
        'research/publications': path.join( sassRoot, 'research/publications.scss' ),

        // Route `resource`
        'resource/fix':       path.join( sassRoot, 'resource/fix.scss' ),
        'resource/ieet':      path.join( sassRoot, 'resource/ieet.scss' ),
        'resource/rule':       path.join( sassRoot, 'resource/rule.scss' ),
        'resource/rent':      path.join( sassRoot, 'resource/rent.scss' ),
        'resource/resources': path.join( sassRoot, 'resource/resources.scss' ),

        // Route `student`
        'student/college':       path.join( sassRoot, 'student/college.scss' ),
        'student/course':        path.join( sassRoot, 'student/course.scss' ),
        'student/international': path.join( sassRoot, 'student/international.scss' ),
        'student/internship': path.join( sassRoot, 'student/internship.scss' ),
        'student/master':        path.join( sassRoot, 'student/master.scss' ),
        'student/phd':           path.join( sassRoot, 'student/phd.scss' ),
        'student/scholarship':   path.join( sassRoot, 'student/scholarship.scss' ),
    },
    output: {
        path:     cssRoot,
        filename: '[name].js',
    },
    target:  'web',
    module:  {
        rules: [
            {
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
                            includePaths: [ sassRoot,
                                imageRoot, ],
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
        // Extract CSS file.
        new MiniCssExtractPlugin( {
            filename: '[name].min.css',
        } ),

        // `stylelint` plugin for webpack.
        new StyleLintPlugin( {
            // The path to ECMAScript file that contains `stylelint` configuration object.
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
