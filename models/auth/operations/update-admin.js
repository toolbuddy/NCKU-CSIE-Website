import {
    Admin,
} from 'models/auth/operations/associations.js';

import validate from 'validate.js';
import AdminValidationConstraints from 'models/auth/constraints/update/admin.js';

/**
 * A function for getting a specific announcement in specific languages by the id of the announcement.
 *
 * @async
 * @param {number} [userId] - Id of the requested announcement.
 * @returns {object}          If the update successed.
 */

export default async ( opt ) => {
    try {
        opt = opt || {};

        if ( typeof ( validate( opt, AdminValidationConstraints ) ) !== 'undefined' ) {
            const error = new Error( 'Invalid admin object' );
            error.status = 400;
            throw error;
        }

        return Admin.update( opt, {
            where: {
                userId: opt.userId,
            },
        } )
        .then( () => ( { 'message': 'success', } ) )
        .catch( ( err ) => {
            err.status = 500;
            throw err;
        } );
    }
    catch ( err ) {
        throw err;
    }
};
