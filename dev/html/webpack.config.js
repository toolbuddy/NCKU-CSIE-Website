const path = require( 'path' );

const projectRoot = path.dirname( path.dirname( __dirname ) );
const language = require( path.join( projectRoot, 'settings/language/config' ) );
const pugRoot = path.join( projectRoot, 'static/src/pug' );
const languageRoot = path.join( projectRoot, 'static/src/language' );
const htmlRoot = path.join( projectRoot, 'static/dist/html' );
const { staticUrl } = require( path.join( projectRoot, 'settings/server/config' ) );
const devMode = true;

/* Process.env.NODE_ENV !== 'production'*/

module.exports = language.support.map( language => ( {
    devtool: devMode ? 'inline-sourcemap' : null,
    mode:    devMode ? 'development' : 'production',
    entry:   {
        // Route `about`
        'about/honor':    path.join( pugRoot, 'about/honor.pug' ),
        'about/intro':    path.join( pugRoot, 'about/intro.pug' ),
        'about/location': path.join( pugRoot, 'about/location.pug' ),
        'about/members':  path.join( pugRoot, 'about/members.pug' ),
        'about/teacher':  path.join( pugRoot, 'about/teacher.pug' ),
        'about/teachers': path.join( pugRoot, 'about/teachers.pug' ),

        // Route `announcement`
        'announcement/activity':      path.join( pugRoot, 'announcement/activity.pug' ),
        'announcement/all':           path.join( pugRoot, 'announcement/all.pug' ),
        'announcement/announcement':  path.join( pugRoot, 'announcement/announcement.pug' ),
        'announcement/recruitment':   path.join( pugRoot, 'announcement/recruitment.pug' ),

        // Route `home`
        'home/index': path.join( pugRoot, 'home/index.pug' ),

        // Route `research`
        'research/awards':       path.join( pugRoot, 'research/awards.pug' ),
        'research/conferences':  path.join( pugRoot, 'research/conferences.pug' ),
        'research/groups':       path.join( pugRoot, 'research/groups.pug' ),
        'research/labs':         path.join( pugRoot, 'research/labs.pug' ),
        'research/publications': path.join( pugRoot, 'research/publications.pug' ),

        // Route `resource`
        'resource/fix':       path.join( pugRoot, 'resource/fix.pug' ),
        'resource/ieet':      path.join( pugRoot, 'resource/ieet.pug' ),
        'resource/rule':       path.join( pugRoot, 'resource/rule.pug' ),
        'resource/rent':      path.join( pugRoot, 'resource/rent.pug' ),
        'resource/resources': path.join( pugRoot, 'resource/resources.pug' ),

        // Route `student`
        'student/college':       path.join( pugRoot, 'student/college.pug' ),
        'student/course':        path.join( pugRoot, 'student/course.pug' ),
        'student/international': path.join( pugRoot, 'student/international.pug' ),
        'student/internship': path.join( pugRoot, 'student/internship.pug' ),
        'student/master':        path.join( pugRoot, 'student/master.pug' ),
        'student/phd':           path.join( pugRoot, 'student/phd.pug' ),
        'student/scholarship':   path.join( pugRoot, 'student/scholarship.pug' ),
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
