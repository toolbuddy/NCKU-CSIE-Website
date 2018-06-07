const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const deepFreeze = require( `${ projectRoot }/lib/deep-freeze` );

/**
 * @constant
 * @readonly {string[]} config.preBuild.src  - Array of glob of source files for copying web server configuration.
 * @readonly {string}   config.preBuild.dest - Glob of destination directory for copying web server configuration.
 * @readonly {string}   config.preBuild.copy - Glob of the very copy file of web server configuration.
 * @readonly {string[]} config.build.src     - Array of glob of source files for building web server ECMAScript.
 * @readonly {string}   config.build.dest    - Glob of destination directory for building web server ECMAScript.
 * @readonly {string}   config.lint.rule     - Glob of lint rule file for linting web server ECMAScript.
 * @readonly {string[]} config.lint.src      - Array of glob of source files for linting web server ECMAScript.
 * @readonly {string}   config.lint.dest     - Glob of destination directory for linting web server ECMAScript.
 */

const config = {
    preBuild: {
        src: [
            `${ projectRoot }/settings/server/config.js.default`,
        ],
        dest: `${ projectRoot }/settings/server`,
        copy: `${ projectRoot }/settings/server/config.js`,
    },
    build: {
        src: [
            `${ projectRoot }/server.js`,
            `${ projectRoot }/apis/**/*.js`,
            `${ projectRoot }/models/**/*.js`,
            `${ projectRoot }/routes/**/*.js`,
            `${ projectRoot }/settings/**/*.js`,
        ],
        dest: `${ projectRoot }/build`,
    },
    lint: {
        rule: `${ projectRoot }/dev/lint/eslint/backend.js`,
        src:  [
            `${ projectRoot }/server.js`,
            `${ projectRoot }/apis/**/*.js`,
            `${ projectRoot }/routes/**/*.js`,
            `${ projectRoot }/settings/**/*.js`,
            `${ projectRoot }/dev/**/*.js`,
        ],
        dest: `${ projectRoot }`,
    },
};

module.exports = deepFreeze( config );
