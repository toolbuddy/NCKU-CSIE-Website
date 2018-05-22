const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const getTeachersProfile = require( `${ projectRoot }/models/teacher/operation/get-teachers-profile` );

module.exports = async ( lang = 'zh-TW' ) => {
    const teachersProfile = await getTeachersProfile( lang );
    const profileByDepartment = {
        deptCSIE: [],
        instCSIE: [],
        instIMI:  [],
        instIMIS: [],
    };

    // For data in zh-TW
    if ( lang === 'zh-TW' ) {
        teachersProfile.forEach( ( profile ) => {
            if ( profile.department.includes( '資訊系' ) )
                profileByDepartment.deptCSIE.push( profile );

            if ( profile.department.includes( '資訊所' ) )
                profileByDepartment.instCSIE.push( profile );

            if ( profile.department.includes( '醫資所' ) )
                profileByDepartment.instIMI.push( profile );

            if ( profile.department.includes( '製造所' ) )
                profileByDepartment.instIMIS.push( profile );
        } );
    }

    // For data in en-US
    if ( lang === 'en-US' ) {
        teachersProfile.forEach( ( profile ) => {
            if ( profile.department.includes( 'dept. CSIE' ) )
                profileByDepartment.deptCSIE.push( profile );

            if ( profile.department.includes( 'inst. CSIE' ) )
                profileByDepartment.instCSIE.push( profile );

            if ( profile.department.includes( 'inst. IMI' ) )
                profileByDepartment.instIMI.push( profile );

            if ( profile.department.includes( 'inst. IMIS' ) )
                profileByDepartment.instIMIS.push( profile );
        } );
    }

    return profileByDepartment;
};
