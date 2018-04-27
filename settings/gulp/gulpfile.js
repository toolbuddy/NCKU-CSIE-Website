const gulp = require( 'gulp' );
const nodemon = require( 'gulp-nodemon' );
const eslint = require( 'gulp-eslint' );
const uglify = require( 'gulp-uglify-es' ).default;
const sass = require( 'gulp-sass' );
const autoprefixer = require( 'gulp-autoprefixer' );
const csso = require( 'gulp-csso' );
const file = require( 'gulp-file' );
const plumber = require( 'gulp-plumber' );
const rename = require( 'gulp-rename' );
const size = require( 'gulp-size' );
const sourcemaps = require( 'gulp-sourcemaps' );
const gulpIf = require( 'gulp-if' );
const cached = require( 'gulp-cached' );
const debug = require( 'gulp-debug' );
const filter = require( 'gulp-filter' );
const del = require( 'del' );
//const browserSync = require( 'browser-sync' );
const config = require( './config' );

/**
 * Task `lint:js-frontend`:
 *     Use `eslint` to lint frontend JavaScript files.
 */
gulp.task( 'lint:js-frontend', () => {

    /**
     * Helper Function:
     *     Judge `eslint` has fixed the file contents or not.
     */
    function isFixed ( file ) {
        return file.eslint != null && file.eslint.fixed;
    }

    return gulp.src( config.js.frontend.lint.src )
        .pipe( plumber() )
        .pipe( cached( 'lint:js-frontend' ) )
        .pipe(
            eslint( {
                configFile: config.js.frontend.lint.rule,
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
        .pipe( gulpIf( isFixed, gulp.dest( config.js.frontend.lint.dest ) ) );
} );

/**
 * Task `lint:js-backend`:
 *     Use `eslint` to lint backend JavaScript files.
 */
gulp.task( 'lint:js-backend', () => {

    /**
     * Helper Function:
     *     Judge `eslint` has fixed the file contents or not.
     */
    function isFixed ( file ) {
        return file.eslint != null && file.eslint.fixed;
    }

    return gulp.src( config.js.backend.lint.src )
        .pipe( plumber() )
        .pipe( cached( 'lint:js-backend' ) )
        .pipe( eslint( {
            configFile: config.js.backend.lint.rule,
            fix: true,
        } ) )
        .pipe( eslint.format() )
        .pipe( eslint.result( result => {
            const threshold = 0;

            // If a file has errors/warnings, uncache it.
            if( result.warningCount > threshold || result.errorCount > threshold )
                delete cached.caches[ 'lint:js-backend' ][ result.filePath ];
        } ) )
        .pipe( debug() )
        .pipe( gulpIf( isFixed, gulp.dest( config.js.backend.lint.dest ) ) );
} );

/**
 * Task `build:js-frontend`:
 *     Build frontend JavaScript files.
 */
gulp.task( 'build:js-frontend', () => {
    return gulp.src( config.js.frontend.build.src )
        .pipe( plumber() )
        .pipe( gulp.dest( config.js.frontend.build.dest ) )
        .pipe( sourcemaps.init() )
        .pipe( uglify() )
        .pipe( rename( { suffix: '.min', } ) )
        .pipe( size( { showFiles: true, } ) )
        .pipe( sourcemaps.write( config.sourcemaps.dest ) )
        .pipe( gulp.dest( config.js.frontend.build.dest ) );
} );

/**
 * task `clear:js-frontend`:
 *     Clean `lint:js-frontend` generated caches.
 *     Clean `build:js-frontend` generated files.
 */
gulp.task( 'clear:js-frontend', ( done ) => {
    delete cached.caches[ 'lint:js-frontend' ];
    del( config.js.frontend.build.dest, { force: true, } );
    done();
} );

/**
 * Task `clear:js-backend`:
 *     Clean `lint:js-backend` generated caches.
 */
gulp.task( 'clear:js-backend', ( done ) => {
    delete cached.caches[ 'lint:js-backend' ];
    done();
} );

/**
 * Task `watch:js-frontend`:
 *     Watch frontend JavaScript files.
 *     Trigger `lint:js-frontend` and `build:js-frontend` if changed.
 */
gulp.task( 'watch:js-frontend', () => {
    gulp.watch(
        config.js.frontend.lint.src,
        gulp.parallel( 'lint:js-frontend', 'build:js-frontend' )
    );
} );

/**
 * task `watch:js-backend`:
 *     Watch backend JavaScript files.
 *     Trigger `lint:js-frontend` if changed.
 */
gulp.task( 'watch:js-backend', () => {
    gulp.watch( config.js.backend.lint.src, gulp.parallel( 'lint:js-backend' ) );
} );

/**
 * Task `pre-build:css`:
 *     Use `gulp-file` to write scss files static settings.
 */
gulp.task( 'pre-build:css', () => {
    return file( config.sass.static.fileName, config.sass.static.data, { src: true, } )
        .pipe( plumber() )
        .pipe( gulp.dest( config.sass.static.dest ) );
} );

/**
 * Task `build:css`:
 *     Use `sass` to convert scss files into css files.
 */
gulp.task( 'build:css', () => {
    return gulp.src( config.sass.build.src )
        .pipe( plumber() )
        .pipe( sourcemaps.init() )
        .pipe( sass( { outputStyle: 'compressed', } ) )
        .pipe( sourcemaps.write( config.sourcemaps.dest ) )
        .pipe( gulp.dest( config.sass.build.dest ) )
        .pipe( filter( '**/*.css' ) )
        .pipe( autoprefixer( {
            browsers: config.browserlist,
            grid: true,
        } ) )
        .pipe( csso() )
        .pipe( rename( { suffix: '.min', } ) )
        .pipe( size( { showFiles: true, } ) )
        .pipe( sourcemaps.write( config.sourcemaps.dest ) )
        .pipe( gulp.dest( config.sass.build.dest ) );
} );

/**
 * Task `clear:css`:
 *     Clean `build:css` generated files.
 */
gulp.task( 'clear:css', ( done ) => {
    del( config.sass.build.dest, { force: true, } );
    done();
} );

/**
 * Task `watch:css`:
 *     Watch scss files.
 *     Trigger task `build:css` if files changed.
 */
gulp.task( 'watch:css', () => {
    gulp.watch(
        config.sass.lint.src,
        gulp.parallel( 'build:css' )
    );
} );

/**
 * Task `lint`:
 *     Trigger all `lint` related tasks.
 *     Including `lint:js-frontend`, `lint:js-backend`.
 */
gulp.task( 'lint', gulp.parallel(
    'lint:js-frontend',
    'lint:js-backend'
) );

/**
 * Task `build`:
 *     Trigger all `build` related tasks.
 *     Including `build:js-frontend`, `build:css`
 */
gulp.task( 'build', gulp.parallel(
    'build:js-frontend',
    'build:css'
) );

/**
 * Task `clear`:
 *     Trigger all `clear` related tasks.
 *     Including `clear:js-frontend`, `clear:js-backend`, `clear:css`
 */
gulp.task( 'clear', gulp.parallel(
    'clear:js-frontend',
    'clear:js-backend',
    'clear:css'
) );

/**
 * Task `watch`:
 *     Trigger all `watch` related tasks.
 *     Including `watch:js-frontend`, `watch:js-backend`, `watch:css`
 */
gulp.task( 'watch', gulp.parallel(
    'watch:js-frontend',
    'watch:js-backend',
    'watch:css'
) );

/**
 * Task `develop`:
 *     Automatically restart server when files changed and need to restart.
 *     Automatically run `lint` and `build` when server restart.
 */
gulp.task( 'develop', ( done ) => {
    const stream = nodemon( {
        script: config.nodemon.main,
        watch: config.nodemon.watch.src,
        ignore: config.nodemon.watch.ignore,
        ext: 'js json scss pug',
        tasks: [ 'lint', 'build', ],
    } );
    stream.on( 'restart', [ 'lint', 'build', ] );
    stream.on( 'start', () => {

    } );
    done();
} );
