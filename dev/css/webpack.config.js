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
        'user/announcement': path.join( sassRoot, 'user/announcement.scss' ),
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
