import ValidateUtils from 'models/common/utils/validate.js';
import {
    BusinessI18n,
    TitleI18n,
} from 'models/staff/operations/associations.js';

export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            profileId = null,
            businessI18n = null,
            titleI18n = null,
        } = opt;

        if ( !ValidateUtils.isValidId( profileId ) ) {
            const error = new Error( 'Invalid profile id' );
            error.status = 400;
            throw error;
        }
        if ( businessI18n !== null ) {
            if ( ValidateUtils.isValidArray( businessI18n ) ) {
                for ( const id of businessI18n ) {
                    if ( !ValidateUtils.isValidId( id ) ) {
                        const error = new Error( 'Invalid businessI18n object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid businessI18n object' );
                error.status = 400;
                throw error;
            }
        }
        if ( titleI18n !== null ) {
            if ( ValidateUtils.isValidArray( titleI18n ) ) {
                for ( const id of titleI18n ) {
                    if ( !ValidateUtils.isValidId( id ) ) {
                        const error = new Error( 'Invalid titleI18n object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid titleI18n object' );
                error.status = 400;
                throw error;
            }
        }

        if ( businessI18n ) {
            for ( const id of businessI18n ) {
                await faculty.transaction( t => BusinessI18n.destroy( {
                    where: {
                        profileId,
                        businessId: id,
                    },
                    transaction: t,
                } ) ).catch( ( err ) => {
                    throw err;
                } );
            }
        }

        if ( titleI18n ) {
            for ( const id of titleI18n ) {
                await faculty.transaction( t => TitleI18n.findOne( {
                    where: {
                        profileId,
                        titleId: id,
                    },
                    transaction: t,
                } ).then( ( titleI18n ) => {
                    if ( titleI18n ) {
                        return TitleI18n.destroy( {
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
