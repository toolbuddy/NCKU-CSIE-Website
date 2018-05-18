const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const connect = require( `${ projectRoot }/settings/database/connect` );

module.exports = async ( language = 'zh-TW' ) => {
    const teacherDatabase = await connect( 'teacher' );
    const tables = {
        profile: teacherDatabase.import( `${ projectRoot }/models/teacher/tables/profile` ),
        profileI18n: teacherDatabase.import( `${ projectRoot }/models/teacher/tables/profile_i18n` ),
        title: teacherDatabase.import( `${ projectRoot }/models/teacher/tables/title` ),
        titleI18n: teacherDatabase.import( `${ projectRoot }/models/teacher/tables/title_i18n` ),
        department: teacherDatabase.import( `${ projectRoot }/models/teacher/tables/department` ),
        departmentI18n: teacherDatabase.import( `${ projectRoot }/models/teacher/tables/department_i18n` ),
        office: teacherDatabase.import( `${ projectRoot }/models/teacher/tables/office` ),
        officeI18n: teacherDatabase.import( `${ projectRoot }/models/teacher/tables/office_i18n` ),
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
                attributes: [ 'profile_id', 'personal_web', 'email', 'position' ],
            } ),
            tables.profileI18n.findAll( {
                attributes: [ 'profile_id', 'name' ],
                where: { language },
            } ),
            tables.title.findAll( {
                attributes: [ 'profile_id', 'title_id' ],
            } ),
            tables.titleI18n.findAll( {
                attributes: [ 'title_id', 'title' ],
                where: { language },
            } ),
            tables.department.findAll( {
                attributes: [ 'profile_id', 'department_id' ],
            } ),
            tables.departmentI18n.findAll( {
                attributes: ['department_id', 'department'],
                where: { language },
            } ),
            tables.office.findAll( {
                attributes: ['profile_id', 'office_id', 'tel'],
            } ),
            tables.officeI18n.findAll( {
                attributes: ['office_id', 'address'],
                where: { language },
            } ),
        ]
    );

    teacherDatabase.close();

    return data.profile.map( profile => ( {
        name: data.profileI18n
            .find( profileI18n => profileI18n.profile_id === profile.profile_id )
            .name,
        personalWeb: profile.personal_web,
        email: profile.email,
        title: data.title
            .filter( title => title.profile_id === profile.profile_id )
            .map(
                title => data.titleI18n
                .find( titleI18n => titleI18n.title_id === title.title_id )
                .title
            ),
        department: data.department
            .filter( department => department.profile_id === profile.profile_id )
            .map(
                department => data.departmentI18n
                .find( departmentI18n => departmentI18n.department_id === department.department_id )
                .department
            ),
        office: data.office
            .filter( office => office.profile_id === profile.profile_id )
            .map( office => ( {
                address:
                    data.officeI18n
                    .find( officeI18n => officeI18n.office_id === office.office_id )
                    .address,
                tel: office.tel,
            }) ),
        position: profile.position,
        image: 'http://via.placeholder.com/300x600',
    } ) );
};