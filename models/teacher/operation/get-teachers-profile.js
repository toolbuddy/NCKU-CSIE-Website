const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const connect = require( `${ projectRoot }/settings/database/connect` );

module.exports = async ( language = 'zh-TW' ) => {
    const teacherDatabase = await connect( 'teacher' );
    const tables = {
        profile:        teacherDatabase.import( `${ projectRoot }/models/teacher/tables/profile` ),
        profileI18n:    teacherDatabase.import( `${ projectRoot }/models/teacher/tables/profile_i18n` ),
        title:          teacherDatabase.import( `${ projectRoot }/models/teacher/tables/title` ),
        titleI18n:      teacherDatabase.import( `${ projectRoot }/models/teacher/tables/title_i18n` ),
        department:     teacherDatabase.import( `${ projectRoot }/models/teacher/tables/department` ),
        departmentI18n: teacherDatabase.import( `${ projectRoot }/models/teacher/tables/department_i18n` ),
        office:         teacherDatabase.import( `${ projectRoot }/models/teacher/tables/office` ),
        officeI18n:     teacherDatabase.import( `${ projectRoot }/models/teacher/tables/office_i18n` ),
    };

    const data = {};

    // Promise.all uses iterator, so it will keep the order of the elements in array that passed in
    [
        data.profile,
        data.profileI18n,
        data.title,
        data.titleI18n,
        data.department,
        data.departmentI18n,
        data.office,
        data.officeI18n,
    ] = await Promise.all(
        [
            tables.profile.findAll( {
                attributes: [ 'profileId',
                    'personalWeb',
                    'email',
                    'position', ],
            } ),
            tables.profileI18n.findAll( {
                attributes: [ 'profileId',
                    'name', ],
                where:      { language, },
            } ),
            tables.title.findAll( {
                attributes: [ 'profileId',
                    'titleId', ],
            } ),
            tables.titleI18n.findAll( {
                attributes: [ 'titleId',
                    'title', ],
                where:      { language, },
            } ),
            tables.department.findAll( {
                attributes: [ 'profileId',
                    'departmentId', ],
            } ),
            tables.departmentI18n.findAll( {
                attributes: [ 'departmentId',
                    'department', ],
                where:      { language, },
            } ),
            tables.office.findAll( {
                attributes: [ 'profileId',
                    'officeId',
                    'tel', ],
            } ),
            tables.officeI18n.findAll( {
                attributes: [ 'officeId',
                    'address', ],
                where:      { language, },
            } ),
        ]
    );

    teacherDatabase.close();

    return data.profile.map( profile => ( {
        name: data.profileI18n
            .find( profileI18n => profileI18n.profileId === profile.profileId )
            .name,
        personalWeb: profile.personalWeb,
        email:       profile.email,
        title:       data.title
            .filter( title => title.profileId === profile.profileId )
            .map(
                title => data.titleI18n
                    .find( titleI18n => titleI18n.titleId === title.titleId )
                    .title
            ),
        department: data.department
            .filter( department => department.profileId === profile.profileId )
            .map(
                department => data.departmentI18n
                    .find( departmentI18n => departmentI18n.departmentId === department.departmentId )
                    .department
            ),
        office: data.office
            .filter( office => office.profileId === profile.profileId )
            .map( office => ( {
                address:
                    data.officeI18n
                        .find( officeI18n => officeI18n.officeId === office.officeId )
                        .address,
                tel: office.tel,
            } ) ),
        position: profile.position,
        image:    'http://via.placeholder.com/300x600',
    } ) );
};
