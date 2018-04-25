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
            ignorePath: config.js.frontend.lint.ignoreFile,
        } ) 
    )
} );

/**
 * task `lint:js-backend`:
 *     use `eslint` to lint backend JavaScript file
 */
gulp.task( 'lint:js-backend', () => {
    return gulp.src( config.js.backend.src )
    .pipe( plumber() )
    .pipe(
        eslint( {
            configFile: config.js.backend.lint.rule,
            fix: true,
            ignorePath: config.js.backend.lint.ignoreFile,
        } ) 
    )
    .pipe( eslint.failOnError() );
} );

gulp.task( 'js', () => {
    return gulp.src( [] )
        .pipe( eslint( {
            configFile: `${ global.rootdir }/settings/lint/eslint/`,
            fix: true,
        } ) )
} );

gulp.task( 'sass:pre-build', () => {
    return file( config.sass.static.fileName, config.sass.static.data, { src: true } )
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
        .pipe( sass( { outputStyle: 'compressed' } ) )
        .pipe( gulp.dest( config.sass.dest ) )
        .pipe( autoprefixer( {
            browsers: config.browserlist,
            grid: true,
        } ) )
        .pipe( csso() )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( sourcemaps.write( config.sourcemaps.dest ) )
        .pipe( gulp.dest( config.sass.dest ) );
} );

// task `sass:watch`: watch scss files and trigger task `sass` if files had been changed
gulp.task( 'sass:watch', () => {
    gulp.watch(
        config.sass.src,
        gulp.parallel( 'sass' )
    );
} );

gulp.task( 'develop', () => {
    nodemon( {
        script: `${ global.rootdir }/server.js`,
        ext: 'js sass pug',
    } );
} );
