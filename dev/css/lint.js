const stylelint = require( 'stylelint' );
const path = require( 'path' );

const projectRoot = path.dirname( path.dirname( __dirname ) );
const config = require( `${ projectRoot }/dev/css/config` );

/**
 * Task `lint:css`:
 *     Use `stylelint` to lint CSS files.
 */

function lint () {
    stylelint.lint( {
        // Store the info about processed files in order to
        // only operate on the changed ones the next time you run stylelint.
        // By default, the cache is stored in `.stylelintcache` in `process.cwd()`.
        cache:          true,

        // A path to a file or directory to be used for cache.
        cacheLocation:  config.lint.cache,

        // The path to JS file that contains stylelint configuration object.
        configFile:     config.lint.rule,

        // A file glob, or array of file globs to lint.
        files:          config.lint.src,

        // `stylelint` will fix as many errors as possible.
        // The fixes are made to the actual source files.
        fix:            true,

        // Specify the formatter that you would like to use to format your results.
        formatter:      'string',

        // All disable comments will be ignored.
        ignoreDisables: true,

        // Specify a non-standard syntax that should be used to parse source stylesheets.
        syntax:         'scss',
    } )
    .then( ( data ) => {
        // A string displaying the formatted violations.
        // (using the default formatter or whichever you passed)
        /* eslint no-console: 'off' */
        console.log( data.output );
    } )
    .catch( ( err ) => {
        // Unexpected error.
        console.error( err.stack );
    } );
}

lint();
