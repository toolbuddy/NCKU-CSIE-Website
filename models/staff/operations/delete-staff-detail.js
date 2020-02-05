import ValidateUtils from 'models/common/utils/validate.js';
import {
    BusinessI18n,
    TitleI18n,
} from 'models/staff/operations/associations.js';

import { staff, } from 'models/common/utils/connect.js';

/**
 * A function for hard-deleting the business or/and title information of a specific staff by a given profileId of the staff.
 *
 * @async
 * @param {number}    profileId    - ProfileId of the staff. Deciding which user information to delete.
 * @param {number []} businessI18n - IDs of businessI18n to be deleted.
 * @param {number []} titleI18n    - IDs of titleI18n to be deleted.
 *
 */

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
                await staff.transaction( t => BusinessI18n.destroy( {
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
                await staff.transaction( t => TitleI18n.findOne( {
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
