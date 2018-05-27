const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const deepFreeze = require( `${ projectRoot }/lib/deep-freeze` );

const [
    about,
    announcement,
    home,
    research,
    resource,
    student,
] = [
    { src: `${ projectRoot }/static/src/pug/about`, dest: `${ projectRoot }/static/dist/html/about`, },
    { src: `${ projectRoot }/static/src/pug/announcement`, dest: `${ projectRoot }/static/dist/html/announcement`, },
    { src: `${ projectRoot }/static/src/pug/home`, dest: `${ projectRoot }/static/dist/html/home`, },
    { src: `${ projectRoot }/static/src/pug/research`, dest: `${ projectRoot }/static/dist/html/research`, },
    { src: `${ projectRoot }/static/src/pug/resource`, dest: `${ projectRoot }/static/dist/html/resource`, },
    { src: `${ projectRoot }/static/src/pug/student`, dest: `${ projectRoot }/static/dist/html/student`, },
];

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
        src: {
            about: {
                honor:    `${ about.src }/honor.pug`,
                intro:    `${ about.src }/intro.pug`,
                location: `${ about.src }/location.pug`,
                members:  `${ about.src }/members.pug`,
                teacher:  `${ about.src }/teacher.pug`,
                teachers: `${ about.src }/teachers.pug`,
            },
            announcement: {
                activity:      `${ announcement.src }/activity.pug`,
                administrator: `${ announcement.src }/administrator.pug`,
                all:           `${ announcement.src }/all.pug`,
                recruitment:   `${ announcement.src }/recruitment.pug`,
                speech:        `${ announcement.src }/speech.pug`,
            },
            home: {
                index: `${ home.src }/index.pug`,
            },
            research: {
                awards:       `${ research.src }/awards.pug`,
                conferences:  `${ research.src }/conferences.pug`,
                groups:       `${ research.src }/groups.pug`,
                labs:         `${ research.src }/labs.pug`,
                publications: `${ research.src }/publications.pug`,
            },
            resource: {
                fix:       `${ resource.src }/fix.pug`,
                ieet:      `${ resource.src }/ieet.pug`,
                law:       `${ resource.src }/law.pug`,
                rent:      `${ resource.src }/rent.pug`,
                resources: `${ resource.src }/resources.pug`,
            },
            student: {
                college:       `${ student.src }/college.pug`,
                course:        `${ student.src }/course.pug`,
                international: `${ student.src }/international.pug`,
                master:        `${ student.src }/master.pug`,
                phd:           `${ student.src }/phd.pug`,
                scholarship:   `${ student.src }/scholarship.pug`,
            },
        },
        dest: {
            about:        about.dest,
            announcement: announcement.dest,
            home:         home.dest,
            research:     research.dest,
            resource:     resource.dest,
            student:      student.dest,
            all:          `${ projectRoot }/static/dist/html`,
        },
    },
    lint: {
        rule: `${ projectRoot }/settings/lint/puglint/puglint.js`,
        src:  [
            `${ projectRoot }/static/src/pug/**/*.pug`,
        ],
        dest: `${ projectRoot }/static/src/pug`,
    },
};

module.exports = deepFreeze( config );
