const path = require( 'path' );
const fs = require( 'fs' ).promises;
const sass = require( 'node-sass' );

const projectRoot = path.dirname( path.dirname( __dirname ) );
const config = require( `${projectRoot}/dev/css/config.js` );

/**
 * Task `build:css`:
 *     Use `sass` to convert SCSS files into CSS files.
 */

// TODO: add source-map support
const buildSassPromise = new Promise((res, rej) => {
    sass.render( {
        file: config.build.src,
        outputStyle:  'compressed',
        includePaths: [ config.lint.dest, ],
    }, ( err, result ) => {
        if (err) rej(err);
        res(result);
    } )
} );
/*
.pipe( autoprefixer( {
    browsers: config.browserlist,
    grid:     true,
} ) )
.pipe( csso() )
.pipe( rename( { suffix: '.min', } ) )
.pipe( size( { showFiles: true, } ) )
.pipe( sourcemaps.write( '.' ) )
.pipe( gulp.dest( config.build.dest ) );*/
