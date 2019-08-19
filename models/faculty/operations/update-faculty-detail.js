import ValidateUtils from 'models/common/utils/validate.js';
import {
    AwardI18n,
    Award,
    ConferenceI18n,
    Conference,
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
    SpecialtyI18n,
    StudentAwardI18n,
    StudentAward,
    StudentI18n,
    Student,
    TechnologyTransferPatent,
    TechnologyTransferPatentI18n,
    TechnologyTransferI18n,
    TechnologyTransfer,
    Title,
    TitleI18n,
} from 'models/faculty/operations/associations.js';
import AwardValidationConstraints from 'models/faculty/constraints/update/award.js';
import AwardI18nValidationConstraints from 'models/faculty/constraints/update/award-i18n.js';
import ConferenceValidationConstraints from 'models/faculty/constraints/update/conference.js';
import ConferenceI18nValidationConstraints from 'models/faculty/constraints/update/conference-i18n.js';
import EducationValidationConstraints from 'models/faculty/constraints/update/education.js';
import EducationI18nValidationConstraints from 'models/faculty/constraints/update/education-i18n.js';
import ExperienceValidationConstraints from 'models/faculty/constraints/update/experience.js';
import ExperienceI18nValidationConstraints from 'models/faculty/constraints/update/experience-i18n.js';
import PatentValidationConstraints from 'models/faculty/constraints/update/patent.js';
import PatentI18nValidationConstraints from 'models/faculty/constraints/update/patent-i18n.js';
import ProfileValidationConstraints from 'models/faculty/constraints/update/profile.js';
import ProfileI18nValidationConstraints from 'models/faculty/constraints/update/profile-i18n.js';
import ProjectValidationConstraints from 'models/faculty/constraints/update/project.js';
import ProjectI18nValidationConstraints from 'models/faculty/constraints/update/project-i18n.js';
import PublicationValidationConstraints from 'models/faculty/constraints/update/publication.js';
import PublicationI18nValidationConstraints from 'models/faculty/constraints/update/publication-i18n.js';
import SpecialtyI18nValidationConstraints from 'models/faculty/constraints/update/specialty-i18n.js';
import StudentValidationConstraints from 'models/faculty/constraints/update/student.js';
import StudentI18nValidationConstraints from 'models/faculty/constraints/update/student-i18n.js';
import StudentAwardValidationConstraints from 'models/faculty/constraints/update/student-award.js';
import StudentAwardI18nValidationConstraints from 'models/faculty/constraints/update/student-award-i18n.js';
import TechnologyTransferValidationConstraints from 'models/faculty/constraints/update/technology-transfer.js';
import TechnologyTransferI18nValidationConstraints from 'models/faculty/constraints/update/technology-transfer-i18n.js';
import TechnologyTransferPatentValidationConstraints from 'models/faculty/constraints/update/technology-transfer-patent.js';
import TechnologyTransferPatentI18nValidationConstraints from 'models/faculty/constraints/update/technology-transfer-patent-i18n.js';
import TitleValidationConstraints from 'models/faculty/constraints/update/title.js';
import TitleI18nValidationConstraints from 'models/faculty/constraints/update/title-i18n.js';
import validate from 'validate.js';
import { faculty, } from 'models/common/utils/connect.js';

