const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const deepFreeze = require( `${ projectRoot }/lib/deep-freeze` );

/**
 * @constant
 * @readonly {string[]} config.build.src   - Array of glob of source files for building Backend JavaScript.
 * @readonly {string}   config.build.dest  - Glob of destination directory for building Backend JavaScript.
 * @readonly {string}   config.lint.rule   - Glob of lint rule file for linting Backend JavaScript.
 * @readonly {string[]} config.lint.src    - Array of glob of source files for linting Backend JavaScript.
 * @readonly {string}   config.lint.dest   - Glob of destination directory for linting Backend JavaScript.
 */
const config = {
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
        rule: `${ projectRoot }/settings/lint/eslint/backend.js`,
        src: [
            `${ projectRoot }/server.js`,
            `${ projectRoot }/apis/**/*.js`,
            `${ projectRoot }/routes/**/*.js`,
            `${ projectRoot }/settings/**/*.js`,
        ],
        dest: `${ projectRoot }`,
    },
};

module.exports = deepFreeze( config );
