import { Session, } from 'models/auth/operations/associations.js';
import ValidateUtils from 'models/common/utils/validate.js';

/**
 * A function for saving a session information.
 *
 * @async
 * @param {number} [sid=1] - sid of the session.
 * @param {date}   expire  - the expire time of the session
 * @param {string} data    - data of session
 * @param {number} userId  - user id to which the session belongs
 * @returns {object}       - Related information of the saved session, including:
 * - sid
 * - expires
 * - data
 * - userId
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

    const result = await Session.create( {
        sid,
        expires,
        data,
        userId,
    } )
    .then(
        session => ( {
            sid:         session.sid,
            expires:     session.expires,
            data:        session.data,
            userId:      session.userId,
        } )
    );

    return result;
};
