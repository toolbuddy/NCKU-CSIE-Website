const path = require( 'path' );

const projectRoot = path.dirname( path.dirname( __dirname ) );
const { port, url, } = require( path.resolve( projectRoot, 'settings/server/config' ) );

module.exports = {
    ui: {
        port: port + 2,
    },
    files: [
        path.resolve( projectRoot, 'static/dist/css/**/*.css' ),
        path.resolve( projectRoot, 'static/dist/html/**/*.html' ),
        path.resolve( projectRoot, 'static/dist/js/**/*.js' ),
    ],
    watchEvents: [
        'add',
        'change',
        'unlink',
        'addDir',
        'unlinkDir',
    ],
    watch:     true,
    proxy:     url,
    port:      port + 1,
    ghostMode: {
        clicks:   true,
        scroll:   true,
        location: true,
        forms:    {
            submit:  true,
            inputs:  true,
            toggles: true,
        },
    },
    logLevel:        'debug',
    logPrefix:       'Browsersync',
    logConnections:  true,
    logFileChanges:  true,
    open:            'local',
    browser:         'default',
    reloadOnRestart: true,
    notify:          false,
    reloadDelay:     1000,
    startPath:       '/',
};
