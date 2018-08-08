const path = require( 'path' );

const projectRoot = path.dirname( path.dirname( __dirname ) );
const jsSrcRoot = path.join( projectRoot, 'static/src/js' );
const jsDistRoot = path.join( projectRoot, 'static/dist/js' );
const staticRoot = path.join( projectRoot, 'static' );
const devMode = true;

module.exports = {
    devtool: devMode ? 'inline-sourcemap' : null,
    mode:    devMode ? 'development' : 'production',
    entry:   {
        // Route `about`
        'about/honor':    path.join( jsSrcRoot, 'about/honor.js' ),
        'about/intro':    path.join( jsSrcRoot, 'about/intro.js' ),
        'about/location': path.join( jsSrcRoot, 'about/location.js' ),
        'about/members':  path.join( jsSrcRoot, 'about/members.js' ),
        'about/teacher':  path.join( jsSrcRoot, 'about/teacher.js' ),
        'about/teachers': path.join( jsSrcRoot, 'about/teachers.js' ),

        // Route `announcement`
        'announcement/activity':      path.join( jsSrcRoot, 'announcement/activity.js' ),
        'announcement/all':           path.join( jsSrcRoot, 'announcement/all.js' ),
        'announcement/announcement':  path.join( jsSrcRoot, 'announcement/announcement.js' ),
        'announcement/recruitment':   path.join( jsSrcRoot, 'announcement/recruitment.js' ),

        // Route `home`
        'home/index': path.join( jsSrcRoot, 'home/index.js' ),

        // Route `research`
        'research/awards':       path.join( jsSrcRoot, 'research/awards.js' ),
        'research/conferences':  path.join( jsSrcRoot, 'research/conferences.js' ),
        'research/groups':       path.join( jsSrcRoot, 'research/groups.js' ),
        'research/labs':         path.join( jsSrcRoot, 'research/labs.js' ),
        'research/publications': path.join( jsSrcRoot, 'research/publications.js' ),

        // Route `resource`
        'resource/fix':       path.join( jsSrcRoot, 'resource/fix.js' ),
        'resource/ieet':      path.join( jsSrcRoot, 'resource/ieet.js' ),
        'resource/rule':       path.join( jsSrcRoot, 'resource/rule.js' ),
        'resource/rent':      path.join( jsSrcRoot, 'resource/rent.js' ),
        'resource/resources': path.join( jsSrcRoot, 'resource/resources.js' ),

        // Route `student`
        'student/college':       path.join( jsSrcRoot, 'student/college.js' ),
        'student/course':        path.join( jsSrcRoot, 'student/course.js' ),
        'student/international': path.join( jsSrcRoot, 'student/international.js' ),
        'student/internship': path.join( jsSrcRoot, 'student/internship.js' ),
        'student/master':        path.join( jsSrcRoot, 'student/master.js' ),
        'student/phd':           path.join( jsSrcRoot, 'student/phd.js' ),
        'student/scholarship':   path.join( jsSrcRoot, 'student/scholarship.js' ),
    },
    output: {
        path:     jsDistRoot,
        filename: '[name].min.js',
    },
    target:  'web',
    resolve: {
        alias: {
            settings: path.join( projectRoot, 'settings' ),
            static: staticRoot,
            test: path.join( projectRoot, 'test' ),
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
                        configFile:    path.join( projectRoot, 'dev/js/.eslintrc.js' ),
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
                            root: path.join( staticRoot, 'src/pug' ),
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
