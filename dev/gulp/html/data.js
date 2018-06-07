const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const getTeachersProfile = require( `${ projectRoot }/models/teacher/operation/get-teachers-profile` );

const data = {
    about: {
        async honor ( language ) {
            return { language, };
        },
        async intro ( language ) {
            return { language, };
        },
        async location ( language ) {
            return { language, };
        },
        async members ( language ) {
            return { language, };
        },
        async teacher ( language ) {
            return { language, };
        },
        async teachers ( language ) {
            return { language, teachers: await getTeachersProfile( language ), };
        },
    },
    announcement: {
        async activity ( language ) {
            return { language, };
        },
        async administrator ( language ) {
            return { language, };
        },
        async all ( language ) {
            return { language, };
        },
        async recruitment ( language ) {
            return { language, };
        },
        async speech ( language ) {
            return { language, };
        },
    },
    home: {
        async index ( language ) {
            return { language, };
        },
    },
    research: {
        async awards ( language ) {
            return { language, };
        },
        async conferences ( language ) {
            return { language, };
        },
        async groups ( language ) {
            return { language, };
        },
        async labs ( language ) {
            return { language, };
        },
        async publications ( language ) {
            return { language, };
        },
    },
    resource: {
        async fix ( language ) {
            return { language, };
        },
        async ieet ( language ) {
            return { language, };
        },
        async law ( language ) {
            return { language, };
        },
        async rent ( language ) {
            return { language, };
        },
        async resources ( language ) {
            return { language, };
        },
    },
    student: {
        async college ( language ) {
            return { language, };
        },
        async course ( language ) {
            return { language, };
        },
        async international ( language ) {
            return { language, };
        },
        async master ( language ) {
            return { language, };
        },
        async phd ( language ) {
            return { language, };
        },
        async scholarship ( language ) {
            return { language, };
        },
    },
};

module.exports = data;
