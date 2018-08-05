const path = require( 'path' );

const projectRoot = path.dirname( path.dirname( __dirname ) );
const jsSrcRoot = path.resolve( projectRoot, 'static/src/js' );
const jsDistRoot = path.resolve( projectRoot, 'static/dist/js' );
const staticRoot = path.resolve( projectRoot, 'static' );
const devMode = true;

module.exports = {
    devtool: devMode ? 'inline-sourcemap' : null,
    mode:    devMode ? 'development' : 'production',
    entry:   {
        // Route `about`
        'about/honor':    path.resolve( jsSrcRoot, 'about/honor.js' ),
        'about/intro':    path.resolve( jsSrcRoot, 'about/intro.js' ),
        'about/location': path.resolve( jsSrcRoot, 'about/location.js' ),
        'about/members':  path.resolve( jsSrcRoot, 'about/members.js' ),
        'about/teacher':  path.resolve( jsSrcRoot, 'about/teacher.js' ),
        'about/teachers': path.resolve( jsSrcRoot, 'about/teachers.js' ),

        // Route `announcement`
        'announcement/activity':      path.resolve( jsSrcRoot, 'announcement/activity.js' ),
        'announcement/all':           path.resolve( jsSrcRoot, 'announcement/all.js' ),
        'announcement/announcement':  path.resolve( jsSrcRoot, 'announcement/announcement.js' ),
        'announcement/recruitment':   path.resolve( jsSrcRoot, 'announcement/recruitment.js' ),

        // Route `home`
        'home/index': path.resolve( jsSrcRoot, 'home/index.js' ),

        // Route `research`
        'research/awards':       path.resolve( jsSrcRoot, 'research/awards.js' ),
        'research/conferences':  path.resolve( jsSrcRoot, 'research/conferences.js' ),
        'research/groups':       path.resolve( jsSrcRoot, 'research/groups.js' ),
        'research/labs':         path.resolve( jsSrcRoot, 'research/labs.js' ),
        'research/publications': path.resolve( jsSrcRoot, 'research/publications.js' ),

        // Route `resource`
        'resource/fix':       path.resolve( jsSrcRoot, 'resource/fix.js' ),
        'resource/ieet':      path.resolve( jsSrcRoot, 'resource/ieet.js' ),
        'resource/rule':       path.resolve( jsSrcRoot, 'resource/rule.js' ),
        'resource/rent':      path.resolve( jsSrcRoot, 'resource/rent.js' ),
        'resource/resources': path.resolve( jsSrcRoot, 'resource/resources.js' ),

        // Route `student`
        'student/college':       path.resolve( jsSrcRoot, 'student/college.js' ),
        'student/course':        path.resolve( jsSrcRoot, 'student/course.js' ),
        'student/international': path.resolve( jsSrcRoot, 'student/international.js' ),
        'student/internship': path.resolve( jsSrcRoot, 'student/internship.js' ),
        'student/master':        path.resolve( jsSrcRoot, 'student/master.js' ),
        'student/phd':           path.resolve( jsSrcRoot, 'student/phd.js' ),
        'student/scholarship':   path.resolve( jsSrcRoot, 'student/scholarship.js' ),
    },
    output: {
        path:     jsDistRoot,
        filename: '[name].min.js',
    },
    target:  'web',
    resolve: {
        alias: {
            settings: path.resolve( projectRoot, 'settings' ),
            static: staticRoot,
            test: path.resolve( projectRoot, 'test' ),
        },
    },
    module:  {
        rules: [
            // CSS components.
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

            // ECMAScript components.
            {
                test:    /\.js$/,
                use:     {
                    loader:  'eslint-loader',
                    options: {
                        fix:           true,
                        configFile:    path.resolve( projectRoot, 'dev/js/.eslintrc.js' ),
                    },
                },
            },

            // HTML components.
            {
                test: /\.pug$/,
                use:  [
                    {
                        loader:  'pug-loader',
                        options: {
                            root: path.resolve( staticRoot, 'src/pug' ),
                        },
                    },
                ],
            },

            // Image components
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use:  [
                    'url-loader',
                ],
            },
        ],
    },
};
