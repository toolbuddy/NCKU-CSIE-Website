const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const deepFreeze = require( `${ projectRoot }/lib/deep-freeze` );

/**
 * @constant
 * @readonly {string[]} config.build.src  - Array of glob of source files for building HTML.
 * @readonly {string}   config.build.dest - Glob of destination directory for building HTML.
 * @readonly {string}   config.lint.rule  - Glob of lint rule file for linting HTML.
 * @readonly {string[]} config.lint.src   - Array of glob of source files for linting HTML.
 * @readonly {string}   config.lint.dest  - Glob of destination directory for linting HTML.
 */
const config = {
    build: {
        src: [
            `${ projectRoot }/static/src/pug/**/*.pug`,
            `!${ projectRoot }/static/src/pug/components/**/*.pug`,
            `!${ projectRoot }/static/src/pug/layouts/**/*.pug`,
        ],
        dest: `${ projectRoot }/static/dist/html`,
    },
    lint: {
        rule: `${ projectRoot }/settings/lint/puglint/puglint.js`,
        src: [
            `${ projectRoot }/static/src/pug/**/*.pug`,
        ],
        dest: `${ projectRoot }/static/src/pug`,
    },
};

module.exports = deepFreeze( config );
