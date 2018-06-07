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
const config = require( `${ projectRoot }/dev/gulp/js/config` );

/**
 * Task `lint:js`:
 *     Use `eslint` to lint Frontend JavaScript files.
 */

gulp.task(
    'lint:js',
    () => gulp.src(
        config.lint.src,
        {
            base:  config.lint.dest,
            since: gulp.lastRun( 'lint:js' ),
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
 * Task `build:js`:
 *     Build Frontend JavaScript files.
 */

gulp.task(
    'build:js',
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
 * Task `clear:js`:
 *     Clean `build:js` generated files.
 */

gulp.task(
    'clear:js',
    done => del( config.build.dest, { force: true, } ).then( () => done() )
);

/**
 * Task `watch:js`:
 *     Watch Frontend JavaScript files.
 *     Trigger `lint:js` and `build:js` if changed.
 */

gulp.task(
    'watch:js',
    ( done ) => {
        gulp.watch(
            config.lint.src,
            gulp.series( 'lint:js', 'build:js' )
        );
        done();
    }
);
