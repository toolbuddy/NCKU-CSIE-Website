import ValidateUtils from 'models/common/utils/validate.js';
import {
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
} from 'models/faculty/operations/associations.js';

import departmentUtils from 'models/faculty/utils/department.js';
import researchGroupUtils from 'models/faculty/utils/research-group.js';
import { faculty, } from 'models/common/utils/connect.js';

export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            profileId = null,
            award = null,
            conference = null,
            department = null,
            education = null,
            experience = null,
            patent = null,
            project = null,
            publication = null,
            researchGroup = null,
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
                for ( const id of award ) {
                    if ( !ValidateUtils.isValidId( id ) ) {
                        const error = new Error( 'Invalid award object' );
                        error.status = 400;
                        throw error;
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
                for ( const id of conference ) {
                    if ( !ValidateUtils.isValidId( id ) ) {
                        const error = new Error( 'Invalid conference object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid conference object' );
                error.status = 400;
                throw error;
            }
        }
        if ( department !== null ) {
            if ( !ValidateUtils.isValidArray( department ) || !department.every( id => departmentUtils.isSupportedId( id ) ) ) {
                const error = new Error( 'Invalid department object' );
                error.status = 400;
                throw error;
            }
        }
        if ( researchGroup !== null ) {
            if ( !ValidateUtils.isValidArray( researchGroup ) || !researchGroup.every( id => researchGroupUtils.isSupportedId( id ) ) ) {
                const error = new Error( 'Invalid researchGroup object' );
                error.status = 400;
                throw error;
            }
        }
        if ( education !== null ) {
            if ( ValidateUtils.isValidArray( education ) ) {
                for ( const id of education ) {
                    if ( !ValidateUtils.isValidId( id ) ) {
                        const error = new Error( 'Invalid education object' );
                        error.status = 400;
                        throw error;
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
                for ( const id of experience ) {
                    if ( !ValidateUtils.isValidId( id ) ) {
                        const error = new Error( 'Invalid experience object' );
                        error.status = 400;
                        throw error;
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
                for ( const id of patent ) {
                    if ( !ValidateUtils.isValidId( id ) ) {
                        const error = new Error( 'Invalid patent object' );
                        error.status = 400;
                        throw error;
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
                for ( const id of project ) {
                    if ( !ValidateUtils.isValidId( id ) ) {
                        const error = new Error( 'Invalid project object' );
                        error.status = 400;
                        throw error;
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
                for ( const id of publication ) {
                    if ( !ValidateUtils.isValidId( id ) ) {
                        const error = new Error( 'Invalid publication object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid publication object' );
                error.status = 400;
                throw error;
            }
        }
        if ( specialtyI18n !== null ) {
            if ( ValidateUtils.isValidArray( specialtyI18n ) ) {
                for ( const id of specialtyI18n ) {
                    if ( !ValidateUtils.isValidId( id ) ) {
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
                for ( const id of student ) {
                    if ( !ValidateUtils.isValidId( id ) ) {
                        const error = new Error( 'Invalid student object' );
                        error.status = 400;
                        throw error;
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
                for ( const id of studentAward ) {
                    if ( !ValidateUtils.isValidId( id ) ) {
                        const error = new Error( 'Invalid studentAward object' );
                        error.status = 400;
                        throw error;
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
                for ( const id of technologyTransfer ) {
                    if ( !ValidateUtils.isValidId( id ) ) {
                        const error = new Error( 'Invalid technologyTransfer object' );
                        error.status = 400;
                        throw error;
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
                for ( const id of technologyTransferPatent ) {
                    if ( !ValidateUtils.isValidId( id ) ) {
                        const error = new Error( 'Invalid technologyTransferPatent object' );
                        error.status = 400;
                        throw error;
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
                for ( const id of title ) {
                    if ( !ValidateUtils.isValidId( id ) ) {
                        const error = new Error( 'Invalid title object' );
                        error.status = 400;
                        throw error;
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
            for ( const id of award ) {
                await faculty.transaction( t => Award.findOne( {
                    where: {
                        profileId,
                        awardId: id,
                    },
                    transaction: t,
                } ).then( ( award ) => {
                    if ( award ) {
                        return AwardI18n.destroy( {
                            where: {
                                awardId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ).then( ( destroyedNum ) => {
                    if ( destroyedNum > 0 ) {
                        return Award.destroy( {
                            where: {
                                profileId,
                                awardId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ) ).catch( ( err ) => {
                    throw err;
                } );
            }
        }
        if ( conference ) {
            for ( const id of conference ) {
                await faculty.transaction( t => Conference.findOne( {
                    where: {
                        profileId,
                        conferenceId: id,
                    },
                    transaction: t,
                } ).then( ( conference ) => {
                    if ( conference ) {
                        return ConferenceI18n.destroy( {
                            where: {
                                conferenceId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ).then( ( destroyedNum ) => {
                    if ( destroyedNum > 0 ) {
                        return Conference.destroy( {
                            where: {
                                profileId,
                                conferenceId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ) ).catch( ( err ) => {
                    throw err;
                } );
            }
        }
        if ( department ) {
            await faculty.transaction( t => Department.destroy( {
                where: {
                    profileId,
                    type: department,
                },
                transaction: t,
            } ) ).catch( ( err ) => {
                throw err;
            } );
        }
        if ( education ) {
            for ( const id of education ) {
                await faculty.transaction( t => Education.findOne( {
                    where: {
                        profileId,
                        educationId: id,
                    },
                    transaction: t,
                } ).then( ( education ) => {
                    if ( education ) {
                        return EducationI18n.destroy( {
                            where: {
                                educationId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ).then( ( destroyedNum ) => {
                    if ( destroyedNum > 0 ) {
                        return Education.destroy( {
                            where: {
                                profileId,
                                educationId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ) ).catch( ( err ) => {
                    throw err;
                } );
            }
        }
        if ( experience ) {
            for ( const id of experience ) {
                await faculty.transaction( t => Experience.findOne( {
                    where: {
                        profileId,
                        experienceId: id,
                    },
                    transaction: t,
                } ).then( ( experience ) => {
                    if ( experience ) {
                        return ExperienceI18n.destroy( {
                            where: {
                                experienceId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ).then( ( destroyedNum ) => {
                    if ( destroyedNum > 0 ) {
                        return Experience.destroy( {
                            where: {
                                profileId,
                                experienceId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ) ).catch( ( err ) => {
                    throw err;
                } );
            }
        }
        if ( patent ) {
            for ( const id of patent ) {
                await faculty.transaction( t => Patent.findOne( {
                    where: {
                        profileId,
                        patentId: id,
                    },
                    transaction: t,
                } ).then( ( patent ) => {
                    if ( patent ) {
                        return PatentI18n.destroy( {
                            where: {
                                patentId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ).then( ( destroyedNum ) => {
                    if ( destroyedNum > 0 ) {
                        return Patent.destroy( {
                            where: {
                                profileId,
                                patentId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ) ).catch( ( err ) => {
                    throw err;
                } );
            }
        }
        if ( project ) {
            for ( const id of project ) {
                await faculty.transaction( t => Project.findOne( {
                    where: {
                        profileId,
                        projectId: id,
                    },
                    transaction: t,
                } ).then( ( project ) => {
                    if ( project ) {
                        return ProjectI18n.destroy( {
                            where: {
                                projectId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ).then( ( destroyedNum ) => {
                    if ( destroyedNum > 0 ) {
                        return Project.destroy( {
                            where: {
                                profileId,
                                projectId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ) ).catch( ( err ) => {
                    throw err;
                } );
            }
        }
        if ( publication ) {
            for ( const id of publication ) {
                await faculty.transaction( t => Publication.findOne( {
                    where: {
                        profileId,
                        publicationId: id,
                    },
                    transaction: t,
                } ).then( ( publication ) => {
                    if ( publication ) {
                        return PublicationI18n.destroy( {
                            where: {
                                publicationId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ).then( ( destroyedNum ) => {
                    if ( destroyedNum > 0 ) {
                        return Publication.destroy( {
                            where: {
                                profileId,
                                publicationId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ) ).catch( ( err ) => {
                    throw err;
                } );
            }
        }
        if ( researchGroup ) {
            await faculty.transaction( t => ResearchGroup.destroy( {
                where: {
                    profileId,
                    type: researchGroup,
                },
                transaction: t,
            } ) ).catch( ( err ) => {
                throw err;
            } );
        }
        if ( specialtyI18n ) {
            await faculty.transaction( t => SpecialtyI18n.destroy( {
                where: {
                    profileId,
                    specialtyId: specialtyI18n,
                },
                transaction: t,
            } ) ).catch( ( err ) => {
                throw err;
            } );
        }
        if ( student ) {
            for ( const id of student ) {
                await faculty.transaction( t => Student.findOne( {
                    where: {
                        studentId: id,
                    },
                    transaction: t,
                } ).then( ( student ) => {
                    if ( student ) {
                        return StudentI18n.destroy( {
                            where: {
                                studentId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ).then( ( destroyedNum ) => {
                    if ( destroyedNum > 0 ) {
                        return Student.destroy( {
                            where: {
                                studentId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ) ).catch( ( err ) => {
                    throw err;
                } );
            }
        }
        if ( studentAward ) {
            for ( const id of studentAward ) {
                await faculty.transaction( t => StudentAward.findOne( {
                    where: {
                        profileId,
                        studentAwardId: id,
                    },
                    transaction: t,
                } ).then( ( studentAward ) => {
                    if ( studentAward ) {
                        return Student.findAll( {
                            where: {
                                studentAwardId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ).then( ( students ) => {
                    if ( students ) {
                        return Promise.all(
                            students.map(
                                student => StudentI18n.destroy( {
                                    where: {
                                        studentId: student.studentId,
                                    },
                                    transaction: t,
                                } )
                            )
                        );
                    }
                } ).then( () => Student.destroy( {
                    where: {
                        studentAwardId: id,
                    },
                    transaction: t,
                } ) ).then( () => StudentAwardI18n.destroy( {
                    where: {
                        studentAwardId: id,
                    },
                    transaction: t,
                } ) ).then( ( destroyedNum ) => {
                    if ( destroyedNum > 0 ) {
                        return StudentAward.destroy( {
                            where: {
                                profileId,
                                studentAwardId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ) ).catch( ( err ) => {
                    throw err;
                } );
            }
        }
        if ( technologyTransferPatent ) {
            for ( const id of technologyTransferPatent ) {
                await faculty.transaction( t => TechnologyTransferPatent.findOne( {
                    where: {
                        technologyTransferPatentId: id,
                    },
                    transaction: t,
                } ).then( ( technologyTransferPatent ) => {
                    if ( technologyTransferPatent ) {
                        return TechnologyTransferPatentI18n.destroy( {
                            where: {
                                technologyTransferPatentId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ).then( ( destroyedNum ) => {
                    if ( destroyedNum > 0 ) {
                        return TechnologyTransferPatent.destroy( {
                            where: {
                                technologyTransferPatentId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ) ).catch( ( err ) => {
                    throw err;
                } );
            }
        }
        if ( technologyTransfer ) {
            for ( const id of technologyTransfer ) {
                await faculty.transaction( t => TechnologyTransfer.findOne( {
                    where: {
                        profileId,
                        technologyTransferId: id,
                    },
                    transaction: t,
                } ).then( ( tech ) => {
                    if ( tech ) {
                        return TechnologyTransferPatent.findAll( {
                            where: {
                                technologyTransferId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ).then( ( technologyTransferPatents ) => {
                    if ( technologyTransferPatents ) {
                        return Promise.all(
                            technologyTransferPatents.map(
                                technologyTransferPatent => TechnologyTransferPatentI18n.destroy( {
                                    where: {
                                        technologyTransferPatentId: technologyTransferPatent.technologyTransferPatentId,
                                    },
                                    transaction: t,
                                } )
                            )
                        );
                    }
                } ).then( () => TechnologyTransferPatent.destroy( {
                    where: {
                        technologyTransferId: id,
                    },
                    transaction: t,
                } ) ).then( () => TechnologyTransferI18n.destroy( {
                    where: {
                        technologyTransferId: id,
                    },
                    transaction: t,
                } ) ).then( ( destroyedNum ) => {
                    if ( destroyedNum > 0 ) {
                        return TechnologyTransfer.destroy( {
                            where: {
                                profileId,
                                technologyTransferId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ) ).catch( ( err ) => {
                    throw err;
                } );
            }
        }
        if ( title ) {
            for ( const id of title ) {
                await faculty.transaction( t => Title.findOne( {
                    where: {
                        profileId,
                        titleId: id,
                    },
                    transaction: t,
                } ).then( ( title ) => {
                    if ( title ) {
                        return TitleI18n.destroy( {
                            where: {
                                titleId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ).then( ( destroyedNum ) => {
                    if ( destroyedNum > 0 ) {
                        return Title.destroy( {
                            where: {
                                profileId,
                                titleId: id,
                            },
                            transaction: t,
                        } );
                    }
                } ) ).catch( ( err ) => {
                    throw err;
                } );
            }
        }
        return;
    }
    catch ( err ) {
        throw err;
    }
};
