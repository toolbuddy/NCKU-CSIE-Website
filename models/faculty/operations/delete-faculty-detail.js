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
            await Department.destroy( {
                where: {
                    profileId,
                    type: department,
                },
            } );
        }
        if ( education ) {
            for ( const id of education ) {
                await Education.findOne( {
                    where: {
                        profileId,
                        educationId: id,
                    },
                } ).then( async () => {
                    await EducationI18n.destroy( {
                        where: {
                            educationId: id,
                        },
                    } );
                } ).then( async () => {
                    await Education.destroy( {
                        where: {
                            profileId,
                            educationId: id,
                        },
                    } );
                } );
            }
        }
        if ( experience ) {
            for ( const id of experience ) {
                await Experience.findOne( {
                    where: {
                        profileId,
                        experienceId: id,
                    },
                } ).then( async () => {
                    await ExperienceI18n.destroy( {
                        where: {
                            experienceId: id,
                        },
                    } );
                } ).then( async () => {
                    await Experience.destroy( {
                        where: {
                            profileId,
                            experienceId: id,
                        },
                    } );
                } );
            }
        }
        if ( researchGroup ) {
            await ResearchGroup.destroy( {
                where: {
                    profileId,
                    type: researchGroup,
                },
            } );
        }
        if ( specialtyI18n ) {
            await SpecialtyI18n.destroy( {
                where: {
                    profileId,
                    specialtyId: specialtyI18n,
                },
            } );
        }
        if ( title ) {
            for ( const id of title ) {
                await Title.findOne( {
                    where: {
                        profileId,
                        titleId: id,
                    },
                } ).then( async () => {
                    await TitleI18n.destroy( {
                        where: {
                            titleId: id,
                        },
                    } );
                } ).then( async () => {
                    await Title.destroy( {
                        where: {
                            profileId,
                            titleId: id,
                        },
                    } );
                } );
            }
        }
        return;
    }
    catch ( err ) {
        throw err;
    }
};
