const path = require( 'path' );

const projectRoot = path.dirname( path.dirname( __dirname ) );
const language = require( path.resolve( projectRoot, 'settings/language/config' ) );
const pugRoot = path.resolve( projectRoot, 'static/src/pug' );
const languageRoot = path.resolve( projectRoot, 'static/src/language' );
const htmlRoot = path.resolve( projectRoot, 'static/dist/html' );
const { staticUrl, } = require( path.resolve( projectRoot, 'settings/server/config' ) );
const devMode = true;

/* Process.env.NODE_ENV !== 'production'*/

module.exports = language.support.map( language => ( {
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
        'announcement/all':           path.resolve( pugRoot, 'announcement/all.pug' ),
        'announcement/announcement':  path.resolve( pugRoot, 'announcement/announcement.pug' ),
        'announcement/recruitment':   path.resolve( pugRoot, 'announcement/recruitment.pug' ),

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
        'resource/rule':       path.resolve( pugRoot, 'resource/rule.pug' ),
        'resource/rent':      path.resolve( pugRoot, 'resource/rent.pug' ),
        'resource/resources': path.resolve( pugRoot, 'resource/resources.pug' ),

        // Route `student`
        'student/college':       path.resolve( pugRoot, 'student/college.pug' ),
        'student/course':        path.resolve( pugRoot, 'student/course.pug' ),
        'student/international': path.resolve( pugRoot, 'student/international.pug' ),
        'student/internship':    path.resolve( pugRoot, 'student/internship.pug' ),
        'student/master':        path.resolve( pugRoot, 'student/master.pug' ),
        'student/phd':           path.resolve( pugRoot, 'student/phd.pug' ),
        'student/scholarship':   path.resolve( pugRoot, 'student/scholarship.pug' ),
    },
    output: {
        path:     htmlRoot,
        filename: '[name].js',
    },
    target:  'web',
    module:  {
        rules: [
            {
                test: /\.pug$/,
                use:  [
                    {
                        loader:  'file-loader',
                        options: {
                            regExp: /pug\/([A-Za-z0-9_-]+)\/([A-Za-z0-9_-]+).pug/,
                            name:   `[1]/[2].${ language }.html`,
                        },
                    },
                    'extract-loader',
                    'html-loader',
                    {
                        loader:  'pug-html-loader',
                        options: {
                            basedir: pugRoot,
                            data:    {
                                staticUrl,
                                language,
                                languageRoot,
                                require,
                                path,
                            },
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
} ) );
