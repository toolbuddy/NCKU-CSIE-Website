const autoprefixer = require( 'gulp-autoprefixer' );
const csso = require( 'gulp-csso' );
const debug = require( 'gulp-debug' );
const del = require( 'del' );
const filter = require( 'gulp-filter' );
const gulp = require( 'gulp' );
const path = require( 'path' );
const plumber = require( 'gulp-plumber' );
const rename = require( 'gulp-rename' );
const sass = require( 'gulp-sass' );
const size = require( 'gulp-size' );
const sourcemaps = require( 'gulp-sourcemaps' );
const stylelint = require( 'gulp-stylelint' );

const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const config = require( `${ projectRoot }/dev/gulp/css/config` );

/**
 * Task `lint:css`:
 *     Use `stylelint` to lint CSS files.
 */

gulp.task(
    'lint:css',
    () => gulp.src( config.lint.src, { since: gulp.lastRun( 'lint:css' ), } )
        .pipe( plumber() )
        .pipe( stylelint( {
            configFile: config.lint.rule,
            fix:        true,
            reporters:  [
                { formatter: 'string', console: true, },
            ],
        } ) )
        .pipe( debug() )
        .pipe( gulp.dest( config.lint.dest ) )
);

/**
 * Task `build:css`:
 *     Use `sass` to convert SCSS files into CSS files.
 */

gulp.task(
    'build:css',
    () => gulp.src( config.build.src )
        .pipe( plumber() )
        .pipe( sourcemaps.init() )
        .pipe( sass( {
            outputStyle:  'compressed',
            includePaths: [ config.lint.dest, ],
        } ) )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( config.build.dest ) )
        .pipe( filter( '**/*.css' ) )
        .pipe( autoprefixer( {
            browsers: config.browserlist,
            grid:     true,
        } ) )
        .pipe( csso() )
        .pipe( rename( { suffix: '.min', } ) )
        .pipe( size( { showFiles: true, } ) )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( config.build.dest ) )
);

/**
 * Task `clear:css`:
 *     Clean `build:css` generated files.
 */

gulp.task(
    'clear:css',
    done => del( config.build.dest, { force: true, } ).then( () => done() )
);

/**
 * Task `watch:css`:
 *     Watch SCSS files.
 *     Trigger task `build:css` if files changed.
 */

gulp.task(
    'watch:css',
    ( done ) => {
        gulp.watch(
            config.lint.src,
            gulp.series( 'lint:css', 'build:css' )
        );
        done();
    }
);
