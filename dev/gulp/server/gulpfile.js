const debug = require( 'gulp-debug' );
const del = require( 'del' );
const eslint = require( 'gulp-eslint' );
const gulp = require( 'gulp' );
const path = require( 'path' );
const plumber = require( 'gulp-plumber' );
const rename = require( 'gulp-rename' );

const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const config = require( `${ projectRoot }/dev/gulp/server/config` );

/**
 * Task `pre-build:server`:
 *     Use pure `gulp` to copy server configuration files.
 */

gulp.task(
    'pre-build:server',
    () => gulp.src( config.preBuild.src )
        .pipe( rename(
            ( file ) => {
                file.extname = '';
            }
        ) )
        .pipe( gulp.dest( config.preBuild.dest ) )
);

/**
 * Task `lint:server`:
 *     Use `eslint` to lint server ECMAScript files.
 */

gulp.task(
    'lint:server',
    () => gulp.src(
        config.lint.src,
        {
            base:  config.lint.dest,
            since: gulp.lastRun( 'lint:server' ),
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
 * Task `clear:server`:
 *     Clean `pre-build:server` generated files.
 */

gulp.task(
    'clear:server',
    done => del( config.preBuild.copy, { force: true, } ).then( () => done() )
);

/**
 * Task `watch:server`:
 *     Watch Backend JavaScript files.
 *     Trigger `lint:server` if changed.
 */

gulp.task(
    'watch:server',
    ( done ) => {
        gulp.watch( config.lint.src, gulp.series( 'lint:server' ) );
        done();
    }
);
