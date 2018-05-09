const cached = require( 'gulp-cached' );
const del = require( 'del' );
const gulp = require( 'gulp' );
const debug = require( 'gulp-debug' );
const plumber = require( 'gulp-plumber' );
const puglint = require( 'gulp-pug-linter' );
const path = require( 'path' );
const pug = require( 'gulp-pug' );

const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const config = require( `${ projectRoot }/settings/gulp/html/config` );

/**
 * Task `lint:html`:
 *     Use `puglint` to lint HTML files.
 */
gulp.task( 'lint:html', () => {

    /**
     * Helper Function:
     *     Judge `puglint` has error or not.
     */
    function isError ( errors ) {
        const errorIndex = 0;
        if( errors.length )
            delete cached.caches[ 'lint:html' ][ errors[ errorIndex ].filename ];
    }
    return gulp.src( config.lint.src )
        .pipe( plumber() )
        .pipe( cached( 'lint:html' ) )
        .pipe( puglint() )
        .pipe( puglint.reporter() )
        .pipe( puglint.reporter( isError ) )
        .pipe( debug() );
} );

/**
 * Task `build:html`:
 *     Use `pug` to convert Pug files into HTML files.
 */
gulp.task( 'build:html', () => {
    return gulp.src( config.build.src )
        .pipe( plumber() )
        .pipe( pug( { basedir: config.lint.dest, } ) )
        .pipe( gulp.dest( config.build.dest ) );
} );

/**
 * Task `clear:html`:
 *     Clean `build:html` generated files.
 */
gulp.task( 'clear:html', ( done ) => {
    del( config.build.dest, { force: true, } )
        .then( () => done() );
} );

/**
 * Task `watch:html`:
 *     Watch Pug files.
 *     Trigger task `build:html` if files changed.
 */
gulp.task( 'watch:html', ( done ) => {
    gulp.watch(
        config.lint.src,
        gulp.series( 'lint:html', 'build:html' )
    );
    done();
} );
