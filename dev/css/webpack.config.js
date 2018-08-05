const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const StyleLintPlugin = require( 'stylelint-webpack-plugin' );
const autoprefixer = require( 'autoprefixer' );
const cssnano = require( 'cssnano' );

const projectRoot = path.dirname( path.dirname( __dirname ) );
const sassRoot = path.resolve( projectRoot, 'static/src/sass' );
const imageRoot = path.resolve( projectRoot, 'static/src/image' );
const cssRoot = path.resolve( projectRoot, 'static/dist/css' );
const browsers = require( path.resolve( projectRoot, 'settings/browserlist/config.js' ) );
const devMode = true;

module.exports = {
    devtool: devMode ? 'inline-sourcemap' : null,
    mode:    devMode ? 'development' : 'production',
    entry:   {
        // Route `about`
        'about/honor':    path.resolve( sassRoot, 'about/honor.scss' ),
        'about/intro':    path.resolve( sassRoot, 'about/intro.scss' ),
        'about/location': path.resolve( sassRoot, 'about/location.scss' ),
        'about/members':  path.resolve( sassRoot, 'about/members.scss' ),
        'about/teacher':  path.resolve( sassRoot, 'about/teacher.scss' ),
        'about/teachers': path.resolve( sassRoot, 'about/teachers.scss' ),

        // Route `announcement`
        'announcement/activity':      path.resolve( sassRoot, 'announcement/activity.scss' ),
        'announcement/all':           path.resolve( sassRoot, 'announcement/all.scss' ),
        'announcement/announcement':  path.resolve( sassRoot, 'announcement/announcement.scss' ),
        'announcement/recruitment':   path.resolve( sassRoot, 'announcement/recruitment.scss' ),

        // Route `home`
        'home/index': path.resolve( sassRoot, 'home/index.scss' ),

        // Route `research`
        'research/awards':       path.resolve( sassRoot, 'research/awards.scss' ),
        'research/conferences':  path.resolve( sassRoot, 'research/conferences.scss' ),
        'research/groups':       path.resolve( sassRoot, 'research/groups.scss' ),
        'research/labs':         path.resolve( sassRoot, 'research/labs.scss' ),
        'research/publications': path.resolve( sassRoot, 'research/publications.scss' ),

        // Route `resource`
        'resource/fix':       path.resolve( sassRoot, 'resource/fix.scss' ),
        'resource/ieet':      path.resolve( sassRoot, 'resource/ieet.scss' ),
        'resource/rule':       path.resolve( sassRoot, 'resource/rule.scss' ),
        'resource/rent':      path.resolve( sassRoot, 'resource/rent.scss' ),
        'resource/resources': path.resolve( sassRoot, 'resource/resources.scss' ),

        // Route `student`
        'student/college':       path.resolve( sassRoot, 'student/college.scss' ),
        'student/course':        path.resolve( sassRoot, 'student/course.scss' ),
        'student/international': path.resolve( sassRoot, 'student/international.scss' ),
        'student/internship': path.resolve( sassRoot, 'student/internship.scss' ),
        'student/master':        path.resolve( sassRoot, 'student/master.scss' ),
        'student/phd':           path.resolve( sassRoot, 'student/phd.scss' ),
        'student/scholarship':   path.resolve( sassRoot, 'student/scholarship.scss' ),
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
            configFile:    path.resolve( projectRoot, 'dev/css/.stylelintrc.js' ),

            // Store the info about processed files in order to
            // only operate on the changed ones the next time you run `stylelint`.
            // By default, the cache is stored in `.stylelintcache` in `process.cwd()`.
            cache:         true,

            // A path to a file or directory to be used for cache.
            cacheLocation: path.resolve( projectRoot, 'node_modules/.cache/.stylelintcache' ),

            // Specify a non-standard syntax that should be used to parse source stylesheets.
            syntax:         'scss',
            fix:           true,
        } ),
    ],
};
