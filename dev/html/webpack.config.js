const path = require( 'path' );
const StyleLintPlugin = require( 'stylelint-webpack-plugin' );

const projectRoot = path.dirname( path.dirname( __dirname ) );
const pugRoot = path.resolve( projectRoot, 'static/src/pug' );
const htmlRoot = path.resolve( projectRoot, 'static/dist/html' );
const devMode = true;

/* Process.env.NODE_ENV !== 'production'*/

module.exports = {
    devtool: devMode ? 'inline-sourcemap' : null,
    mode:    devMode ? 'development' : 'production',
    entry:   {
        // Route `about`
        'about/honor':    path.resolve( pugRoot, 'about/honor.pug' ),
        'about/intro':    path.resolve( pugRoot, 'about/intro.pug' ),
        'about/location': path.resolve( pugRoot, 'about/location.pug' ),
        'about/members':  path.resolve( pugRoot, 'about/members.pug' ),
        'about/teacher':  path.resolve( pugRoot, 'about/teacher.pug' ),
        'about/teachers': path.resolve( pugRoot, 'about/teachers.pug' ),

        // Route `announcement`
        'announcement/activity':      path.resolve( pugRoot, 'announcement/activity.pug' ),
        'announcement/administrator': path.resolve( pugRoot, 'announcement/administrator.pug' ),
        'announcement/all':           path.resolve( pugRoot, 'announcement/all.pug' ),
        'announcement/announcement':  path.resolve( pugRoot, 'announcement/announcement.pug' ),
        'announcement/recruitment':   path.resolve( pugRoot, 'announcement/recruitment.pug' ),
        'announcement/speech':        path.resolve( pugRoot, 'announcement/speech.pug' ),

        // Route `home`
        'home/index': path.resolve( pugRoot, 'home/index.pug' ),

        // Route `research`
        'research/awards':       path.resolve( pugRoot, 'research/awards.pug' ),
        'research/conferences':  path.resolve( pugRoot, 'research/conferences.pug' ),
        'research/groups':       path.resolve( pugRoot, 'research/groups.pug' ),
        'research/labs':         path.resolve( pugRoot, 'research/labs.pug' ),
        'research/publications': path.resolve( pugRoot, 'research/publications.pug' ),

        // Route `resource`
        'resource/fix':       path.resolve( pugRoot, 'resource/fix.pug' ),
        'resource/ieet':      path.resolve( pugRoot, 'resource/ieet.pug' ),
        'resource/law':       path.resolve( pugRoot, 'resource/law.pug' ),
        'resource/rent':      path.resolve( pugRoot, 'resource/rent.pug' ),
        'resource/resources': path.resolve( pugRoot, 'resource/resources.pug' ),

        // Route `student`
        'student/college':       path.resolve( pugRoot, 'student/college.pug' ),
        'student/course':        path.resolve( pugRoot, 'student/course.pug' ),
        'student/international': path.resolve( pugRoot, 'student/international.pug' ),
        'student/master':        path.resolve( pugRoot, 'student/master.pug' ),
        'student/phd':           path.resolve( pugRoot, 'student/phd.pug' ),
        'student/scholarship':   path.resolve( pugRoot, 'student/scholarship.pug' ),
    },
    output: {
        path: htmlRoot,
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
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
                        loader: 'pug-loader',
                        options: {
                            root: pugRoot
                        }
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
            cacheLocation: projectRoot,

            // Specify the formatter that you would like to use to format your results.
            formatter:      'string',

            // Specify a non-standard syntax that should be used to parse source stylesheets.
            syntax:         'scss',
            fix:           true,
        } ),
    ],
};
