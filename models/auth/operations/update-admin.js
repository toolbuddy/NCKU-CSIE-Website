import {
    Admin,
} from 'models/auth/operations/associations.js';
import ValidateUtils from 'models/common/utils/validate.js';

/**
 * A function for updating a specific user data by the given user id.
 *
 * @async
 * @param   {number} userId   - Id of the user. Used for deciding which data to update.
 * @param   {string} account  - The updated account of the user account. If not null, the value will be rewritten by the given value.
 * @param   {string} password - The updated password of the user account. If not null, the value will be rewritten by the given value.
 * @param   {number} role     - This indicates the user is a member of staff or faculty. If not null, the value will be rewritten by the given value.
 * @param   {number} sid      - The session id of the user. If not null, the value will be rewritten by the given value.
 * @param   {bool}   isValid  - This indicates if this user is a valid user. If not null, the value will be rewritten by the given value.
 * @param   {string} name     - The name of the user. If not null, the value will be rewritten by the given value.
 * @param   {number} roleId   - The corresponding id in staff or faculty table. If not null, the value will be rewritten by the given value.
 * @returns {object}            A Promise.
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
