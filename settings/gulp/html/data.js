const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const deepFreeze = require( `${ projectRoot }/lib/deep-freeze` );
const getTeachersProfile = require( `${ projectRoot }/models/teacher/operation/get-teachers-profile` );

const data = {
    about: {
        async honor() {
            return null;
        },
        async intro() {
            return null;
        },
        async location() {
            return null;
        },
        async members() {
            return null;
        },
        async teacher() {
            return null;
        },
        async teachers() {
            return { teachers: await getTeachersProfile() };
        },
    },
    announcement: {
        async activity() {

        },
        async administrator() {

        },
        async all() {

        },
        async recruitment() {

        },
        async speech() {

        },
    },
    home: {
        async index() {

        },
    },
    research: {
        async awards() {

        },
        async conferences() {

        },
        async groups() {

        },
        async labs() {

        },
        async publications() {

        },
    },
    resource: {
        async fix() {

        },
        async ieet() {

        },
        async law() {

        },
        async rent() {

        },
        async resources() {

        },
    },
    student: {
        async college() {

        },
        async course() {

        },
        async international() {

        },
        async master() {

        },
        async phd() {

        },
        async scholarship() {
            
        },
    },
};

module.exports = data;
