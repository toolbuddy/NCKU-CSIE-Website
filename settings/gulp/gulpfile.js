const gulp = require( 'gulp' );
const nodemon = require( 'gulp-nodemon' );
const eslint = require( 'gulp-eslint' );
const sass = require( 'gulp-sass' );
const autoprefixer = require( 'gulp-autoprefixer' );
const csso = require( 'gulp-csso' );
const file = require( 'gulp-file' );
const plumber = require( 'gulp-plumber' );
const rename = require( 'gulp-rename' );
const sourcemaps = require( 'gulp-sourcemaps' );
const cached = require( 'gulp-cached' );
const remember = require( 'gulp-remember' );
const config = require( './config' );

/**
 * task `lint:js-frontend`:
 *     use `eslint` to lint frontend JavaScript file
 */
gulp.task( 'lint:js-frontend', () => {
    return gulp.src( config.js.frontend.src )
        .pipe( plumber() )
        .pipe(
            eslint( {
                configFile: config.js.frontend.lint.rule,
                fix: true,
            } )
        )
        .pipe( eslint.format() );
} );

/**
 * task `lint:js-backend`:
 *     use `eslint` to lint backend JavaScript file
 */
gulp.task( 'lint:js-backend', () => {
    return gulp.src( config.js.backend.src )
        .pipe( plumber() )
        .pipe( cached( 'lint:js-backend' ) )
        .pipe( eslint( {
            configFile: config.js.backend.lint.rule,
            fix: true,
        } ) )
        .pipe( eslint.format() )
        .pipe( eslint.result( result => {
            const boundary = 0;

            // if a file jhas errors/warnings uncache it
            if( result.warningCount > boundary || result.errorCount > boundary )
                delete cached.caches[ 'lint:js-backend' ][ result.filePath ];

        } ) )
        .pipe(gulp.dest());
} );

/**
 * task `watch:js-frontend`:
 *     watch frontend JavaScript file, trigger `lint:js-frontend` if changed.
 */
gulp.task( 'watch:js-frontend', () => {
    gulp.watch( config.js.frontend.src, gulp.parallel( 'lint:js-frontend' ) );
} );

/**
 * task `watch:js-backend`:
 *     watch backend JavaScript file, trigger `lint:js-frontend` if changed.
 */
gulp.task( 'watch:js-backend', () => {
    gulp.watch( config.js.backend.src, gulp.parallel( 'lint:js-backend' ) );
} );

/**
 * task `pre-build:css`: use `gulp-file` to write scss files static settings
 */
gulp.task( 'pre-build:css', () => {
    return file( config.sass.static.fileName, config.sass.static.data, { src: true, } )
        .pipe( plumber() )
        .pipe( gulp.dest( config.sass.static.dest ) );
} );

/**
 * task `build:css`: use `sass` to convert scss files into css files
 */
gulp.task( 'build:css', () => {
    return gulp.src( config.sass.src )
        .pipe( plumber() )
        .pipe( sourcemaps.init() )
        .pipe( sass( { outputStyle: 'compressed', } ) )
        .pipe( gulp.dest( config.sass.dest ) )
        .pipe( autoprefixer( {
            browsers: config.browserlist,
            grid: true,
        } ) )
        .pipe( csso() )
        .pipe( rename( { suffix: '.min', } ) )
        .pipe( sourcemaps.write( config.sourcemaps.dest ) )
        .pipe( gulp.dest( config.sass.dest ) );
} );

/**
 * task `watch:css`: watch scss files, trigger task `build:css` if files changed
 */
gulp.task( 'watch:css', () => {
    gulp.watch(
        config.sass.src,
        gulp.parallel( 'sass' )
    );
} );

gulp.task( 'clear', () => {
    cached.clearAll();
} );

gulp.task( 'develop', () => {
    nodemon( {
        script: `${ global.rootdir }/server.js`,
        ext: 'js sass pug',
    } );
} );
