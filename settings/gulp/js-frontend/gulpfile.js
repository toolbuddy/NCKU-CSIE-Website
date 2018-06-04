const debug = require( 'gulp-debug' );
const del = require( 'del' );
const eslint = require( 'gulp-eslint' );
const gulp = require( 'gulp' );
const path = require( 'path' );
const plumber = require( 'gulp-plumber' );
const rename = require( 'gulp-rename' );
const size = require( 'gulp-size' );
const sourcemaps = require( 'gulp-sourcemaps' );
const uglify = require( 'gulp-uglify-es' ).default;

const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const config = require( `${ projectRoot }/settings/gulp/js-frontend/config` );

/**
 * Task `lint:js-frontend`:
 *     Use `eslint` to lint Frontend JavaScript files.
 */

gulp.task(
    'lint:js-frontend',
    () => gulp.src(
        config.lint.src,
        {
            base:  config.lint.dest,
            since: gulp.lastRun( 'lint:js-frontend' ),
        }
    )
        .pipe( plumber() )
        .pipe(
            eslint( {
                configFile: config.lint.rule,
                fix:        true,
            } )
        )
        .pipe( eslint.format() )
        .pipe( debug() )
        .pipe( gulp.dest( config.lint.dest ) )
);

/**
 * Task `build:js-frontend`:
 *     Build Frontend JavaScript files.
 */

gulp.task(
    'build:js-frontend',
    () => gulp.src( config.build.src )
        .pipe( plumber() )
        .pipe( gulp.dest( config.build.dest ) )
        .pipe( sourcemaps.init() )
        .pipe( uglify() )
        .pipe( rename( { suffix: '.min', } ) )
        .pipe( size( { showFiles: true, } ) )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( config.build.dest ) )
);

/**
 * Task `clear:js-frontend`:
 *     Clean `build:js-frontend` generated files.
 */

gulp.task(
    'clear:js-frontend',
    done => del( config.build.dest, { force: true, } ).then( () => done() )
);

/**
 * Task `watch:js-frontend`:
 *     Watch Frontend JavaScript files.
 *     Trigger `lint:js-frontend` and `build:js-frontend` if changed.
 */

gulp.task(
    'watch:js-frontend',
    ( done ) => {
        gulp.watch(
            config.lint.src,
            gulp.series( 'lint:js-frontend', 'build:js-frontend' )
        );
        done();
    }
);
