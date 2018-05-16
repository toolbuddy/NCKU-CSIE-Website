const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const connect = require( `${ projectRoot }/settings/database/connect` );

module.exports = async ( lang = 'zh-TW' ) => {
    const teacher = await connect( 'teacher' );
    const tables = {
        profile: teacher.import( `${ projectRoot }/models/teacher/tables/profile` ),
        profileI18n: teacher.import( `${ projectRoot }/models/teacher/tables/profile_i18n` ),
        title: teacher.import( `${ projectRoot }/models/teacher/tables/title` ),
        titleI18n: teacher.import( `${ projectRoot }/models/teacher/tables/title_i18n` ),
        department: teacher.import( `${ projectRoot }/models/teacher/tables/department` ),
        departmentI18n: teacher.import( `${ projectRoot }/models/teacher/tables/department_i18n` ),
        office: teacher.import( `${ projectRoot }/models/teacher/tables/office` ),
        officeI18n: teacher.import( `${ projectRoot }/models/teacher/tables/office_i18n` ),
    };

    // Promise.all uses iterator, so it will keep the order of the elements in array that passed in
    const result = await Promise.all(
        [
            tables.profile.findAll( {
                attributes: [ 'profile_id', 'personal_web', 'email', 'position' ],
            } ),
            tables.profileI18n.findAll( {
                attributes: [ 'profile_id', 'name' ],
                where: { language: lang },
            } ),
            tables.title.findAll( {
                attributes: [ 'profile_id', 'title_id' ],
            } ),
            tables.titleI18n.findAll( {
                attributes: [ 'title_id', 'title' ],
                where: { language: lang },
            } ),
            tables.department.findAll( {
                attributes: [ 'profile_id', 'department_id' ],
            } ),
            tables.departmentI18n.findAll( {
                attributes: ['department_id', 'department'],
                where: { language: lang },
            } ),
            tables.office.findAll( {
                attributes: ['profile_id', 'office_id', 'tel'],
            } ),
            tables.officeI18n.findAll({
                attributes: ['office_id', 'address'],
                where: { language: lang },
            }),
        ]
    );

    const data = {
        profile: result[0],
        profileI18n: result[1],
        title: result[2],
        titleI18n: result[3],
        department: result[4],
        departmentI18n: result[5],
        office: result[6],
        officeI18n: result[7],
    };

    let teachersProfile = [];
    data.profile.forEach( dataInProfile => {
        let profile = {
            name: '',
            personal_web: '',
            email: '',
            title: [],
            department: [],
            office: [],
            position: 0,
            image: 'http://via.placeholder.com/300x600',
        };
        // set basic profile information
        profile.personal_web = dataInProfile.personal_web;
        profile.email = dataInProfile.email;
        profile.position = dataInProfile.position;
        profile.name = data.profileI18n.find(x => x.profile_id === dataInProfile.profile_id).name;

        // get all title_id for a teacher, and use it to find all titles for this teacher
        let titleId = [];
        data.title.forEach( dataInTitle => {
            if(dataInTitle.profile_id === dataInProfile.profile_id){
                titleId.push(dataInTitle.title_id);
            }
        });
        titleId.forEach( id => {
            profile.title.push(data.titleI18n.find(x => x.title_id === id).title);
        });

        // get all department_id for a teacher, and use it to find all departments for this teacher
        let departmentId = [];
        data.department.forEach( dataInDepartment => {
            if(dataInDepartment.profile_id === dataInProfile.profile_id){
                departmentId.push(dataInDepartment.department_id);
            }
        });
        departmentId.forEach( (id, index) => {
            profile.department.push(data.departmentI18n.find(x => x.department_id === id).department);
        });

        // get all office_id for a teacher, and use it to find all office and tel for this teacher
        let officeIdWithTel = [];
        data.office.forEach( dataInOffice => {
            if(dataInOffice.profile_id === dataInProfile.profile_id){
                officeIdWithTel.push({
                    officeId: dataInOffice.office_id,
                    tel: dataInOffice.tel,
                });
            }
        });
        officeIdWithTel.forEach( item => {
            profile.office.push({
                address: data.officeI18n.find(x => x.office_id === item.officeId).address,
                tel: item.tel,
            });
        });
        teachersProfile.push(profile);
    });

    teacher.close();

    return teachersProfile;

};
