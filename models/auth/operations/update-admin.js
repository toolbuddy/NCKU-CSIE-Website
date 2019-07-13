import {
    Admin,
} from 'models/auth/operations/associations.js';
import ValidateUtils from 'models/common/utils/validate.js';

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
            roleId = null,
        } = opt || {};

        if ( userId && !ValidateUtils.isValidId( userId ) ) {
            const error = new Error( 'invalid user id' );
            error.status = 400;
            throw error;
        }
        if ( account && !ValidateUtils.isValidString( account ) ) {
            const error = new Error( 'invalid account' );
            error.status = 400;
            throw error;
        }
        if ( password && !ValidateUtils.isValidString( password ) ) {
            const error = new Error( 'invalid password' );
            error.status = 400;
            throw error;
        }
        if ( role && !ValidateUtils.isValidId( role ) ) {
            const error = new Error( 'invalid user role' );
            error.status = 400;
            throw error;
        }
        if ( sid && !ValidateUtils.isValidString( sid ) ) {
            const error = new Error( 'invalid user sid' );
            error.status = 400;
            throw error;
        }
        if ( isValid && !ValidateUtils.isValidBoolean( isValid ) ) {
            const error = new Error( 'invalid isValid' );
            error.status = 400;
            throw error;
        }
        if ( name && !ValidateUtils.isValidString( name ) ) {
            const error = new Error( 'invalid name' );
            error.status = 400;
            throw error;
        }
        if ( roleId && !ValidateUtils.isValidId( roleId ) ) {
            const error = new Error( 'invalid user roleId' );
            error.status = 400;
            throw error;
        }

        const result = await Admin.update( {
            account,
            password,
            role,
            sid,
            isValid,
            name,
            roleId,
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
