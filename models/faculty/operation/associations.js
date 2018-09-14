const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const connect = require( `${ projectRoot }/settings/database/connect` );

module.exports = async () => {
    const teacherDatabase = await connect( 'faculty' );
    const table = {
        conferenceI18n:         teacherDatabase.import( `${ projectRoot }/models/faculty/tables/conference_i18n` ),
        conference:             teacherDatabase.import( `${ projectRoot }/models/faculty/tables/conference` ),
        departmentI18n:         teacherDatabase.import( `${ projectRoot }/models/faculty/tables/department_i18n` ),
        department:             teacherDatabase.import( `${ projectRoot }/models/faculty/tables/department` ),
        educationI18n:          teacherDatabase.import( `${ projectRoot }/models/faculty/tables/education_i18n` ),
        education:              teacherDatabase.import( `${ projectRoot }/models/faculty/tables/education` ),
        experienceI18n:         teacherDatabase.import( `${ projectRoot }/models/faculty/tables/experience_i18n` ),
        experience:             teacherDatabase.import( `${ projectRoot }/models/faculty/tables/experience` ),
        honorI18n:              teacherDatabase.import( `${ projectRoot }/models/faculty/tables/honor_i18n` ),
        honor:                  teacherDatabase.import( `${ projectRoot }/models/faculty/tables/honor` ),
        labI18n:                teacherDatabase.import( `${ projectRoot }/models/faculty/tables/lab_i18n` ),
        lab:                    teacherDatabase.import( `${ projectRoot }/models/faculty/tables/lab` ),
        officeI18n:             teacherDatabase.import( `${ projectRoot }/models/faculty/tables/office_i18n` ),
        office:                 teacherDatabase.import( `${ projectRoot }/models/faculty/tables/office` ),
        patentI18n:             teacherDatabase.import( `${ projectRoot }/models/faculty/tables/patent_i18n` ),
        patent:                 teacherDatabase.import( `${ projectRoot }/models/faculty/tables/patent` ),
        profileI18n:            teacherDatabase.import( `${ projectRoot }/models/faculty/tables/profile_i18n` ),
        profile:                teacherDatabase.import( `${ projectRoot }/models/faculty/tables/profile` ),
        projectI18n:            teacherDatabase.import( `${ projectRoot }/models/faculty/tables/project_i18n` ),
        project:                teacherDatabase.import( `${ projectRoot }/models/faculty/tables/project` ),
        publicationI18n:        teacherDatabase.import( `${ projectRoot }/models/faculty/tables/publication_i18n` ),
        publication:            teacherDatabase.import( `${ projectRoot }/models/faculty/tables/publication` ),
        specialty:              teacherDatabase.import( `${ projectRoot }/models/faculty/tables/specialty` ),
        technologyTransfer:     teacherDatabase.import( `${ projectRoot }/models/faculty/tables/technology_transfer` ),
        technologyTransferI18n: teacherDatabase.import( `${ projectRoot }/models/faculty/tables/technology_transfer_i18n` ),
        titleI18n:              teacherDatabase.import( `${ projectRoot }/models/faculty/tables/title_i18n` ),
        title:                  teacherDatabase.import( `${ projectRoot }/models/faculty/tables/title` ),
    };

    // Translation relationship.
    // `conference` has many translations.
    table.conference.hasMany( table.conferenceI18n, {
        as:         'conferenceI18n',
        foreignKey: 'conferenceId',
        sourceKey:  'conferenceId',
    } );

    // `department` has many translations.
    table.department.hasMany( table.departmentI18n, {
        as:         'departmentI18n',
        foreignKey: 'departmentId',
        sourceKey:  'departmentId',
    } );

    // `education` has many translations.
    table.education.hasMany( table.educationI18n, {
        as:         'educationI18n',
        foreignKey: 'educationId',
        sourceKey:  'educationId',
    } );

    // `experience` has many translations.
    table.experience.hasMany( table.experienceI18n, {
        as:         'experienceI18n',
        foreignKey: 'experienceId',
        sourceKey:  'experienceId',
    } );

    // `honor` has many translations.
    table.honor.hasMany( table.honorI18n, {
        as:         'honorI18n',
        foreignKey: 'honorId',
        sourceKey:  'honorId',
    } );

    // `lab` has many translations.
    table.lab.hasMany( table.labI18n, {
        as:         'labI18n',
        foreignKey: 'labId',
        sourceKey:  'labId',
    } );

    // `office` has many translations.
    table.office.hasMany( table.officeI18n, {
        as:         'officeI18n',
        foreignKey: 'officeId',
        sourceKey:  'officeId',
    } );

    // `patent` has many translations.
    table.patent.hasMany( table.patentI18n, {
        as:         'patentI18n',
        foreignKey: 'patentId',
        sourceKey:  'patentId',
    } );

    // `profile` has many translations.
    table.profile.hasMany( table.profileI18n, {
        as:         'profileI18n',
        foreignKey: 'profileId',
        sourceKey:  'profileId',
    } );

    // `project` has many translations.
    table.project.hasMany( table.projectI18n, {
        as:         'projectI18n',
        foreignKey: 'projectId',
        sourceKey:  'projectId',
    } );

    // `publication` has many translations.
    table.publication.hasMany( table.publicationI18n, {
        as:         'publicationI18n',
        foreignKey: 'publicationId',
        sourceKey:  'publicationId',
    } );

    // `technologyTransfer` has many translations.
    table.technologyTransfer.hasMany( table.technologyTransferI18n, {
        as:         'technologyTransferI18n',
        foreignKey: 'technologyTransferId',
        sourceKey:  'technologyTransferId',
    } );

    // `title` has many translations.
    table.title.hasMany( table.titleI18n, {
        as:         'titleI18n',
        foreignKey: 'titleId',
        sourceKey:  'titleId',
    } );

    // Profile relationship.
    // `profile` has many `conference`.
    table.profile.hasMany( table.conference, {
        as:         'conference',
        foreignKey: 'conferenceId',
        sourceKey:  'profileId',
    } );

    // `profile` has many `department`.
    table.profile.hasMany( table.department, {
        as:         'department',
        foreignKey: 'departmentId',
        sourceKey:  'profileId',
    } );

    // `profile` has many `education`.
    table.profile.hasMany( table.education, {
        as:         'education',
        foreignKey: 'educationId',
        sourceKey:  'profileId',
    } );

    // `profile` has many `experience`.
    table.profile.hasMany( table.experience, {
        as:         'experience',
        foreignKey: 'experienceId',
        sourceKey:  'profileId',
    } );

    // `profile` has many `honor`.
    table.profile.hasMany( table.honor, {
        as:         'honor',
        foreignKey: 'honorId',
        sourceKey:  'profileId',
    } );

    // `profile` has many `lab`.
    table.profile.hasMany( table.lab, {
        as:         'lab',
        foreignKey: 'labId',
        sourceKey:  'profileId',
    } );

    // `profile` has many `office`.
    table.profile.hasMany( table.office, {
        as:         'office',
        foreignKey: 'officeId',
        sourceKey:  'profileId',
    } );

    // `profile` has many `patent`.
    table.profile.hasMany( table.patent, {
        as:         'patent',
        foreignKey: 'patentId',
        sourceKey:  'profileId',
    } );

    // `profile` has many `project`.
    table.profile.hasMany( table.project, {
        as:         'project',
        foreignKey: 'projectId',
        sourceKey:  'profileId',
    } );

    // `profile` has many `publication`.
    table.profile.hasMany( table.publication, {
        as:         'publication',
        foreignKey: 'publicationId',
        sourceKey:  'profileId',
    } );

    // `profile` has many `specialty`.
    table.profile.hasMany( table.specialty, {
        as:         'specialty',
        foreignKey: 'specialtyId',
        sourceKey:  'profileId',
    } );

    // `profile` has many `technologyTransfer`.
    table.profile.hasMany( table.technologyTransfer, {
        as:         'technologyTransfer',
        foreignKey: 'technologyTransferId',
        sourceKey:  'profileId',
    } );

    // `profile` has many `title`.
    table.profile.hasMany( table.title, {
        as:         'title',
        foreignKey: 'titleId',
        sourceKey:  'profileId',
    } );

    // Any one who use this module should remember to close connection,
    // like `table.database.close()`.
    table.database = teacherDatabase;

    return table;
};
