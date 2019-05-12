import {
    Admin,
} from 'models/auth/operations/associations.js';

/**
 * A function for getting a specific announcement in specific languages by the id of the announcement.
 *
 * @async
 * @param {number} [userId=1]                   - Id of the requested announcement.
 * @returns {object}                           Related information of the requested announcement, including:
 * - sid
 * - expires
 * - data
 * - userId
 *
 */

export default async ( opt ) => {
    try {
        const {
            userId = null,
            account = null,
            password = null,
            role = null,
            sid = null,
            isValid = null,
            name = null,
        } = opt || {};

        // Validate
        console.log( 'should validate' );

        const result = await Admin.update( {
            account,
            password,
            role,
            sid,
            isValid,
            name,
        },
        {
            where: {
                userId,
            },
        } );

        return result;
    }
    catch ( err ) {
        if ( err.status )
            throw err;
        const error = new Error();
        error.status = 500;
        throw error;
    }
};
