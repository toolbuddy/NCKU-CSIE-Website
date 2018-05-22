const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const connect = require( `${ projectRoot }/settings/database/connect` );

module.exports = async ( { language = 'zh-TW', profileId = 1, } = {} ) => {
    const teacherDatabase = await connect( 'teacher' );
    const table = {
        conferenceI18n:         teacherDatabase.import( `${ projectRoot }/models/teacher/tables/conference_i18n` ),
        conference:             teacherDatabase.import( `${ projectRoot }/models/teacher/tables/conference` ),
        departmentI18n:         teacherDatabase.import( `${ projectRoot }/models/teacher/tables/department_i18n` ),
        department:             teacherDatabase.import( `${ projectRoot }/models/teacher/tables/department` ),
        educationI18n:          teacherDatabase.import( `${ projectRoot }/models/teacher/tables/education_i18n` ),
        education:              teacherDatabase.import( `${ projectRoot }/models/teacher/tables/education` ),
        experienceI18n:         teacherDatabase.import( `${ projectRoot }/models/teacher/tables/experience_i18n` ),
        experience:             teacherDatabase.import( `${ projectRoot }/models/teacher/tables/experience` ),
        honorI18n:              teacherDatabase.import( `${ projectRoot }/models/teacher/tables/honor_i18n` ),
        honor:                  teacherDatabase.import( `${ projectRoot }/models/teacher/tables/honor` ),
        labI18n:                teacherDatabase.import( `${ projectRoot }/models/teacher/tables/lab_i18n` ),
        lab:                    teacherDatabase.import( `${ projectRoot }/models/teacher/tables/lab` ),
        officeI18n:             teacherDatabase.import( `${ projectRoot }/models/teacher/tables/office_i18n` ),
        office:                 teacherDatabase.import( `${ projectRoot }/models/teacher/tables/office` ),
        patentI18n:             teacherDatabase.import( `${ projectRoot }/models/teacher/tables/patent_i18n` ),
        patent:                 teacherDatabase.import( `${ projectRoot }/models/teacher/tables/patent` ),
        profileI18n:            teacherDatabase.import( `${ projectRoot }/models/teacher/tables/profile_i18n` ),
        profile:                teacherDatabase.import( `${ projectRoot }/models/teacher/tables/profile` ),
        projectI18n:            teacherDatabase.import( `${ projectRoot }/models/teacher/tables/project_i18n` ),
        project:                teacherDatabase.import( `${ projectRoot }/models/teacher/tables/project` ),
        publicationI18n:        teacherDatabase.import( `${ projectRoot }/models/teacher/tables/publication_i18n` ),
        publication:            teacherDatabase.import( `${ projectRoot }/models/teacher/tables/publication` ),
        specialty:              teacherDatabase.import( `${ projectRoot }/models/teacher/tables/specialty` ),
        technologyTransfer:     teacherDatabase.import( `${ projectRoot }/models/teacher/tables/technology_transfer` ),
        technologyTransferI18n: teacherDatabase.import( `${ projectRoot }/models/teacher/tables/technology_transfer_i18n` ),
        titleI18n:              teacherDatabase.import( `${ projectRoot }/models/teacher/tables/title_i18n` ),
        title:                  teacherDatabase.import( `${ projectRoot }/models/teacher/tables/title` ),
    };

    const data = {};

    // Promise.all uses iterator, so it will keep the order of the elements in array that passed in
    [
        // Data.conferenceI18n,
        data.conference,

        // Data.departmentI18n,
        data.department,

        // Data.educationI18n,
        data.education,

        // Data.experienceI18n,
        data.experience,

        // Data.honorI18n,
        data.honor,

        // Data.labI18n,
        data.lab,

        // Data.officeI18n,
        data.office,

        // Data.patentI18n,
        data.patent,

        // Data.profileI18n,
        data.profile,

        // Data.projectI18n,
        data.project,

        // Data.publicationI18n,
        data.publication,
        data.specialty,
        data.technologyTransfer,

        // Data.technologyTransferI18n,
        // data.titleI18n,
        data.title,
    ] = await Promise.all(
        [
            table.conference.findAll( {
                where: {
                    profileId,
                },
            } ),
            table.department.find( {
                where: {
                    profileId,
                },
            } ),
            table.education.find( {
                where: {
                    profileId,
                },
            } ),
            table.experience.find( {
                where: {
                    profileId,
                },
            } ),
            table.honor.find( {
                where: {
                    profileId,
                },
            } ),
            table.lab.find( {
                where: {
                    profileId,
                },
            } ),
            table.office.find( {
                where: {
                    profileId,
                },
            } ),
            table.patent.find( {
                where: {
                    profileId,
                },
            } ),
            table.profile.find( {
                where: {
                    profileId,
                },
            } ),
            table.project.find( {
                where: {
                    profileId,
                },
            } ),
            table.publication.find( {
                where: {
                    profileId,
                },
            } ),
            table.specialty.find( {
                where: {
                    profileId,
                },
            } ),
            table.technologyTransfer.find( {
                where: {
                    profileId,
                },
            } ),
            table.title.find( {
                where: {
                    profileId,
                },
            } ),
        ]
    );

    teacherDatabase.close();

    return {
        conference: data.conference.map( conference => ( {
            conferenceId: conference.conferenceId,
            profileId:    conference.profileID,
        } ) ),
    };
};
