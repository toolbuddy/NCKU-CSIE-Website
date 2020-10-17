const AwardI18n = require('../schemas/award-i18n.js');
const Award = require('../schemas/award.js');
const ConferenceI18n = require('../schemas/conference-i18n.js');
const Conference = require('../schemas/conference.js');
const Department = require('../schemas/department.js');
const EducationI18n = require('../schemas/education-i18n.js');
const Education = require('../schemas/education.js');
const ExperienceI18n = require('../schemas/experience-i18n.js');
const Experience = require('../schemas/experience.js');
const PatentI18n = require('../schemas/patent-i18n.js');
const Patent = require('../schemas/patent.js');
const ProfileI18n = require('../schemas/profile-i18n.js');
const Profile = require('../schemas/profile.js');
const ProjectI18n = require('../schemas/project-i18n.js');
const Project = require('../schemas/project.js');
const PublicationI18n = require('../schemas/publication-i18n.js');
const Publication = require('../schemas/publication.js');
const ResearchGroup = require('../schemas/research-group.js');
const Specialty = require('../schemas/specialty.js');
const SpecialtyI18n = require('../schemas/specialty-i18n.js');
const StudentAwardI18n = require('../schemas/student-award-i18n.js');
const StudentAward = require('../schemas/student-award.js');
const StudentI18n = require('../schemas/student-i18n.js');
const Student = require('../schemas/student.js');
const TechnologyTransferI18n = require('../schemas/technology-transfer-i18n.js');
const TechnologyTransfer = require('../schemas/technology-transfer.js');
const TechnologyTransferPatentI18n = require('../schemas/technology-transfer-patent-i18n.js');
const TechnologyTransferPatent = require('../schemas/technology-transfer-patent.js');
const TitleI18n = require('../schemas/title-i18n.js');
const Title = require('../schemas/title.js');

Award.hasMany( AwardI18n, {
    as:         'awardI18n',
    foreignKey: 'awardId',
    sourceKey:  'awardId',
} );

Profile.hasMany( Award, {
    as:         'award',
    foreignKey: 'profileId',
    sourceKey:  'profileId',
} );

Conference.hasMany( ConferenceI18n, {
    as:         'conferenceI18n',
    foreignKey: 'conferenceId',
    sourceKey:  'conferenceId',
} );

Profile.hasMany( Conference, {
    as:         'conference',
    foreignKey: 'profileId',
    sourceKey:  'profileId',
} );

Profile.hasMany( Department, {
    as:         'department',
    foreignKey: 'profileId',
    sourceKey:  'profileId',
} );

Education.hasMany( EducationI18n, {
    as:         'educationI18n',
    foreignKey: 'educationId',
    sourceKey:  'educationId',
} );

Profile.hasMany( Education, {
    as:         'education',
    foreignKey: 'profileId',
    sourceKey:  'profileId',
} );

Experience.hasMany( ExperienceI18n, {
    as:         'experienceI18n',
    foreignKey: 'experienceId',
    sourceKey:  'experienceId',
} );

Profile.hasMany( Experience, {
    as:         'experience',
    foreignKey: 'profileId',
    sourceKey:  'profileId',
} );

Patent.hasMany( PatentI18n, {
    as:         'patentI18n',
    foreignKey: 'patentId',
    sourceKey:  'patentId',
} );

Profile.hasMany( Patent, {
    as:         'patent',
    foreignKey: 'profileId',
    sourceKey:  'profileId',
} );

Profile.hasMany( ProfileI18n, {
    as:         'profileI18n',
    foreignKey: 'profileId',
    sourceKey:  'profileId',
} );

Project.hasMany( ProjectI18n, {
    as:         'projectI18n',
    foreignKey: 'projectId',
    sourceKey:  'projectId',
} );

Profile.hasMany( Project, {
    as:         'project',
    foreignKey: 'profileId',
    sourceKey:  'profileId',
} );

Publication.hasMany( PublicationI18n, {
    as:         'publicationI18n',
    foreignKey: 'publicationId',
    sourceKey:  'publicationId',
} );

Profile.hasMany( Publication, {
    as:         'publication',
    foreignKey: 'profileId',
    sourceKey:  'profileId',
} );

Profile.hasMany( ResearchGroup, {
    as:         'researchGroup',
    foreignKey: 'profileId',
    sourceKey:  'profileId',
} );

Specialty.hasMany( SpecialtyI18n, {
    as:         'specialtyI18n',
    foreignKey: 'specialtyId',
    sourceKey:  'specialtyId',
} );

Profile.hasMany( Specialty, {
    as:         'specialty',
    foreignKey: 'profileId',
    sourceKey:  'profileId',
} );

StudentAward.hasMany( StudentAwardI18n, {
    as:         'studentAwardI18n',
    foreignKey: 'studentAwardId',
    sourceKey:  'studentAwardId',
} );

Profile.hasMany( StudentAward, {
    as:         'studentAward',
    foreignKey: 'profileId',
    sourceKey:  'profileId',
} );

Student.hasMany( StudentI18n, {
    as:         'studentI18n',
    foreignKey: 'studentId',
    sourceKey:  'studentId',
} );

StudentAward.hasMany( Student, {
    as:         'student',
    foreignKey: 'studentAwardId',
    sourceKey:  'studentAwardId',
} );

TechnologyTransferPatent.hasMany( TechnologyTransferPatentI18n, {
    as:         'technologyTransferPatentI18n',
    foreignKey: 'technologyTransferPatentId',
    sourceKey:  'technologyTransferPatentId',
} );

TechnologyTransfer.hasMany( TechnologyTransferPatent, {
    as:         'technologyTransferPatent',
    foreignKey: 'technologyTransferId',
    sourceKey:  'technologyTransferId',
} );

TechnologyTransfer.hasMany( TechnologyTransferI18n, {
    as:         'technologyTransferI18n',
    foreignKey: 'technologyTransferId',
    sourceKey:  'technologyTransferId',
} );

Profile.hasMany( TechnologyTransfer, {
    as:         'technologyTransfer',
    foreignKey: 'profileId',
    sourceKey:  'profileId',
} );

Title.hasMany( TitleI18n, {
    as:         'titleI18n',
    foreignKey: 'titleId',
    sourceKey:  'titleId',
} );

Profile.hasMany( Title, {
    as:         'title',
    foreignKey: 'profileId',
    sourceKey:  'profileId',
} );

module.exports = {
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
};
