const cached = require( 'gulp-cached' );
const debug = require( 'gulp-debug' );
const del = require( 'del' );
const eslint = require( 'gulp-eslint' );
const gulp = require( 'gulp' );
const gulpIf = require( 'gulp-if' );
const plumber = require( 'gulp-plumber' );
const path = require( 'path' );
const rename = require( 'gulp-rename' );

const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const config = require( `${ projectRoot }/settings/gulp/database/config` );

/**
 * Task `pre-build:database`:
 *     Use pure `gulp` to copy database configuration files.
 */

gulp.task(
    'pre-build:database',
    () => gulp.src( config.src )
        .pipe( rename(
            ( file ) => {
                file.extname = '';
            }
        ) )
        .pipe( gulp.dest( config.dest ) )
);

/**
 * Task `lint:database`:
 *     Use `eslint` to lint database ECMAScript files.
 */

gulp.task(
    'lint:database',
    () => {
        /**
         * Helper Function:
         *     Judge `eslint` has fixed the file contents or not.
         */

        function isFixed ( file ) {
            return file.eslint != null && file.eslint.fixed;
        }

        return gulp.src( config.lint.src, { base: config.lint.dest, } )
            .pipe( plumber() )
            .pipe( cached( 'lint:database' ) )
            .pipe( eslint( {
                configFile: config.lint.rule,
                fix:        true,
            } ) )
            .pipe( eslint.format() )
            .pipe( eslint.result( ( result ) => {
                const threshold = 0;

                // If a file has errors/warnings, uncache it.
                if ( result.warningCount > threshold || result.errorCount > threshold )
                    delete cached.caches[ 'lint:database' ][ result.filePath ];
            } ) )
            .pipe( debug() )
            .pipe( gulpIf( isFixed, gulp.dest( config.lint.dest ) ) );
    }
);


/**
 * Task `clear:database`:
 *     Clean `pre-build:database` generated files.
 */

gulp.task(
    'clear:database',
    done => del( config.copy, { force: true, } ).then( () => done() )
);

/**
 * Task `watch:database`:
 *     Watch database ECMAScript files.
 *     Trigger `lint:database` if changed.
 */

gulp.task(
    'watch:database',
    ( done ) => {
        gulp.watch( config.lint.src, gulp.series( 'lint:database' ) );
        done();
    }
);
