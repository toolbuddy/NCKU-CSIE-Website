const del = require( 'del' );
const gulp = require( 'gulp' );
const debug = require( 'gulp-debug' );
const plumber = require( 'gulp-plumber' );
const puglint = require( 'gulp-pug-linter' );
const path = require( 'path' );
const pug = require( 'gulp-pug' );
const rename = require( 'gulp-rename' );

const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const config = require( `${ projectRoot }/settings/gulp/html/config` );
const data = require( `${ projectRoot }/settings/gulp/html/data` );
const languages = [
    'zh-TW',
    'en-US',
];

/**
 * Task `lint:html`:
 *     Use `puglint` to lint HTML files.
 */

gulp.task(
    'lint:html',
    () => gulp.src(
        config.lint.src,
        {
            base:  config.lint.dest,
            since: gulp.lastRun( 'lint:html' ),
        }
    )
        .pipe( plumber() )
        .pipe( puglint() )
        .pipe( puglint.reporter() )
        .pipe( debug() )
);

function buildHTML ( src, dest, data ) {
    return async ( done ) => {
        languages.forEach(
            async language => gulp.src( src )
                .pipe( plumber() )
                .pipe(
                    pug( {
                        basedir: config.lint.dest,
                        data:    await data( language ),
                    } )
                )
                .pipe( rename( { suffix: `.${ language }`, } ) )
                .pipe( gulp.dest( dest ) )
        );
        done();
    };
}

gulp.task(
    'build:html:about',
    gulp.parallel(
        buildHTML(
            config.build.src.about.honor,
            config.build.dest.about,
            data.about.honor
        ),
        buildHTML(
            config.build.src.about.intro,
            config.build.dest.about,
            data.about.intro
        ),
        buildHTML(
            config.build.src.about.location,
            config.build.dest.about,
            data.about.location
        ),
        buildHTML(
            config.build.src.about.members,
            config.build.dest.about,
            data.about.members
        ),
        buildHTML(
            config.build.src.about.teacher,
            config.build.dest.about,
            data.about.teacher
        ),
        buildHTML(
            config.build.src.about.teachers,
            config.build.dest.about,
            data.about.teachers
        )
    )
);

gulp.task(
    'build:html:announcement',
    gulp.parallel(
        buildHTML(
            config.build.src.announcement.activity,
            config.build.dest.announcement,
            data.announcement.activity
        ),
        buildHTML(
            config.build.src.announcement.administrator,
            config.build.dest.announcement,
            data.announcement.administrator
        ),
        buildHTML(
            config.build.src.announcement.all,
            config.build.dest.announcement,
            data.announcement.all
        ),
        buildHTML(
            config.build.src.announcement.recruitment,
            config.build.dest.announcement,
            data.announcement.recruitment
        ),
        buildHTML(
            config.build.src.announcement.speech,
            config.build.dest.announcement,
            data.announcement.speech
        )
    )
);

gulp.task(
    'build:html:home',
    gulp.parallel(
        buildHTML(
            config.build.src.home.index,
            config.build.dest.home,
            data.home.index
        ),
    )
);

gulp.task(
    'build:html:research',
    gulp.parallel(
        buildHTML(
            config.build.src.research.awards,
            config.build.dest.research,
            data.research.awards
        ),
        buildHTML(
            config.build.src.research.conferences,
            config.build.dest.research,
            data.research.conferences
        ),
        buildHTML(
            config.build.src.research.groups,
            config.build.dest.research,
            data.research.groups
        ),
        buildHTML(
            config.build.src.research.labs,
            config.build.dest.research,
            data.research.labs
        ),
        buildHTML(
            config.build.src.research.publications,
            config.build.dest.research,
            data.research.publications
        )
    )
);

gulp.task(
    'build:html:resource',
    gulp.parallel(
        buildHTML(
            config.build.src.resource.fix,
            config.build.dest.resource,
            data.resource.fix
        ),
        buildHTML(
            config.build.src.resource.ieet,
            config.build.dest.resource,
            data.resource.ieet
        ),
        buildHTML(
            config.build.src.resource.law,
            config.build.dest.resource,
            data.resource.law
        ),
        buildHTML(
            config.build.src.resource.rent,
            config.build.dest.resource,
            data.resource.rent
        ),
        buildHTML(
            config.build.src.resource.resources,
            config.build.dest.resource,
            data.resource.resources
        )
    )
);

gulp.task(
    'build:html:student',
    gulp.parallel(
        buildHTML(
            config.build.src.student.college,
            config.build.dest.student,
            data.student.college
        ),
        buildHTML(
            config.build.src.student.course,
            config.build.dest.student,
            data.student.course
        ),
        buildHTML(
            config.build.src.student.international,
            config.build.dest.student,
            data.student.international
        ),
        buildHTML(
            config.build.src.student.master,
            config.build.dest.student,
            data.student.master
        ),
        buildHTML(
            config.build.src.student.phd,
            config.build.dest.student,
            data.student.phd
        ),
        buildHTML(
            config.build.src.student.scholarship,
            config.build.dest.student,
            data.student.scholarship
        )
    )
);

/**
 * Task `build:html`:
 *     Use `pug` to convert Pug files into HTML files.
 */

gulp.task(
    'build:html',
    gulp.parallel(
        'build:html:about',
        'build:html:announcement',
        'build:html:home',
        'build:html:research',
        'build:html:resource',
        'build:html:student'
    )
);

/**
 * Task `clear:html`:
 *     Clean `build:html` generated files.
 */

gulp.task(
    'clear:html',
    done => del( config.build.dest.all, { force: true, } ).then( () => done() )
);

/**
 * Task `watch:html`:
 *     Watch Pug files.
 *     Trigger task `build:html` if files changed.
 */

gulp.task(
    'watch:html',
    ( done ) => {
        gulp.watch(
            config.lint.src,
            gulp.series( 'lint:html', 'build:html' )
        );
        done();
    }
);
