import path from 'path';

import serverSettings from 'settings/server/config.js';
import connect from 'settings/database/connect.js';

export default async () => {
    const facultyDatabase = await connect( 'faculty' );
    const table = {
        conferenceI18n:         facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/conference_i18n' ) ),
        conference:             facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/conference' ) ),
        departmentI18n:         facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/department_i18n' ) ),
        department:             facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/department' ) ),
        educationI18n:          facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/education_i18n' ) ),
        education:              facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/education' ) ),
        experienceI18n:         facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/experience_i18n' ) ),
        experience:             facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/experience' ) ),
        awardI18n:              facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/award_i18n' ) ),
        award:                  facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/award' ) ),
        labI18n:                facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/lab_i18n' ) ),
        lab:                    facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/lab' ) ),
        officeI18n:             facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/office_i18n' ) ),
        office:                 facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/office' ) ),
        patentI18n:             facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/patent_i18n' ) ),
        patent:                 facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/patent' ) ),
        profileI18n:            facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/profile_i18n' ) ),
        profile:                facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/profile' ) ),
        projectI18n:            facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/project_i18n' ) ),
        project:                facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/project' ) ),
        publicationI18n:        facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/publication_i18n' ) ),
        publication:            facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/publication' ) ),
        specialtyI18n:          facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/specialty_i18n' ) ),
        technologyTransfer:     facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/technology_transfer' ) ),
        technologyTransferI18n: facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/technology_transfer_i18n' ) ),
        titleI18n:              facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/title_i18n' ) ),
        title:                  facultyDatabase.import( path.join( serverSettings.projectRoot, '/models/faculty/tables/title' ) ),
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

    // `award` has many translations.
    table.award.hasMany( table.awardI18n, {
        as:         'awardI18n',
        foreignKey: 'awardId',
        sourceKey:  'awardId',
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

    // `profile` has many `award`.
    table.profile.hasMany( table.award, {
        as:         'award',
        foreignKey: 'awardId',
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

    // `profile` has many `specialty_i18n`.
    table.profile.hasMany( table.specialty_i18n, {
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
    table.database = facultyDatabase;

    return table;
};
