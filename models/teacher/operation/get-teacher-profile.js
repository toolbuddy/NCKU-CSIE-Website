const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const associations = require( `${ projectRoot }/models/teacher/operation/associations` );

module.exports = async ( { language = 'zh-TW', profileId = 1, } = {} ) => {
    const table = await associations();

    const data = {};

    // Promise.all uses iterator, so it will keep the order of the elements in array that passed in
    [
        data.conferences,
        data.departments,
        data.educations,
        data.experiences,
        data.honors,
        data.labs,
        data.offices,
        data.patents,
        data.profile,
        data.projects,
        data.publications,
        data.specialties,
        data.technologyTransfers,
        data.titles,
    ] = await Promise.all(
        [
            table.conference.findAll( {
                include: [
                    {
                        model:      table.conferenceI18n,
                        as:         'conferenceI18n',
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
            } )
            .then(
                conferences => conferences.map(
                    conference => ( {
                        hostDate:   conference.hostDate,
                        conference: conference.conferenceI18n[ 0 ].conference,
                    } )
                )
            ),
            table.department.findAll( {
                include: [
                    {
                        model:      table.departmentI18n,
                        as:         'departmentI18n',
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
            } )
            .then(
                departments => departments.map(
                    department => ( {
                        department: department.departmentI18n[ 0 ].department,
                    } )
                )
            ),
            table.education.findAll( {
                include: [
                    {
                        model:      table.educationI18n,
                        as:         'educationI18n',
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
            } )
            .then(
                educations => educations.map(
                    education => ( {
                        degree:    education.degree,
                        endYear:   education.endYear,
                        nation:    education.nation,
                        startYear: education.startYear,
                        major:     education.educationI18n[ 0 ].major,
                        school:    education.educationI18n[ 0 ].school,
                    } )
                )
            ),
            table.experience.findAll( {
                include: [
                    {
                        model:      table.experienceI18n,
                        as:         'experienceI18n',
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
            } )
            .then(
                experiences => experiences.map(
                    experience => ( {
                        endYear:      experience.endYear,
                        startYear:    experience.startYear,
                        department:   experience.experienceI18n[ 0 ].department,
                        organization: experience.experienceI18n[ 0 ].organization,
                        title:        experience.experienceI18n[ 0 ].title,
                    } )
                )
            ),
            table.honor.findAll( {
                include: [
                    {
                        model:      table.honorI18n,
                        as:         'honorI18n',
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
            } )
            .then(
                honors => honors.map(
                    honor => ( {
                        honorYear: honor.honorYear,
                        honor:     honor.honorI18n[ 0 ].honor,
                    } )
                )
            ),
            table.lab.findAll( {
                include: [
                    {
                        model:      table.labI18n,
                        as:         'labI18n',
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
            } )
            .then(
                labs => labs.map(
                    lab => ( {
                        labWeb:  lab.labWeb,
                        tel:     lab.tel,
                        address: lab.labI18n[ 0 ].address,
                        name:    lab.labI18n[ 0 ].name,
                    } )
                )
            ),
            table.office.findAll( {
                include: [
                    {
                        model:      table.officeI18n,
                        as:         'officeI18n',
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
            } )
            .then(
                offices => offices.map(
                    office => ( {
                        tel:     office.tel,
                        address: office.officeI18n[ 0 ].address,
                    } )
                )
            ),
            table.patent.findAll( {
                include: [
                    {
                        model:      table.patentI18n,
                        as:         'patentI18n',
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
            } )
            .then(
                patents => patents.map(
                    patent => ( {
                        applicationDate:     patent.applicationDate,
                        certificationNumber: patent.certificationNumber,
                        expireDate:          patent.expireDate,
                        issueDate:           patent.issueDate,
                        nation:              patent.nation,
                        nscNumber:           patent.nscNumber,
                        inventor:            patent.patentI18n[ 0 ].inventor,
                        patent:              patent.patentI18n[ 0 ].patent,
                        patentOwner:         patent.patentI18n[ 0 ].patentOwner,
                    } )
                )
            ),
            table.profile.findOne( {
                include: [
                    {
                        model:      table.profileI18n,
                        as:         'profileI18n',
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
            } )
            .then(
                profile => ( {
                    email:       profile.email,
                    fax:         profile.fax,
                    nation:      profile.nation,
                    personalWeb: profile.personalWeb,
                    photo:       profile.photo,
                    position:    profile.position,
                    name:        profile.profileI18n[ 0 ].name,
                    profileId,
                } )
            ),
            table.project.findAll( {
                include: [
                    {
                        model:      table.projectI18n,
                        as:         'projectI18n',
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
            } )
            .then(
                projects => projects.map(
                    project => ( {
                        category:  project.category,
                        endYear:   project.endYear,
                        startYear: project.startYear,
                        name:      project.projectI18n[ 0 ].name,
                        support:   project.projectI18n[ 0 ].support,
                    } )
                )
            ),
            table.publication.findAll( {
                include: [
                    {
                        model:      table.publicationI18n,
                        as:         'publicationI18n',
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
            } )
            .then(
                publications => publications.map(
                    publication => ( {
                        category:    publication.category,
                        issueYear:   publication.issueYear,
                        publication: publication.publicationI18n[ 0 ].publication,
                    } )
                )
            ),
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
                        as:         'technologyTransferI18n',
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
            } )
            .then(
                technologyTransfers => technologyTransfers.map(
                    technologyTransfer => ( {
                        endDate:    technologyTransfer.endDate,
                        nscNumber:  technologyTransfer.nscNumber,
                        startDate:  technologyTransfer.startDate,
                        authority:  technologyTransfer.technologyTransferI18n[ 0 ].authority,
                        patent:     technologyTransfer.technologyTransferI18n[ 0 ].patent,
                        receiver:   technologyTransfer.technologyTransferI18n[ 0 ].receiver,
                        technology: technologyTransfer.technologyTransferI18n[ 0 ].technology,
                    } )
                )
            ),
            table.title.findAll( {
                include: [
                    {
                        model:      table.titleI18n,
                        as:         'titleI18n',
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
            } )
            .then(
                titles => titles.map(
                    title => ( {
                        endDate:   title.endDate,
                        startDate: title.startDate,
                        title:     title.titleI18n[ 0 ].title,
                    } )
                )
            ),
        ]
    );

    table.database.close();

    return data;
};
