const path = require( 'path' );

const projectRoot = path.dirname( path.dirname( __dirname ) );
const language = require( path.join( projectRoot, 'settings/language/config' ) );
const pugRoot = path.join( projectRoot, 'static/src/pug' );
const htmlRoot = path.join( projectRoot, 'static/dist/html' );
const { staticUrl, } = require( path.join( projectRoot, 'settings/server/config' ) );
const devMode = true;

/* Process.env.NODE_ENV !== 'production' */

module.exports = language.support.map( language => ( {
    devtool: devMode ? 'inline-sourcemap' : null,
    mode:    devMode ? 'development' : 'production',
    entry:   {
        // Route `about`
        'about/award':          path.join( pugRoot, 'about/award.pug' ),
        'about/contact':        path.join( pugRoot, 'about/contact.pug' ),
        'about/faculty-detail': path.join( pugRoot, 'about/faculty-detail.pug' ),
        'about/faculty':        path.join( pugRoot, 'about/faculty.pug' ),
        'about/index':          path.join( pugRoot, 'about/index.pug' ),
        'about/intro':          path.join( pugRoot, 'about/intro.pug' ),
        'about/staff':          path.join( pugRoot, 'about/staff.pug' ),

        // Route `announcement`
        'announcement/activity':     path.join( pugRoot, 'announcement/activity.pug' ),
        'announcement/all':          path.join( pugRoot, 'announcement/all.pug' ),
        'announcement/index':        path.join( pugRoot, 'announcement/index.pug' ),
        'announcement/announcement': path.join( pugRoot, 'announcement/announcement.pug' ),
        'announcement/recruitment':  path.join( pugRoot, 'announcement/recruitment.pug' ),

        // Route `home`
        'home/index': path.join( pugRoot, 'home/index.pug' ),

        // Route `research`
        'research/groups':       path.join( pugRoot, 'research/groups.pug' ),
        'research/index':        path.join( pugRoot, 'research/index.pug' ),
        'research/labs':         path.join( pugRoot, 'research/labs.pug' ),
        'research/publications': path.join( pugRoot, 'research/publications.pug' ),

        // Route `resource`
        'resource/alumni':  path.join( pugRoot, 'resource/alumni.pug' ),
        'resource/fix':     path.join( pugRoot, 'resource/fix.pug' ),
        'resource/ieet':    path.join( pugRoot, 'resource/ieet.pug' ),
        'resource/index':   path.join( pugRoot, 'resource/index.pug' ),
        'resource/rent':    path.join( pugRoot, 'resource/rent.pug' ),
        'resource/rule':    path.join( pugRoot, 'resource/rule.pug' ),
        'resource/sitemap': path.join( pugRoot, 'resource/sitemap.pug' ),

        // Route `student`
        'student/college':       path.join( pugRoot, 'student/college.pug' ),
        'student/course':        path.join( pugRoot, 'student/course.pug' ),
        'student/index':         path.join( pugRoot, 'student/index.pug' ),
        'student/international': path.join( pugRoot, 'student/international.pug' ),
        'student/internship':    path.join( pugRoot, 'student/internship.pug' ),
        'student/master':        path.join( pugRoot, 'student/master.pug' ),
        'student/phd':           path.join( pugRoot, 'student/phd.pug' ),
        'student/scholarship':   path.join( pugRoot, 'student/scholarship.pug' ),

        // Route `user`
        'user/index':              path.join( pugRoot, 'user/index.pug' ),
        'user/announcement/index': path.join( pugRoot, 'user/announcement/index.pug' ),
        'user/announcement/add':   path.join( pugRoot, 'user/announcement/add.pug' ),
        'user/announcement/edit':  path.join( pugRoot, 'user/announcement/edit.pug' ),
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
                            name(file){
                                return `${ file.split( pugRoot )[ 1 ].split( '.pug' )[ 0 ] }.${ language }.html`;
                            },
                        },
                    },
                    'extract-loader',
                    {
                        loader: 'html-loader',
                        options: {
                            root: projectRoot,
                        },
                    },
                    {
                        loader:  'pug-html-loader',
                        options: {
                            basedir: pugRoot,
                            data:    {
                                staticUrl,
                                language,
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
