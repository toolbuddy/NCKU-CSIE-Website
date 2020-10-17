/**
 * A function for getting a specific teacher's profile in detail in specific languages by the profile id.
 *
 * @async
 * @param {number} [language = defaultValue.language] - Language option of the profile.
 * @param {number} [profileId]                        - Id of the requested profile.
 * @returns {object}                                  - Related information of the requested profile, including:
 * - award
 * - conference
 * - department
 * - education
 * - experience
 * - patent
 * - personal information
 * - project
 * - publication
 * - researchGroup
 * - specialty
 * - studentAward
 * - technologyTransfer
 * - title.
 */

const LanguageUtils = require('../../common/utils/language.js');
const degreeUtils = require('../utils/degree.js');
const departmentUtils = require('../utils/department.js');
const nationUtils = require('../utils/nation.js');
const researchGroupUtils = require('../utils/research-group.js');
const ValidateUtils = require('../../common/utils/validate.js');
const {
    AwardI18n,
    Award,
    ConferenceI18n,
    Conference,
    Department,
    EducationI18n,
    Education,
    ExperienceI18n,
    Experience,
    PatentI18n,
    Patent,
    ProfileI18n,
    Profile,
    ProjectI18n,
    Project,
    PublicationI18n,
    Publication,
    ResearchGroup,
    Specialty,
    SpecialtyI18n,
    StudentAwardI18n,
    StudentAward,
    StudentI18n,
    Student,
    TechnologyTransferPatentI18n,
    TechnologyTransferPatent,
    TechnologyTransferI18n,
    TechnologyTransfer,
    Title,
    TitleI18n,
} = require('./associations.js');

