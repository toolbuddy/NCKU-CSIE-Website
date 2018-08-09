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
        'about/award':          path.join( jsSrcRoot, 'about/award.js' ),
        'about/contact':        path.join( jsSrcRoot, 'about/contact.js' ),
        'about/faculty-detail': path.join( jsSrcRoot, 'about/faculty-detail.js' ),
        'about/faculty':        path.join( jsSrcRoot, 'about/faculty.js' ),
        'about/index':          path.join( jsSrcRoot, 'about/index.js' ),
        'about/intro':          path.join( jsSrcRoot, 'about/intro.js' ),
        'about/staff':          path.join( jsSrcRoot, 'about/staff.js' ),

        // Route `announcement`
        'announcement/activity':     path.join( jsSrcRoot, 'announcement/activity.js' ),
        'announcement/all':          path.join( jsSrcRoot, 'announcement/all.js' ),
        'announcement/index':        path.join( jsSrcRoot, 'announcement/index.js' ),
        'announcement/announcement': path.join( jsSrcRoot, 'announcement/announcement.js' ),
        'announcement/recruitment':  path.join( jsSrcRoot, 'announcement/recruitment.js' ),

        // Route `home`
        'home/index': path.join( jsSrcRoot, 'home/index.js' ),

        // Route `research`
        'research/groups':       path.join( jsSrcRoot, 'research/groups.js' ),
        'research/index':        path.join( jsSrcRoot, 'research/index.js' ),
        'research/labs':         path.join( jsSrcRoot, 'research/labs.js' ),
        'research/publications': path.join( jsSrcRoot, 'research/publications.js' ),

        // Route `resource`
        'resource/alumni':  path.join( jsSrcRoot, 'resource/alumni.js' ),
        'resource/fix':     path.join( jsSrcRoot, 'resource/fix.js' ),
        'resource/ieet':    path.join( jsSrcRoot, 'resource/ieet.js' ),
        'resource/index':   path.join( jsSrcRoot, 'resource/index.js' ),
        'resource/rent':    path.join( jsSrcRoot, 'resource/rent.js' ),
        'resource/rule':    path.join( jsSrcRoot, 'resource/rule.js' ),
        'resource/sitemap': path.join( jsSrcRoot, 'resource/sitemap.js' ),

        // Route `student`
        'student/college':       path.join( jsSrcRoot, 'student/college.js' ),
        'student/course':        path.join( jsSrcRoot, 'student/course.js' ),
        'student/index':         path.join( jsSrcRoot, 'student/index.js' ),
        'student/international': path.join( jsSrcRoot, 'student/international.js' ),
        'student/internship':    path.join( jsSrcRoot, 'student/internship.js' ),
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
            static:   staticRoot,
            test:     path.join( projectRoot, 'test' ),
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
