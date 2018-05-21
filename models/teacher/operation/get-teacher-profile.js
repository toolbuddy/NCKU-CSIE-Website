const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const connect = require( `${ projectRoot }/settings/database/connect` );

module.exports = async () => {
    const teacher = await connect( 'teacher' );
    const teachersProfile = teacher.import( `${ projectRoot }/models/teacher/tables/teachers_profile` );
    return teachersProfile.findAll( { attributes: { exclude: [ 'id', ], }, } );
};
