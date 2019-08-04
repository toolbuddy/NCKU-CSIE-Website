import ValidateUtils from 'models/common/utils/validate.js';
import {
    Department,
    EducationI18n,
    Education,
    ExperienceI18n,
    Experience,
    ResearchGroup,
    SpecialtyI18n,
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
            department = null,
            education = null,
            experience = null,
            researchGroup = null,
            specialtyI18n = null,
            title = null,
        } = opt;

        if ( !ValidateUtils.isValidId( profileId ) ) {
            const error = new Error( 'Invalid profile id' );
            error.status = 400;
            throw error;
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
        if ( title ) {
            for ( const id of title ) {
                await faculty.transaction( t => Title.findOne( {
                    where: {
                        profileId,
                        titleId: id,
                    },
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
