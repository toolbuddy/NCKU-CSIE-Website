import { Session, } from 'models/auth/operations/associations.js';
import ValidateUtils from 'models/common/utils/validate.js';

/**
 * A function for updating a session information.
 *
 * @async
 * @param   {number} sid     - Sid of the session. Used for deciding which data to update.
 * @param   {date}   expire  - The expire time of the session. If not null, the value will be rewritten by the given value.
 * @param   {string} data    - The data of session. If not null, the value will be rewritten by the given value.
 * @param   {number} userId  - The user id to which the session belongs. If not null, the value will be rewritten by the given value.
 * @returns {object}         - The instance of the session.
 *
 */

export default async ( sessionData ) => {
    const {
        sid = null,
        expires = null,
        data = null,
        userId = null,
    } = sessionData || {};

    if ( !ValidateUtils.isValidString( sid ) ) {
        const error = new Error( 'invalid sid' );
        error.status = 400;
        throw error;
    }
    if ( !ValidateUtils.isValidDate( new Date( expires ) ) ) {
        const error = new Error( 'invalid expires' );
        error.status = 400;
        throw error;
    }
    if ( data && !ValidateUtils.isValidString( data ) ) {
        const error = new Error( 'invalid data' );
        error.status = 400;
        throw error;
    }
    if ( userId && !ValidateUtils.isValidId( userId ) ) {
        const error = new Error( 'invalid user id' );
        error.status = 400;
        throw error;
    }

    const result = await Session.update(
        {
            expires,
            data,
            userId,
        },
        {
            where: {
                sid,
            },
        }
    );

    return result;
};
