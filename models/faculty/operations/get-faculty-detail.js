/**
 * A function for getting a specific teacher's profile in detail in specific languages by the profile id.
 *
 * @async
 * @param {number} [languageId = defaultValue.languageId] - Language option of the profile.
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

module.exports = async (opt) => {
    try {
        opt = opt || {};
        const {
            languageId = null,
            profileId = null,
        } = opt;

        if (!LanguageUtils.isSupportedLanguageId(languageId)) {
            const error = new Error('Invalid language id');
            error.status = 400;
            throw error;
        }
        if (!ValidateUtils.isValidId(profileId)) {
            const error = new Error('Invalid profile id');
            error.status = 400;
            throw error;
        }

        const [
            awards,
            conferences,
            departments,
            educations,
            experiences,
            patents,
            profile,
            profileI18n,
            projects,
            publications,
            researchGroups,
            specialtys,
            studentAwards,
            technologyTransfers,
            titles,
        ] = await Promise.all([
            Award.findAll({
                attributes: ['receivedYear'],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: AwardI18n,
                        as: 'awardI18n',
                        attributes: ['award'],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            Conference.findAll({
                attributes: ['hostYear'],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: ConferenceI18n,
                        as: 'conferenceI18n',
                        attributes: [
                            'conference',
                            'title',
                        ],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            Department.findAll({
                attributes: ['type'],
                where: {
                    profileId,
                },
            }),
            Education.findAll({
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
                        model: EducationI18n,
                        as: 'educationI18n',
                        attributes: [
                            'major',
                            'school',
                        ],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            Experience.findAll({
                attributes: [
                    'from',
                    'to',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: ExperienceI18n,
                        as: 'experienceI18n',
                        attributes: [
                            'department',
                            'organization',
                            'title',
                        ],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            Patent.findAll({
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
                        model: PatentI18n,
                        as: 'patentI18n',
                        attributes: [
                            'inventor',
                            'patent',
                            'patentOwner',
                        ],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            Profile.findOne({
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
            }),
            ProfileI18n.findOne({
                attributes: [
                    'labAddress',
                    'labName',
                    'name',
                    'officeAddress',
                ],
                where: {
                    languageId,
                    profileId,
                },
            }),
            Project.findAll({
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
                        model: ProjectI18n,
                        as: 'projectI18n',
                        attributes: [
                            'name',
                            'support',
                        ],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            Publication.findAll({
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
                        model: PublicationI18n,
                        as: 'publicationI18n',
                        attributes: [
                            'authors',
                            'title',
                        ],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            ResearchGroup.findAll({
                attributes: ['type'],
                where: {
                    profileId,
                },
            }),
            Specialty.findAll({
                attributes: [],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: SpecialtyI18n,
                        as: 'specialtyI18n',
                        attributes: ['specialty'],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            StudentAward.findAll({
                attributes: ['receivedYear'],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: Student,
                        as: 'student',
                        attributes: ['degree'],
                        include: [
                            {
                                model: StudentI18n,
                                as: 'studentI18n',
                                attributes: ['name'],
                                where: {
                                    languageId,
                                },
                            },
                        ],
                    },
                    {
                        model: StudentAwardI18n,
                        as: 'studentAwardI18n',
                        attributes: ['award'],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            TechnologyTransfer.findAll({
                attributes: [
                    'from',
                    'to',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: TechnologyTransferPatent,
                        as: 'technologyTransferPatent',
                        include: [
                            {
                                model: TechnologyTransferPatentI18n,
                                as: 'technologyTransferPatentI18n',
                                attributes: ['patent'],
                                where: {
                                    languageId,
                                },
                            },
                        ],
                    },
                    {
                        model: TechnologyTransferI18n,
                        as: 'technologyTransferI18n',
                        attributes: [
                            'authorizedParty',
                            'authorizingParty',
                            'technology',
                        ],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            Title.findAll({
                attributes: [
                    'from',
                    'to',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: TitleI18n,
                        as: 'titleI18n',
                        attributes: ['title'],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
        ]);

        /**
         * Profile not found.
         * Handle with 404 not found.
         */

        if (!profile) {
            const error = new Error('Profile not found');
            error.status = 404;
            throw error;
        }

        return {
            award: awards.map(award => ({
                award: award.awardI18n[0].award,
                receivedYear: award.receivedYear,
            })),
            conference: conferences.map(conference => ({
                conference: conference.conferenceI18n[0].conference,
                hostYear: conference.hostYear,
                title: conference.conferenceI18n[0].title,
            })),
            department: departments.map(department => departmentUtils.getValueById({
                id: department.type,
                languageId,
            })),
            education: educations.map(education => ({
                degree: degreeUtils.getValueById({
                    id: education.degree,
                    languageId,
                }),
                from: education.from,
                major: education.educationI18n[0].major,
                nation: nationUtils.getOptionById(education.nation),
                school: education.educationI18n[0].school,
                to: education.to,
            })),
            experience: experiences.map(experience => ({
                department: experience.experienceI18n[0].department,
                from: experience.from,
                organization: experience.experienceI18n[0].organization,
                title: experience.experienceI18n[0].title,
                to: experience.to,
            })),
            patent: patents.map(patent => ({
                applicationDate: patent.applicationDate,
                certificationNumber: patent.certificationNumber,
                expireDate: patent.expireDate,
                inventor: patent.patentI18n[0].inventor,
                issueDate: patent.issueDate,
                nation: nationUtils.getOptionById(patent.nation),
                patent: patent.patentI18n[0].patent,
                patentOwner: patent.patentI18n[0].patentOwner,
            })),
            profile: {
                email: profile.email,
                fax: profile.fax,
                labAddress: profileI18n.labAddress,
                labName: profileI18n.labName,
                labTel: profile.labTel,
                labWeb: profile.labWeb,
                name: profileI18n.name,
                nation: nationUtils.getValueById({
                    id: profile.nation,
                    languageId,
                }),
                officeAddress: profileI18n.officeAddress,
                officeTel: profile.officeTel,
                personalWeb: profile.personalWeb,
                photo: profile.photo,
                profileId,
            },
            project: projects.map(project => ({
                category: project.category,
                from: project.from,
                name: project.projectI18n[0].name,
                support: project.projectI18n[0].support,
                to: project.to,
            })),
            publication: publications.map(publication => ({
                authors: publication.publicationI18n[0].authors,
                category: publication.category,
                international: publication.international,
                issueDate: publication.issueDate,
                issueYear: publication.issueYear,
                refereed: publication.refereed,
                title: publication.publicationI18n[0].title,
            })),
            researchGroup: researchGroups.map(researchGroup => researchGroupUtils.getValueById({
                type: researchGroup.type,
                languageId,
            })),
            specialty: specialtys.map(specialty => specialty.specialtyI18n[0].specialty),
            studentAward: studentAwards.map(studentAward => ({
                award: studentAward.studentAwardI18n[0].award,
                receivedYear: studentAward.receivedYear,
                student: studentAward.student.map(student => ({
                    degree: degreeUtils.getValueById({
                        id: student.degree,
                        languageId,
                    }),
                    name: student.studentI18n[0].name,
                })),
            })),
            technologyTransfer: technologyTransfers.map(technologyTransfer => ({
                authorizingParty: technologyTransfer.technologyTransferI18n[0].authorizingParty,
                authorizedParty: technologyTransfer.technologyTransferI18n[0].authorizedParty,
                from: technologyTransfer.from,
                patent: technologyTransfer.technologyTransferPatent.map(patent => patent.technologyTransferPatentI18n[0].patent),
                to: technologyTransfer.to,
                technology: technologyTransfer.technologyTransferI18n[0].technology,
            })),
            title: titles.map(title => ({
                from: title.from,
                title: title.titleI18n[0].title,
                to: title.to,
            })),
        };
    }
    catch (error) {
        if (!error.status)
            error.status = 500;
        throw error;
    }
};
