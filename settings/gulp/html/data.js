const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const getTeachersProfile = require( `${ projectRoot }/models/teacher/operation/get-teachers-profile` );

const data = {
    about: {
        async honor () {
            return null;
        },
        async intro () {
            return null;
        },
        async location () {
            return null;
        },
        async members () {
            return null;
        },
        async teacher () {
            return null;
        },
        async teachers () {
            return { teachers: await getTeachersProfile(), };
        },
    },
    announcement: {
        async activity () {
            return null;
        },
        async administrator () {
            return null;
        },
        async all () {
            return null;
        },
        async recruitment () {
            return null;
        },
        async speech () {
            return null;
        },
    },
    home: {
        async index () {
            return null;
        },
    },
    research: {
        async awards () {
            return null;
        },
        async conferences () {
            return null;
        },
        async groups () {
            return null;
        },
        async labs () {
            return null;
        },
        async publications () {
            return null;
        },
    },
    resource: {
        async fix () {
            return null;
        },
        async ieet () {
            return null;
        },
        async law () {
            return null;
        },
        async rent () {
            return null;
        },
        async resources () {
            return null;
        },
    },
    student: {
        async college () {
            return null;
        },
        async course () {
            return null;
        },
        async international () {
            return null;
        },
        async master () {
            return null;
        },
        async phd () {
            return null;
        },
        async scholarship () {
            return null;
        },
    },
};

module.exports = data;
