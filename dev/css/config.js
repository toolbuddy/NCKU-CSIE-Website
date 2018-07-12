const path = require( 'path' );
const deepFreeze = require( 'deep-freeze' );
const projectRoot = path.dirname( path.dirname( __dirname ) );

/**
 * @constant
 * @readonly {string[]} config.build.src       - Array of glob of source files for building CSS.
 * @readonly {string}   config.build.dest      - Glob of destination directory for building CSS.
 * @readonly {string[]} config.lint.src        - Array of glob of source files for linting CSS.
 * @readonly {string}   config.lint.dest       - Glob of destination directory for linting CSS.
 * @readonly {string}   config.static.dest     - Glob of CSS static settings file.
 */

const config = {
    build: {
        src: `${ projectRoot }/static/src/sass/`,
        dest: `${ projectRoot }/static/dist/css`,
    },
    lint: {
        rule:  `${ projectRoot }/dev/lint/stylelint/stylelint.js`,
        cache: `${ projectRoot }`,
        src:   [
            `${ projectRoot }/static/src/sass/**/*.scss`,
        ],
        dest: `${ projectRoot }/static/src/sass`,
    },
};

module.exports = deepFreeze( config );
