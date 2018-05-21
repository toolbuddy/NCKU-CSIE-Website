const browserSync = require( 'browser-sync' );
const gulp = require( 'gulp' );
const Hub = require( 'gulp-hub' );
const nodemon = require( 'gulp-nodemon' );
const path = require( 'path' );

const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const config = require( `${ projectRoot }/settings/gulp/develop/config` );

gulp.registry( new Hub(
    [
        '../js-frontend/gulpfile.js',
        '../js-backend/gulpfile.js',
        '../css/gulpfile.js',
        '../html/gulpfile.js',
        '../database/gulpfile.js',
    ]
) );

/**
 * Task `lint`:
 *     Trigger all `lint` related tasks.
 *     Including `lint:js-frontend`, `lint:js-backend`, `lint:css`.
 */

gulp.task(
    'lint',
    gulp.parallel(
        'lint:js-frontend',
        'lint:js-backend',
        'lint:css',
        'lint:html',
        'lint:database',
    )
);

/**
 * Task `build`:
 *     Trigger all `build` related tasks.
 *     Including `build:js-frontend`, `build:css`, `build:html`
 */

gulp.task(
    'build',
    gulp.parallel(
        'build:js-frontend',
        'build:css',
        'build:html'
    )
);

/**
 * Task `clear`:
 *     Trigger all `clear` related tasks.
 *     Including `clear:js-frontend`, `clear:js-backend`, `clear:css`, `clear:html`
 */

gulp.task(
    'clear',
    gulp.parallel(
        'clear:js-frontend',
        'clear:js-backend',
        'clear:css',
        'clear:html'
    )
);

/**
 * Task `watch`:
 *     Trigger all `watch` related tasks.
 *     Including `watch:js-frontend`, `watch:js-backend`, `watch:css`, `watch:html`, `watch:database`.
 */

gulp.task(
    'watch',
    gulp.parallel(
        'watch:js-frontend',
        'watch:js-backend',
        'watch:css',
        'watch:html',
        'watch:database'
    )
);

/**
 * Task `develop`:
 *     Automatically restart server when backend files changed and need to restart.
 *     Automatically run `lint` and `build` on frontend files when server restart.
 */

gulp.task(
    'develop',
    gulp.series(
        gulp.parallel( 'watch:js-frontend', 'watch:css', 'watch:html' ),
        gulp.series(

        // Nodemon start
            ( done ) => {
                nodemon( {
                    script: config.nodemon.main,
                    watch:  config.nodemon.watch.src,
                    ext:    'js json',
                    tasks:  [ 'lint:js-backend', ],
                } )
                    .on( 'restart', () => {
                        browserSync.get( 'browser' ).reload();
                    } );
                done();
            },

            // Browser-sync start
            ( done ) => {
                const browser = browserSync.create( 'browser' );
                browser.init( {
                    port:           config.browserSync.port,
                    ui:             config.browserSync.ui,
                    proxy:          config.browserSync.proxy,
                    files:          config.browserSync.files,
                    logLevel:       'debug',
                    logConnections: true,
                    notify:         false,
                    startPath:      '/',
                } );
                done();
            }
        )
    )
);
