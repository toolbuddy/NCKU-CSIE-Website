import AwardI18n from 'models/faculty/schemas/award-i18n.js';
import Award from 'models/faculty/schemas/award.js';
import ConferenceI18n from 'models/faculty/schemas/conference-i18n.js';
import Conference from 'models/faculty/schemas/conference.js';
import Department from 'models/faculty/schemas/department.js';
import EducationI18n from 'models/faculty/schemas/education-i18n.js';
import Education from  'models/faculty/schemas/education.js';
import ExperienceI18n from 'models/faculty/schemas/experience-i18n.js';
import Experience from 'models/faculty/schemas/experience.js';
import PatentI18n from 'models/faculty/schemas/patent-i18n.js';
import Patent from 'models/faculty/schemas/patent.js';
import ProfileI18n from 'models/faculty/schemas/profile-i18n.js';
import Profile from 'models/faculty/schemas/profile.js';
import ProjectI18n from 'models/faculty/schemas/project-i18n.js';
import Project from 'models/faculty/schemas/project.js';
import PublicationI18n from 'models/faculty/schemas/publication-i18n.js';
import Publication from 'models/faculty/schemas/publication.js';
import ResearchGroup from 'models/faculty/schemas/research-group.js';
import SpecialtyI18n from 'models/faculty/schemas/specialty-i18n.js';
import StudentAwardI18n from 'models/faculty/schemas/student-award-i18n.js';
import StudentAward from 'models/faculty/schemas/student-award.js';
import StudentI18n from 'models/faculty/schemas/student-i18n.js';
import Student from 'models/faculty/schemas/student.js';
import TechnologyTransferI18n from 'models/faculty/schemas/technology-transfer-i18n.js';
import TechnologyTransfer from 'models/faculty/schemas/technology-transfer.js';
import TechnologyTransferPatentI18n from 'models/faculty/schemas/technology-transfer-patent-i18n.js';
import TechnologyTransferPatent from 'models/faculty/schemas/technology-transfer-patent.js';
import TitleI18n from 'models/faculty/schemas/title-i18n.js';
import Title from 'models/faculty/schemas/title.js';

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

Profile.hasMany( SpecialtyI18n, {
    as:         'specialtyI18n',
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

export {
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

export default {
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
