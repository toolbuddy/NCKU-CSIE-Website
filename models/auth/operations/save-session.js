import { Session, } from 'models/auth/operations/associations.js';
import ValidateUtils from 'models/common/utils/validate.js';

/**
 * A function for getting a specific announcement in specific languages by the id of the announcement.
 *
 * @async
 * @param {number} [sid=1]                   - Id of the requested announcement.
 * @returns {object}                           Related information of the requested announcement, including:
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
