const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const connect = require( `${ projectRoot }/settings/database/connect` );

module.exports = async ( { lang = 'zh-TW',  } = { } ) => {
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
    const dataFromProfile = await tables.profile.findAll({
        attributes: ['profile_id', 'personal_web', 'email', 'position'],
    });
    const dataFromProfileI18n = await tables.profileI18n.findAll({
        attributes: ['profile_id', 'name'],
        where: { language: lang },
    });
    const dataFromTitle = await tables.title.findAll({
        attributes: ['profile_id', 'title_id'],
    });
    const dataFromTitleI18n = await tables.titleI18n.findAll({
        attributes: ['title_id', 'title'],
        where: { language: lang },
    });
    const dataFromDepartment = await tables.department.findAll({
        attributes: ['profile_id', 'department_id'],
    });
    const dataFromDepartmentI18n = await tables.departmentI18n.findAll({
        attributes: ['department_id', 'department'],
        where: { language: lang },
    });
    const dataFromOffice = await tables.office.findAll({
        attributes: ['profile_id', 'office_id', 'tel'],
    });
    const dataFromOfficeI18n = await tables.officeI18n.findAll({
        attributes: ['office_id', 'address'],
        where: { language: lang },
    });
/*
    console.log(JSON.stringify(dataFromProfile[0]));
    console.log(JSON.stringify(dataFromProfileI18n[0]));
    console.log(JSON.stringify(dataFromTitle[0]));
    console.log(JSON.stringify(dataFromTitleI18n[0]));
    console.log(JSON.stringify(dataFromDepartment[0]));
    console.log(JSON.stringify(dataFromDepartmentI18n[0]));
    console.log(JSON.stringify(dataFromOffice[0]));
    console.log(JSON.stringify(dataFromOfficeI18n[0]));
*/
    let teachersProfile = [];
    for(let dataP of dataFromProfile){
        let p = {
            name: '',
            title: '',
            department: '',
            office: [],
            personal_web: '',
            email: '',
            position: 0,
            image: 'http://via.placeholder.com/300x600',
        };
        // set basic profile information
        p.personal_web = dataP.personal_web;
        p.email = dataP.email;
        p.position = dataP.position;
        p.name = dataFromProfileI18n.find(x => x.profile_id === dataP.profile_id).name;

        // get all title_id for a teacher, and use it to find all titles for this teacher
        let titleIndex = [];
        for(let dataT of dataFromTitle){
            if(dataT.profile_id === dataP.profile_id){
                titleIndex.push(dataT.title_id);
            }
        }
        for(let index = 0; index < titleIndex.length; index++){
            if(index > 0) p.title += ' ';
            p.title += dataFromTitleI18n.find(x => x.title_id === titleIndex[index]).title;
        }

        // get all department_id for a teacher, and use it to find all departments for this teacher
        let departmentIndex = [];
        for(let dataD of dataFromDepartment){
            if(dataD.profile_id === dataP.profile_id){
                departmentIndex.push(dataD.department_id);
            }
        }
        for(let index = 0; index < departmentIndex.length; index++){
            if(index > 0) p.department += ' ';
            p.department += dataFromDepartmentI18n.find(x => x.department_id === departmentIndex[index]).department;
        }

        // get all office_id for a teacher, and use it to find all office and tel for this teacher
        let officeIndexWithTel = [];
        for(let dataO of dataFromOffice){
            if(dataO.profile_id === dataP.profile_id){
                officeIndexWithTel.push({officeId: dataO.office_id, tel: dataO.tel});
            }
        }
        for(let index = 0; index < officeIndexWithTel.length; index++){
            p.office.push({
                address: dataFromOfficeI18n.find(x => x.office_id === officeIndexWithTel[index].officeId).address,
                tel: officeIndexWithTel[index].tel,
            });
        }
        teachersProfile.push(p);
    }

    console.log(teachersProfile[0]);
    console.log(teachersProfile[10]);
    console.log(teachersProfile[20]);

    teacher.close();
    //return teachersProfile.findAll({ attributes: { exclude: ['id']} });
};
