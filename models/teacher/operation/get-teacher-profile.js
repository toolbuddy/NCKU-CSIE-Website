const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const associations = require( `${ projectRoot }/models/teacher/operation/associations` );

module.exports = async ( { language = 'zh-TW', profileId = 1, } = {} ) => {
    const table = await associations();

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
                include: [
                    {
                        model:      table.conferenceI18n,
                        attributes: [
                            'conference',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
                attributes: [
                    'hostDate',
                ],
                where: {
                    profileId,
                },
            } ),
            table.department.findAll( {
                include: [
                    {
                        model:      table.departmentI18n,
                        attributes: [
                            'department',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
                attributes: [],
                where:      {
                    profileId,
                },
            } ),
            table.education.findAll( {
                include: [
                    {
                        model:      table.educationI18n,
                        attributes: [
                            'major',
                            'school',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
                attributes: [
                    'degree',
                    'endYear',
                    'nation',
                    'startYear',
                ],
                where: {
                    profileId,
                },
            } ),
            table.experience.findAll( {
                include: [
                    {
                        model:      table.experienceI18n,
                        attributes: [
                            'department',
                            'organization',
                            'title',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
                attributes: [
                    'endYear',
                    'startYear',
                ],
                where: {
                    profileId,
                },
            } ),
            table.honor.findAll( {
                include: [
                    {
                        model:      table.honorI18n,
                        attributes: [
                            'honor',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
                attributes: [
                    'honorYear',
                ],
                where: {
                    profileId,
                },
            } ),
            table.lab.findAll( {
                include: [
                    {
                        model:      table.labI18n,
                        attributes: [
                            'address',
                            'name',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
                attributes: [
                    'labWeb',
                    'tel',
                ],
                where: {
                    profileId,
                },
            } ),
            table.office.findAll( {
                include: [
                    {
                        model:      table.officeI18n,
                        attributes: [
                            'address',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
                attributes: [
                    'tel',
                ],
                where: {
                    profileId,
                },
            } ),
            table.patent.findAll( {
                include: [
                    {
                        model:      table.patentI18n,
                        attributes: [
                            'inventor',
                            'patent',
                            'patentOwner',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
                attributes: [
                    'applicationDate',
                    'certificationNumber',
                    'expireDate',
                    'issueDate',
                    'nation',
                    'nscNumber',
                ],
                where: {
                    profileId,
                },
            } ),
            table.profile.findOne( {
                include: [
                    {
                        model:      table.profileI18n,
                        attributes: [
                            'name',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
                attributes: [
                    'email',
                    'fax',
                    'nation',
                    'personalWeb',
                    'photo',
                    'position',
                ],
                where: {
                    profileId,
                },
            } ),
            table.project.findAll( {
                include: [
                    {
                        model:      table.projectI18n,
                        attributes: [
                            'name',
                            'support',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
                attributes: [
                    'category',
                    'endYear',
                    'startYear',
                ],
                where: {
                    profileId,
                },
            } ),
            table.publication.findAll( {
                include: [
                    {
                        model:      table.publicationI18n,
                        attributes: [
                            'publication',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
                attributes: [
                    'category',
                    'issueYear',
                ],
                where: {
                    profileId,
                },
            } ),
            table.specialty.findAll( {
                attributes: [
                    'specialty',
                ],
                where: {
                    profileId,
                    language,
                },
            } ),
            table.technologyTransfer.findAll( {
                include: [
                    {
                        model:      table.technologyTransferI18n,
                        attributes: [
                            'authority',
                            'patent',
                            'receiver',
                            'technology',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
                attributes: [
                    'endDate',
                    'nscNumber',
                    'startDate',
                ],
                where: {
                    profileId,
                },
            } ),
            table.title.findAll( {
                include: [
                    {
                        model:      table.titleI18n,
                        attributes: [
                            'title',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
                attributes: [
                    'endDate',
                    'startDate',
                ],
                where: {
                    profileId,
                },
            } ),
        ]
    );

    /* Data.conference = await Promise.all(
        data.conference.map(
            async conference => table.conferenceI18n.findOne( {
                attributes: [
                    'conference',
                ],
                where: {
                    conferenceId: conference.conferenceId,
                    language,
                },
            } )
        )
    );*/

    table.database.close();

    return data;
};
