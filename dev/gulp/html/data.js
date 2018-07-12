const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const { staticUrl, } = require( `${ projectRoot }/settings/server/config` );
const getTeachersProfile = require( `${ projectRoot }/models/teacher/operation/get-teachers-profile` );

const data = {
    about: {
        async honor ( language ) {
            return { language, staticUrl, };
        },
        async intro ( language ) {
            return { language, staticUrl, };
        },
        async location ( language ) {
            return { language, staticUrl, };
        },
        async members ( language ) {
            return { language, staticUrl, };
        },
        async teacher ( language ) {
            return { language, staticUrl, };
        },
        async teachers ( language ) {
            return { language, staticUrl, teachers: await getTeachersProfile( language ), };
        },
    },
    announcement: {
        async activity ( language ) {
            return { language, staticUrl, };
        },
        async administrator ( language ) {
            return { language, staticUrl, };
        },
        async all ( language ) {
            return { language, staticUrl, };
        },
        async announcement ( language ) {
            return { language, staticUrl, };
        },
        async recruitment ( language ) {
            return { language, staticUrl, };
        },
        async speech ( language ) {
            return { language, staticUrl, };
        },
    },
    home: {
        async index ( language ) {
            return { language, staticUrl, };
        },
    },
    research: {
        async awards ( language ) {
            return { language, staticUrl, };
        },
        async conferences ( language ) {
            return { language, staticUrl, };
        },
        async groups ( language ) {
            return { language, staticUrl, };
        },
        async labs ( language ) {
            return { language, staticUrl, };
        },
        async publications ( language ) {
            return { language, staticUrl, };
        },
    },
    resource: {
        async fix ( language ) {
            return { language, staticUrl, };
        },
        async ieet ( language ) {
            return { language, staticUrl, };
        },
        async law ( language ) {
            return { language, staticUrl, };
        },
        async rent ( language ) {
            return { language, staticUrl, };
        },
        async resources ( language ) {
            return { language, staticUrl, };
        },
    },
    student: {
        async college ( language ) {
            return { language, staticUrl, };
        },
        async course ( language ) {
            return { language, staticUrl, };
        },
        async international ( language ) {
            return { language, staticUrl, };
        },
        async master ( language ) {
            return { language, staticUrl, };
        },
        async phd ( language ) {
            return { language, staticUrl, };
        },
        async scholarship ( language ) {
            return { language, staticUrl, };
        },
    },
};

module.exports = data;
