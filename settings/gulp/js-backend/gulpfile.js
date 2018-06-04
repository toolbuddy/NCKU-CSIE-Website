const debug = require( 'gulp-debug' );
const del = require( 'del' );
const eslint = require( 'gulp-eslint' );
const gulp = require( 'gulp' );
const path = require( 'path' );
const plumber = require( 'gulp-plumber' );
const rename = require( 'gulp-rename' );

const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const config = require( `${ projectRoot }/settings/gulp/js-backend/config` );

/**
 * Task `pre-build:js-backend`:
 *     Use pure `gulp` to copy server configuration files.
 */

gulp.task(
    'pre-build:js-backend',
    () => gulp.src( config.preBuild.src )
        .pipe( rename(
            ( file ) => {
                file.extname = '';
            }
        ) )
        .pipe( gulp.dest( config.preBuild.dest ) )
);

/**
 * Task `lint:js-backend`:
 *     Use `eslint` to lint server ECMAScript files.
 */

gulp.task(
    'lint:js-backend',
    () => gulp.src(
        config.lint.src,
        {
            base:  config.lint.dest,
            since: gulp.lastRun( 'lint:js-backend' ),
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
 * Task `clear:js-backend`:
 *     Clean `pre-build:js-backend` generated files.
 */

gulp.task(
    'clear:js-backend',
    done => del( config.preBuild.copy, { force: true, } ).then( () => done() )
);

/**
 * Task `watch:js-backend`:
 *     Watch Backend JavaScript files.
 *     Trigger `lint:js-backend` if changed.
 */

gulp.task(
    'watch:js-backend',
    ( done ) => {
        gulp.watch( config.lint.src, gulp.series( 'lint:js-backend' ) );
        done();
    }
);
