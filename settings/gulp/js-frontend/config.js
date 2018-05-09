const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const deepFreeze = require( `${ projectRoot }/lib/deep-freeze` );

/**
 * @constant
 * @readonly {string[]} config.build.src  - Array of glob of source files for building Frontend JavaScript.
 * @readonly {string}   config.build.dest - Glob of destination directory for building Frontend JavaScript.
 * @readonly {string}   config.lint.rule  - Glob of lint rule file for linting Frontend JavaScript.
 * @readonly {string[]} config.lint.src   - Array of glob of source files for linting Frontend JavaScript.
 * @readonly {string}   config.lint.dest  - Glob of destination directory for linting Frontend JavaScript.
 */
const config = {
    build: {
        src: [
            `${ projectRoot }/static/src/js/**/*.js`,
        ],
        dest: `${ projectRoot }/static/dist/js`,
    },
    lint: {
        rule: `${ projectRoot }/settings/lint/eslint/frontend.js`,
        src: [
            `${ projectRoot }/static/src/js/**/*.js`,
        ],
        dest: `${ projectRoot }/static/src/js`,
    },
};

module.exports = deepFreeze( config );
