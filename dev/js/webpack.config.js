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
        'about/award':          path.resolve( jsSrcRoot, 'about/award.js' ),
        'about/contact':        path.resolve( jsSrcRoot, 'about/contact.js' ),
        'about/faculty-detail': path.resolve( jsSrcRoot, 'about/faculty-detail.js' ),
        'about/faculty':        path.resolve( jsSrcRoot, 'about/faculty.js' ),
        'about/index':          path.resolve( jsSrcRoot, 'about/index.js' ),
        'about/intro':          path.resolve( jsSrcRoot, 'about/intro.js' ),
        'about/staff':          path.resolve( jsSrcRoot, 'about/staff.js' ),

        // Route `announcement`
        'announcement/activity':     path.resolve( jsSrcRoot, 'announcement/activity.js' ),
        'announcement/all':          path.resolve( jsSrcRoot, 'announcement/all.js' ),
        'announcement/index':        path.resolve( jsSrcRoot, 'announcement/index.js' ),
        'announcement/announcement': path.resolve( jsSrcRoot, 'announcement/announcement.js' ),
        'announcement/recruitment':  path.resolve( jsSrcRoot, 'announcement/recruitment.js' ),

        // Route `home`
        'home/index': path.resolve( jsSrcRoot, 'home/index.js' ),

        // Route `research`
        'research/groups':       path.resolve( jsSrcRoot, 'research/groups.js' ),
        'research/index':        path.resolve( jsSrcRoot, 'research/index.js' ),
        'research/labs':         path.resolve( jsSrcRoot, 'research/labs.js' ),
        'research/publications': path.resolve( jsSrcRoot, 'research/publications.js' ),

        // Route `resource`
        'resource/alumni':  path.resolve( jsSrcRoot, 'resource/alumni.js' ),
        'resource/fix':     path.resolve( jsSrcRoot, 'resource/fix.js' ),
        'resource/ieet':    path.resolve( jsSrcRoot, 'resource/ieet.js' ),
        'resource/index':   path.resolve( jsSrcRoot, 'resource/index.js' ),
        'resource/rent':    path.resolve( jsSrcRoot, 'resource/rent.js' ),
        'resource/rule':    path.resolve( jsSrcRoot, 'resource/rule.js' ),
        'resource/sitemap': path.resolve( jsSrcRoot, 'resource/sitemap.js' ),

        // Route `student`
        'student/college':       path.resolve( jsSrcRoot, 'student/college.js' ),
        'student/course':        path.resolve( jsSrcRoot, 'student/course.js' ),
        'student/index':         path.resolve( jsSrcRoot, 'student/index.js' ),
        'student/international': path.resolve( jsSrcRoot, 'student/international.js' ),
        'student/internship':    path.resolve( jsSrcRoot, 'student/internship.js' ),
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
            static:   staticRoot,
            test:     path.resolve( projectRoot, 'test' ),
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
