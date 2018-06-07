const debug = require( 'gulp-debug' );
const del = require( 'del' );
const eslint = require( 'gulp-eslint' );
const gulp = require( 'gulp' );
const plumber = require( 'gulp-plumber' );
const path = require( 'path' );
const rename = require( 'gulp-rename' );

const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const config = require( `${ projectRoot }/dev/gulp/database/config` );

/**
 * Task `pre-build:database`:
 *     Use pure `gulp` to copy database server configuration files.
 */

gulp.task(
    'pre-build:database',
    () => gulp.src( config.preBuild.src )
    .pipe( rename(
        ( file ) => {
            file.extname = '';
        }
    ) )
    .pipe( gulp.dest( config.preBuild.dest ) )
);

/**
 * Task `lint:database`:
 *     Use `eslint` to lint database server ECMAScript files.
 */

gulp.task(
    'lint:database',
    () => gulp.src(
        config.lint.src,
        {
            base:  config.lint.dest,
            since: gulp.lastRun( 'lint:database' ),
        }
    )
    .pipe( plumber() )
    .pipe( eslint( {
        configFile: config.lint.rule,
        fix:        true,
    } ) )
    .pipe( eslint.format() )
    .pipe( debug() )
    .pipe( gulp.dest( config.lint.dest ) )
);


/**
 * Task `clear:database`:
 *     Clean `pre-build:database` generated files.
 */

gulp.task(
    'clear:database',
    done => del( config.preBuild.copy, { force: true, } ).then( () => done() )
);

/**
 * Task `watch:database`:
 *     Watch database server ECMAScript files.
 *     Trigger `lint:database` if changed.
 */

gulp.task(
    'watch:database',
    ( done ) => {
        gulp.watch( config.lint.src, gulp.series( 'lint:database' ) );
        done();
    }
);