export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            profileId = null,
            award = null,
            conference = null,
            education = null,
            experience = null,
            patent = null,
            project = null,
            publication = null,
            profile = null,
            specialtyI18n = null,
            student = null,
            studentAward = null,
            technologyTransfer = null,
            technologyTransferPatent = null,
            title = null,
        } = opt;

        if ( !ValidateUtils.isValidId( profileId ) ) {
            const error = new Error( 'Invalid profile id' );
            error.status = 400;
            throw error;
        }

        if ( award !== null ) {
            if ( ValidateUtils.isValidArray( award ) ) {
                for ( const data of award ) {
                    if ( typeof ( validate( data, AwardValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid award object' );
                        error.status = 400;
                        throw error;
                    }
                    if ( data.i18n ) {
                        for ( const i18nData of data.i18n ) {
                            if ( typeof ( validate( i18nData, AwardI18nValidationConstraints ) ) !== 'undefined' ) {
                                const error = new Error( 'Invalid award object' );
                                error.status = 400;
                                throw error;
                            }
                        }
                    }
                }
            }
            else {
                const error = new Error( 'Invalid award object' );
                error.status = 400;
                throw error;
            }
        }
        if ( conference !== null ) {
            if ( ValidateUtils.isValidArray( conference ) ) {
                for ( const data of conference ) {
                    if ( typeof ( validate( data, ConferenceValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid conference object' );
                        error.status = 400;
                        throw error;
                    }
                    if ( data.i18n ) {
                        for ( const i18nData of data.i18n ) {
                            if ( typeof ( validate( i18nData, ConferenceI18nValidationConstraints ) ) !== 'undefined' ) {
                                const error = new Error( 'Invalid conferenceI18n object' );
                                error.status = 400;
                                throw error;
                            }
                        }
                    }
                }
            }
            else {
                const error = new Error( 'Invalid conference object' );
                error.status = 400;
                throw error;
            }
        }
        if ( education !== null ) {
            if ( ValidateUtils.isValidArray( education ) ) {
                for ( const data of education ) {
                    if ( typeof ( validate( data, EducationValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid education object' );
                        error.status = 400;
                        throw error;
                    }
                    if ( data.i18n ) {
                        for ( const i18nData of data.i18n ) {
                            if ( typeof ( validate( i18nData, EducationI18nValidationConstraints ) ) !== 'undefined' ) {
                                const error = new Error( 'Invalid educationI18n object' );
                                error.status = 400;
                                throw error;
                            }
                        }
                    }
                }
            }
            else {
                const error = new Error( 'Invalid education object' );
                error.status = 400;
                throw error;
            }
        }
        if ( experience !== null ) {
            if ( ValidateUtils.isValidArray( experience ) ) {
                for ( const data of experience ) {
                    if ( typeof ( validate( data, ExperienceValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid experience object' );
                        error.status = 400;
                        throw error;
                    }
                    if ( data.i18n ) {
                        for ( const i18nData of data.i18n ) {
                            if ( typeof ( validate( i18nData, ExperienceI18nValidationConstraints ) ) !== 'undefined' ) {
                                const error = new Error( 'Invalid experienceI18n object' );
                                error.status = 400;
                                throw error;
                            }
                        }
                    }
                }
            }
            else {
                const error = new Error( 'Invalid experience object' );
                error.status = 400;
                throw error;
            }
        }
        if ( patent !== null ) {
            if ( ValidateUtils.isValidArray( patent ) ) {
                for ( const data of patent ) {
                    if ( typeof ( validate( data, PatentValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid patent object' );
                        error.status = 400;
                        throw error;
                    }
                    if ( data.i18n ) {
                        for ( const i18nData of data.i18n ) {
                            if ( typeof ( validate( i18nData, PatentI18nValidationConstraints ) ) !== 'undefined' ) {
                                const error = new Error( 'Invalid patentI18n object' );
                                error.status = 400;
                                throw error;
                            }
                        }
                    }
                }
            }
            else {
                const error = new Error( 'Invalid patent object' );
                error.status = 400;
                throw error;
            }
        }
        if ( project !== null ) {
            if ( ValidateUtils.isValidArray( project ) ) {
                for ( const data of project ) {
                    if ( typeof ( validate( data, ProjectValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid project object' );
                        error.status = 400;
                        throw error;
                    }
                    if ( data.i18n ) {
                        for ( const i18nData of data.i18n ) {
                            if ( typeof ( validate( i18nData, ProjectI18nValidationConstraints ) ) !== 'undefined' ) {
                                const error = new Error( 'Invalid projectI18n object' );
                                error.status = 400;
                                throw error;
                            }
                        }
                    }
                }
            }
            else {
                const error = new Error( 'Invalid project object' );
                error.status = 400;
                throw error;
            }
        }
        if ( publication !== null ) {
            if ( ValidateUtils.isValidArray( publication ) ) {
                for ( const data of publication ) {
                    if ( typeof ( validate( data, PublicationValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid publication object' );
                        error.status = 400;
                        throw error;
                    }
                    if ( data.i18n ) {
                        for ( const i18nData of data.i18n ) {
                            if ( typeof ( validate( i18nData, PublicationI18nValidationConstraints ) ) !== 'undefined' ) {
                                const error = new Error( 'Invalid publicationI18n object' );
                                error.status = 400;
                                throw error;
                            }
                        }
                    }
                }
            }
            else {
                const error = new Error( 'Invalid publication object' );
                error.status = 400;
                throw error;
            }
        }
        if ( profile !== null ) {
            if ( typeof ( validate( profile, ProfileValidationConstraints ) ) !== 'undefined' ) {
                const error = new Error( 'Invalid profile object' );
                error.status = 400;
                throw error;
            }
            if ( profile.i18n ) {
                for ( const i18nData of profile.i18n ) {
                    if ( typeof ( validate( i18nData, ProfileI18nValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid profile object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
        }
        if ( specialtyI18n !== null ) {
            if ( ValidateUtils.isValidArray( specialtyI18n ) ) {
                for ( const data of specialtyI18n ) {
                    if ( typeof ( validate( data, SpecialtyI18nValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid specialtyI18n object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid specialtyI18n object' );
                error.status = 400;
                throw error;
            }
        }
        if ( student !== null ) {
            if ( ValidateUtils.isValidArray( student ) ) {
                for ( const data of student ) {
                    if ( typeof ( validate( data, StudentValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid student object' );
                        error.status = 400;
                        throw error;
                    }
                    if ( data.i18n ) {
                        for ( const i18nData of data.i18n ) {
                            if ( typeof ( validate( i18nData, StudentI18nValidationConstraints ) ) !== 'undefined' ) {
                                const error = new Error( 'Invalid student object' );
                                error.status = 400;
                                throw error;
                            }
                        }
                    }
                }
            }
            else {
                const error = new Error( 'Invalid student object' );
                error.status = 400;
                throw error;
            }
        }
        if ( studentAward !== null ) {
            if ( ValidateUtils.isValidArray( studentAward ) ) {
                for ( const data of studentAward ) {
                    if ( typeof ( validate( data, StudentAwardValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid studentAward object' );
                        error.status = 400;
                        throw error;
                    }
                    if ( data.i18n ) {
                        for ( const i18nData of data.i18n ) {
                            if ( typeof ( validate( i18nData, StudentAwardI18nValidationConstraints ) ) !== 'undefined' ) {
                                const error = new Error( 'Invalid studentAward object' );
                                error.status = 400;
                                throw error;
                            }
                        }
                    }
                }
            }
            else {
                const error = new Error( 'Invalid studentAward object' );
                error.status = 400;
                throw error;
            }
        }
        if ( technologyTransfer !== null ) {
            if ( ValidateUtils.isValidArray( technologyTransfer ) ) {
                for ( const data of technologyTransfer ) {
                    if ( typeof ( validate( data, TechnologyTransferValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid technologyTransfer object' );
                        error.status = 400;
                        throw error;
                    }
                    if ( data.i18n ) {
                        for ( const i18nData of data.i18n ) {
                            if ( typeof ( validate( i18nData, TechnologyTransferI18nValidationConstraints ) ) !== 'undefined' ) {
                                const error = new Error( 'Invalid technologyTransfer object' );
                                error.status = 400;
                                throw error;
                            }
                        }
                    }
                }
            }
            else {
                const error = new Error( 'Invalid technologyTransfer object' );
                error.status = 400;
                throw error;
            }
        }
        if ( technologyTransferPatent !== null ) {
            if ( ValidateUtils.isValidArray( technologyTransferPatent ) ) {
                for ( const data of technologyTransferPatent ) {
                    if ( typeof ( validate( data, TechnologyTransferPatentValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid technologyTransferPatent object' );
                        error.status = 400;
                        throw error;
                    }
                    if ( data.i18n ) {
                        for ( const i18nData of data.i18n ) {
                            if ( typeof ( validate( i18nData, TechnologyTransferPatentI18nValidationConstraints ) ) !== 'undefined' ) {
                                const error = new Error( 'Invalid technologyTransferPatent object' );
                                error.status = 400;
                                throw error;
                            }
                        }
                    }
                }
            }
            else {
                const error = new Error( 'Invalid technologyTransferPatent object' );
                error.status = 400;
                throw error;
            }
        }
        if ( title !== null ) {
            if ( ValidateUtils.isValidArray( title ) ) {
                for ( const data of title ) {
                    if ( typeof ( validate( data, TitleValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid title object' );
                        error.status = 400;
                        throw error;
                    }
                    if ( data.i18n ) {
                        for ( const i18nData of data.i18n ) {
                            if ( typeof ( validate( i18nData, TitleI18nValidationConstraints ) ) !== 'undefined' ) {
                                const error = new Error( 'Invalid title object' );
                                error.status = 400;
                                throw error;
                            }
                        }
                    }
                }
            }
            else {
                const error = new Error( 'Invalid title object' );
                error.status = 400;
                throw error;
            }
        }

        if ( award ) {
            for ( const awardInfo of award ) {
                await faculty.transaction( t => Award.update( {
                    receivedYear:    awardInfo.receivedYear,
                }, {
                    where: {
                        awardId: awardInfo.awardId,
                        profileId,
                    },
                    transaction: t,
                } ).then( () => {
                    if ( awardInfo.i18n ) {
                        return Promise.all( awardInfo.i18n.map( awardI18nInfo => AwardI18n.update( {
                            award:  awardI18nInfo.award,
                        }, {
                            where: {
                                awardId:  awardInfo.awardId,
                                language: awardI18nInfo.language,
                            },
                            transaction: t,
                        } ) ) );
                    }
                } ) );
            }
        }
        if ( conference ) {
            for ( const conferenceInfo of conference ) {
                await faculty.transaction( t => Conference.update( {
                    hostYear:    conferenceInfo.hostYear,
                }, {
                    where: {
                        conferenceId: conferenceInfo.conferenceId,
                        profileId,
                    },
                    transaction: t,
                } ).then( () => {
                    if ( conferenceInfo.i18n ) {
                        return Promise.all( conferenceInfo.i18n.map( conferenceI18nInfo => ConferenceI18n.update( {
                            conference: conferenceI18nInfo.conference,
                            title:      conferenceI18nInfo.title,
                        }, {
                            where: {
                                conferenceId:  conferenceInfo.conferenceId,
                                language:     conferenceI18nInfo.language,
                            },
                            transaction: t,
                        } ) ) );
                    }
                } ) );
            }
        }
        if ( education ) {
            for ( const educationInfo of education ) {
                await faculty.transaction( t => Education.update( {
                    nation: educationInfo.nation,
                    degree: educationInfo.degree,
                    from:   educationInfo.from,
                    to:     educationInfo.to,
                }, {
                    where: {
                        educationId: educationInfo.educationId,
                        profileId,
                    },
                    transaction: t,
                } ).then( () => {
                    if ( educationInfo.i18n ) {
                        return Promise.all( educationInfo.i18n.map( educationI18nInfo => EducationI18n.update( {
                            school: educationI18nInfo.school,
                            major:  educationI18nInfo.major,
                        }, {
                            where: {
                                educationId: educationInfo.educationId,
                                language:    educationI18nInfo.language,
                            },
                            transaction: t,
                        } ) ) );
                    }
                } ) );
            }
        }
        if ( experience ) {
            for ( const experienceInfo of experience ) {
                await faculty.transaction( t => Experience.update( {
                    from: experienceInfo.from,
                    to:   experienceInfo.to,
                }, {
                    where: {
                        experienceId: experienceInfo.experienceId,
                        profileId,
                    },
                    transaction: t,
                } ).then( () => {
                    if ( experienceInfo.i18n ) {
                        return Promise.all( experienceInfo.i18n.map( experienceI18nInfo => ExperienceI18n.update( {
                            organization: experienceI18nInfo.organization,
                            department:   experienceI18nInfo.department,
                            title:        experienceI18nInfo.title,
                        }, {
                            where: {
                                experienceId: experienceInfo.experienceId,
                                language:     experienceI18nInfo.language,
                            },
                            transaction: t,
                        } ) ) );
                    }
                } ) );
            }
        }
        if ( patent ) {
            for ( const patentInfo of patent ) {
                await faculty.transaction( t => Patent.update( {
                    nation:              patentInfo.nation,
                    certificationNumber: patentInfo.certificationNumber,
                    applicationDate:     patentInfo.applicationDate,
                    issueDate:           patentInfo.issueDate,
                    expireDate:          patentInfo.expireDate,
                }, {
                    where: {
                        patentId: patentInfo.patentId,
                        profileId,
                    },
                    transaction: t,
                } ).then( () => {
                    if ( patentInfo.i18n ) {
                        return Promise.all( patentInfo.i18n.map( patentI18nInfo => PatentI18n.update( {
                            inventor:    patentI18nInfo.inventor,
                            patentOwner: patentI18nInfo.patentOwner,
                            patent:      patentI18nInfo.patent,
                        }, {
                            where: {
                                patentId: patentInfo.patentId,
                                language: patentI18nInfo.language,
                            },
                            transaction: t,
                        } ) ) );
                    }
                } ) );
            }
        }
        if ( project ) {
            for ( const projectInfo of project ) {
                await faculty.transaction( t => Project.update( {
                    from:     projectInfo.from,
                    to:       projectInfo.to,
                    category: projectInfo.category,
                }, {
                    where: {
                        projectId: projectInfo.projectId,
                        profileId,
                    },
                    transaction: t,
                } ).then( () => {
                    if ( projectInfo.i18n ) {
                        return Promise.all( projectInfo.i18n.map( projectI18nInfo => ProjectI18n.update( {
                            name:    projectI18nInfo.name,
                            support: projectI18nInfo.support,
                        }, {
                            where: {
                                projectId: projectInfo.projectId,
                                language:  projectI18nInfo.language,
                            },
                            transaction: t,
                        } ) ) );
                    }
                } ) );
            }
        }
        if ( publication ) {
            for ( const publicationInfo of publication ) {
                await faculty.transaction( t => Publication.update( {
                    issueYear:     publicationInfo.issueYear,
                    category:      publicationInfo.category,
                    international:     publicationInfo.international,
                    refereed:      publicationInfo.refereed,
                    issueMonth:     publicationInfo.issueMonth,
                }, {
                    where: {
                        publicationId: publicationInfo.publicationId,
                        profileId,
                    },
                    transaction: t,
                } ).then( () => {
                    if ( publicationInfo.i18n ) {
                        return Promise.all( publicationInfo.i18n.map( publicationI18nInfo => PublicationI18n.update( {
                            title:    publicationI18nInfo.title,
                            authors:  publicationI18nInfo.authors,
                        }, {
                            where: {
                                publicationId: publicationInfo.publicationId,
                                language:      publicationI18nInfo.language,
                            },
                            transaction: t,
                        } ) ) );
                    }
                } ) );
            }
        }
        if ( profile ) {
            await faculty.transaction( t => Profile.update( {
                fax:         profile.fax,
                email:       profile.email,
                personalWeb: profile.personalWeb,
                nation:      profile.nation,
                photo:       profile.photo, // ???
                officeTel:   profile.officeTel,
                labTel:      profile.labTel,
                labWeb:      profile.labWeb,
                order:       profile.order,
            }, {
                where: {
                    profileId,
                },
                transaction: t,
            } ).then( () => {
                if ( profile.i18n ) {
                    return Promise.all( profile.i18n.map( profileI18nInfo => ProfileI18n.update( {
                        name:          profileI18nInfo.name,
                        officeAddress: profileI18nInfo.officeAddress,
                        labName:       profileI18nInfo.labName,
                        labAddress:    profileI18nInfo.labAddress,
                    }, {
                        where: {
                            language: profileI18nInfo.language,
                            profileId,
                        },
                        transaction: t,
                    } ) ) );
                }
            } ) );
        }
        if ( specialtyI18n ) {
            for ( const specialtyInfo of specialtyI18n ) {
                await faculty.transaction( t => SpecialtyI18n.update( {
                    specialty: specialtyInfo.specialty,
                }, {
                    where: {
                        specialtyId:   specialtyInfo.specialtyId,
                        profileId,
                        language:    specialtyInfo.language,
                    },
                    transaction: t,
                } ) );
            }
        }
        if ( student ) {
            for ( const studentInfo of student ) {
                await faculty.transaction( t => Student.findOne( {
                    where: {
                        studentId: studentInfo.studentId,
                    },
                    transaction: t,
                } ).then( ( result ) => {
                    if ( result ) {
                        return StudentAward.findOne( {
                            where: {
                                studentAwardId: result.studentAwardId,
                                profileId,
                            },
                            transaction: t,
                        } );
                    }
                } ).then( ( result ) => {
                    if ( result ) {
                        return Student.update( {
                            degree:     studentInfo.degree,
                        }, {
                            where: {
                                studentId:      studentInfo.studentId,
                                studentAwardId: result.studentAwardId,
                            },
                            transaction: t,
                        } );
                    }
                } ).then( () => {
                    if ( studentInfo.i18n ) {
                        return Promise.all( studentInfo.i18n.map( studentI18nInfo => StudentI18n.update( {
                            name:    studentI18nInfo.name,
                        }, {
                            where: {
                                studentId: studentInfo.studentId,
                                language:  studentI18nInfo.language,
                            },
                            transaction: t,
                        } ) ) );
                    }
                } ) );
            }
        }
        if ( studentAward ) {
            for ( const studentAwardInfo of studentAward ) {
                await faculty.transaction( t => StudentAward.update( {
                    receivedYear:     studentAwardInfo.receivedYear,
                }, {
                    where: {
                        studentAwardId: studentAwardInfo.studentAwardId,
                        profileId,
                    },
                    transaction: t,
                } ).then( () => {
                    if ( studentAwardInfo.i18n ) {
                        return Promise.all( studentAwardInfo.i18n.map( studentAwardI18nInfo => StudentAwardI18n.update( {
                            award:    studentAwardI18nInfo.award,
                        }, {
                            where: {
                                studentAwardId: studentAwardInfo.studentAwardId,
                                language:       studentAwardI18nInfo.language,
                            },
                            transaction: t,
                        } ) ) );
                    }
                } ) );
            }
        }
        if ( technologyTransfer ) {
            for ( const technologyTransferInfo of technologyTransfer ) {
                await faculty.transaction( t => TechnologyTransfer.update( {
                    from: technologyTransferInfo.from,
                    to:   technologyTransferInfo.to,
                }, {
                    where: {
                        technologyTransferId: technologyTransferInfo.technologyTransferId,
                        profileId,
                    },
                    transaction: t,
                } ).then( () => {
                    if ( technologyTransferInfo.i18n ) {
                        return Promise.all( technologyTransferInfo.i18n.map( technologyTransferI18nInfo => TechnologyTransferI18n.update( {
                            technology:       technologyTransferI18nInfo.technology,
                            authorizingParty: technologyTransferI18nInfo.authorizingParty,
                            authorizedParty:  technologyTransferI18nInfo.authorizedParty,
                        }, {
                            where: {
                                technologyTransferId: technologyTransferInfo.technologyTransferId,
                                language:             technologyTransferI18nInfo.language,
                            },
                            transaction: t,
                        } ) ) );
                    }
                } ) );
            }
        }
        if ( technologyTransferPatent ) {
            for ( const technologyTransferPatentInfo of technologyTransferPatent ) {
                await faculty.transaction( t => TechnologyTransferPatent.findOne( {
                    where: {
                        technologyTransferPatentId: technologyTransferPatentInfo.technologyTransferPatentId,
                    },
                    transaction: t,
                } ).then( ( result ) => {
                    if ( result ) {
                        return TechnologyTransfer.findOne( {
                            where: {
                                technologyTransferId: result.technologyTransferId,
                                profileId,
                            },
                            transaction: t,
                        } );
                    }
                } ).then( ( result ) => {
                    if ( result && technologyTransferPatentInfo.i18n ) {
                        return Promise.all( technologyTransferPatentInfo.i18n.map( technologyTransferPatentI18nInfo => TechnologyTransferPatentI18n.update( {
                            patent:    technologyTransferPatentI18nInfo.patent,
                        }, {
                            where: {
                                technologyTransferPatentId: technologyTransferPatentInfo.technologyTransferPatentId,
                                language:                   technologyTransferPatentI18nInfo.language,
                            },
                            transaction: t,
                        } ) ) );
                    }
                } ) );
            }
        }
        if ( title ) {
            for ( const titleInfo of title ) {
                await faculty.transaction( t => Title.update( {
                    from: titleInfo.from,
                    to:   titleInfo.to,
                }, {
                    where: {
                        titleId:   titleInfo.titleId,
                        profileId,
                    },
                    transaction: t,
                } ).then( () => {
                    if ( titleInfo.i18n ) {
                        return Promise.all( titleInfo.i18n.map( titleI18nInfo => TitleI18n.update( {
                            title: titleI18nInfo.title,
                        }, {
                            where: {
                                titleId:  titleInfo.titleId,
                                language: titleI18nInfo.language,
                            },
                            transaction: t,
                        } ) ) );
                    }
                } ) );
            }
        }
        return;
    }
    catch ( err ) {
        throw err;
    }
};
