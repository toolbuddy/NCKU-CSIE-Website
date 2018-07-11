const path = require( 'path' );
const deepFreeze = require( 'deep-freeze' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );

/**
 * @constant
 * @readonly {string[]} config.build.src  - Array of glob of source files for building frontend ECMAScript.
 * @readonly {string}   config.build.dest - Glob of destination directory for building frontend ECMAScript.
 * @readonly {string}   config.lint.rule  - Glob of lint rule file for linting frontend ECMAScript.
 * @readonly {string[]} config.lint.src   - Array of glob of source files for linting frontend ECMAScript.
 * @readonly {string}   config.lint.dest  - Glob of destination directory for linting frontend ECMAScript.
 */

const config = {
    build: {
        src: [
            `${ projectRoot }/static/src/js/**/*.js`,
        ],
        dest: `${ projectRoot }/static/dist/js`,
    },
    lint: {
        rule: `${ projectRoot }/dev/lint/eslint/frontend.js`,
        src:  [
            `${ projectRoot }/static/src/js/**/*.js`,
        ],
        dest: `${ projectRoot }/static/src/js`,
    },
};

module.exports = deepFreeze( config );
