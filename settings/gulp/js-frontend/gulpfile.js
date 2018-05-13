const cached = require( 'gulp-cached' );
const debug = require( 'gulp-debug' );
const del = require( 'del' );
const eslint = require( 'gulp-eslint' );
const gulp = require( 'gulp' );
const gulpIf = require( 'gulp-if' );
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
gulp.task( 'lint:js-frontend', () => {

    /**
     * Helper Function:
     *     Judge `eslint` has fixed the file contents or not.
     */
    function isFixed ( file ) {
        return file.eslint != null && file.eslint.fixed;
    }

    return gulp.src( config.lint.src )
        .pipe( plumber() )
        .pipe( cached( 'lint:js-frontend' ) )
        .pipe(
            eslint( {
                configFile: config.lint.rule,
                fix: true,
            } )
        )
        .pipe( eslint.format() )
        .pipe( eslint.result( result => {
            const threshold = 0;

            // If a file has errors/warnings, uncache it.
            if( result.warningCount > threshold || result.errorCount > threshold )
                delete cached.caches[ 'lint:js-frontend' ][ result.filePath ];
        } ) )
        .pipe( debug() )
        .pipe( gulpIf( isFixed, gulp.dest( config.lint.dest ) ) );
} );

/**
 * Task `build:js-frontend`:
 *     Build Frontend JavaScript files.
 */
gulp.task( 'build:js-frontend', () => {
    return gulp.src( config.build.src )
        .pipe( plumber() )
        .pipe( gulp.dest( config.build.dest ) )
        .pipe( sourcemaps.init() )
        .pipe( uglify() )
        .pipe( rename( { suffix: '.min', } ) )
        .pipe( size( { showFiles: true, } ) )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( config.build.dest ) );
} );

/**
 * task `clear:js-frontend`:
 *     Clean `lint:js-frontend` generated caches.
 *     Clean `build:js-frontend` generated files.
 */
gulp.task( 'clear:js-frontend', ( done ) => {
    del( config.build.dest, { force: true, } )
        .then( () => {
            delete cached.caches[ 'lint:js-frontend' ];
        } )
        .then( () => {
            done();
        } );
} );

/**
 * Task `watch:js-frontend`:
 *     Watch Frontend JavaScript files.
 *     Trigger `lint:js-frontend` and `build:js-frontend` if changed.
 */
gulp.task( 'watch:js-frontend', ( done ) => {
    gulp.watch(
        config.lint.src,
        gulp.series( 'lint:js-frontend', 'build:js-frontend' )
    );
    done();
} );