module.exports = async ( opt ) => {
    try {
        opt = opt || {};
        const {
            language = null,
            profileId = null,
        } = opt;

        if ( !LanguageUtils.isSupportedLanguageId( language ) ) {
            const error = new Error( 'Invalid language id' );
            error.status = 400;
            throw error;
        }
        if ( !ValidateUtils.isValidId( profileId ) ) {
            const error = new Error( 'Invalid profile id' );
            error.status = 400;
            throw error;
        }

        const [
            award,
            conference,
            department,
            education,
            experience,
            patent,
            profile,
            profileI18n,
            project,
            publication,
            researchGroup,
            specialty,
            studentAward,
            technologyTransfer,
            title,
        ] = await Promise.all( [
            Award.findAll( {
                attributes: [
                    'receivedYear',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model:      AwardI18n,
                        as:         'awardI18n',
                        attributes: [
                            'award',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
            } ),
            Conference.findAll( {
                attributes: [
                    'hostYear',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model:      ConferenceI18n,
                        as:         'conferenceI18n',
                        attributes: [
                            'conference',
                            'title',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
            } ),
            Department.findAll( {
                attributes: [
                    'type',
                ],
                where: {
                    profileId,
                },
            } ),
            Education.findAll( {
                attributes: [
                    'degree',
                    'from',
                    'nation',
                    'to',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model:      EducationI18n,
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
            } ),
            Experience.findAll( {
                attributes: [
                    'from',
                    'to',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model:      ExperienceI18n,
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
            } ),
            Patent.findAll( {
                attributes: [
                    'applicationDate',
                    'certificationNumber',
                    'expireDate',
                    'issueDate',
                    'nation',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model:      PatentI18n,
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
            } ),
            Profile.findOne( {
                attributes: [
                    'email',
                    'fax',
                    'labTel',
                    'labWeb',
                    'nation',
                    'officeTel',
                    'personalWeb',
                    'photo',
                ],
                where: {
                    profileId,
                },
            } ),
            ProfileI18n.findOne( {
                attributes: [
                    'labAddress',
                    'labName',
                    'name',
                    'officeAddress',
                ],
                where: {
                    language,
                    profileId,
                },
            } ),
            Project.findAll( {
                attributes: [
                    'category',
                    'from',
                    'to',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model:      ProjectI18n,
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
            } ),
            Publication.findAll( {
                attributes: [
                    'category',
                    'issueMonth',
                    'issueYear',
                    'international',
                    'refereed',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model:      PublicationI18n,
                        as:         'publicationI18n',
                        attributes: [
                            'authors',
                            'title',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
            } ),
            ResearchGroup.findAll( {
                attributes: [
                    'type',
                ],
                where: {
                    profileId,
                },
            } ),
            Specialty.findAll( {
                attributes: [],
                where:      {
                    profileId,
                },
                include: [
                    {
                        model:      SpecialtyI18n,
                        as:         'specialtyI18n',
                        attributes: [
                            'specialty',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
            } ),
            StudentAward.findAll( {
                attributes: [
                    'receivedYear',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model:      Student,
                        as:         'student',
                        attributes: [
                            'degree',
                        ],
                        include: [
                            {
                                model:      StudentI18n,
                                as:         'studentI18n',
                                attributes: [
                                    'name',
                                ],
                                where: {
                                    language,
                                },
                            },
                        ],
                    },
                    {
                        model:      StudentAwardI18n,
                        as:         'studentAwardI18n',
                        attributes: [
                            'award',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
            } ),
            TechnologyTransfer.findAll( {
                attributes: [
                    'from',
                    'to',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model:      TechnologyTransferPatent,
                        as:         'technologyTransferPatent',
                        include:    [
                            {
                                model:      TechnologyTransferPatentI18n,
                                as:         'technologyTransferPatentI18n',
                                attributes: [
                                    'patent',
                                ],
                                where: {
                                    language,
                                },
                            },
                        ],
                    },
                    {
                        model:      TechnologyTransferI18n,
                        as:         'technologyTransferI18n',
                        attributes: [
                            'authorizedParty',
                            'authorizingParty',
                            'technology',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
            } ),
            Title.findAll( {
                attributes: [
                    'from',
                    'to',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model:      TitleI18n,
                        as:         'titleI18n',
                        attributes: [
                            'title',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
            } ),
        ] );

        /**
         * Profile not found.
         * Handle with 404 not found.
         */

        if ( !profile ) {
            const error = new Error( 'Profile not found' );
            error.status = 404;
            throw error;
        }

        return {
            award: award.map( award => ( {
                award:         award.awardI18n[ 0 ].award,
                receivedYear:  award.receivedYear,
            } ) ),
            conference: conference.map( conference => ( {
                conference: conference.conferenceI18n[ 0 ].conference,
                hostYear:   conference.hostYear,
                title:      conference.conferenceI18n[ 0 ].title,
            } ) ),
            department: department.map( department => departmentUtils.getValueById( {
                id:         department.type,
                languageId: language,
            } ) ),
            education:  education.map( education => ( {
                degree: degreeUtils.getValueById( {
                    id: education.degree,
                    language,
                } ),
                from:   education.from,
                major:  education.educationI18n[ 0 ].major,
                nation: nationUtils.getOptionById( education.nation ),
                school: education.educationI18n[ 0 ].school,
                to:     education.to,
            } ) ),
            experience: experience.map( experience => ( {
                department:   experience.experienceI18n[ 0 ].department,
                from:         experience.from,
                organization: experience.experienceI18n[ 0 ].organization,
                title:        experience.experienceI18n[ 0 ].title,
                to:           experience.to,
            } ) ),
            patent: patent.map( patent => ( {
                applicationDate:     patent.applicationDate,
                certificationNumber: patent.certificationNumber,
                expireDate:          patent.expireDate,
                inventor:            patent.patentI18n[ 0 ].inventor,
                issueDate:           patent.issueDate,
                nation:              nationUtils.getOptionById( patent.nation ),
                patent:              patent.patentI18n[ 0 ].patent,
                patentOwner:         patent.patentI18n[ 0 ].patentOwner,
            } ) ),
            profile: {
                email:         profile.email,
                fax:           profile.fax,
                labAddress:    profileI18n.labAddress,
                labName:       profileI18n.labName,
                labTel:        profile.labTel,
                labWeb:        profile.labWeb,
                name:          profileI18n.name,
                nation:        nationUtils.getValueById( {
                    id: profile.nation,
                    language,
                } ),
                officeAddress: profileI18n.officeAddress,
                officeTel:     profile.officeTel,
                personalWeb:   profile.personalWeb,
                photo:         profile.photo,
                profileId,
            },
            project: project.map( project => ( {
                category: project.category,
                from:     project.from,
                name:     project.projectI18n[ 0 ].name,
                support:  project.projectI18n[ 0 ].support,
                to:       project.to,
            } ) ),
            publication: publication.map( publication => ( {
                authors:       publication.publicationI18n[ 0 ].authors,
                category:      publication.category,
                international: publication.international,
                issueDate:     publication.issueDate,
                issueYear:     publication.issueYear,
                refereed:      publication.refereed,
                title:         publication.publicationI18n[ 0 ].title,
            } ) ),
            researchGroup: researchGroup.map( researchGroup => researchGroupUtils.getValueById( {
                type:       researchGroup.type,
                languageId: language,
            } ) ),
            specialty:     specialty.map( specialty => specialty.specialtyI18n[ 0 ].specialty ),
            studentAward:  studentAward.map( studentAward => ( {
                award:        studentAward.studentAwardI18n[ 0 ].award,
                receivedYear: studentAward.receivedYear,
                student:      studentAward.student.map( student => ( {
                    degree: degreeUtils.getValueById( {
                        id: student.degree,
                        language,
                    } ),
                    name:   student.studentI18n[ 0 ].name,
                } ) ),
            } ) ),
            technologyTransfer: technologyTransfer.map( technologyTransfer => ( {
                authorizingParty: technologyTransfer.technologyTransferI18n[ 0 ].authorizingParty,
                authorizedParty:  technologyTransfer.technologyTransferI18n[ 0 ].authorizedParty,
                from:             technologyTransfer.from,
                patent:           technologyTransfer.technologyTransferPatent.map( patent => patent.technologyTransferPatentI18n[ 0 ].patent ),
                to:               technologyTransfer.to,
                technology:       technologyTransfer.technologyTransferI18n[ 0 ].technology,
            } ) ),
            title: title.map( title => ( {
                from:  title.from,
                title: title.titleI18n[ 0 ].title,
                to:    title.to,
            } ) ),
        };
    }
    catch ( error ) {
        if ( !error.status )
            error.status = 500;
        throw error;
    }
};
