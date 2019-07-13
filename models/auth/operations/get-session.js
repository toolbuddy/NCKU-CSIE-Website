import {
    Session,
} from 'models/auth/operations/associations.js';
import ValidateUtils from 'models/common/utils/validate.js';

/**
 * A function for getting a specific session information by the sid of the session.
 *
 * @async
 * @param {number} [sid=1]                   - sid of the requested session.
 * @returns {object}                         - Related information of the requested session, including:
 * - sid
 * - expires
 * - data
 * - userId
 *
 */

export default async ( opt ) => {
    try {
        const {
            sid = null,
        } = opt || {};

        if ( !ValidateUtils.isValidString( sid ) ) {
            const error = new Error( 'invalid sid' );
            error.status = 400;
            throw error;
        }

        const data = await Session.findOne( {
            attributes: [
                'sid',
                'expires',
                'data',
                'userId',
            ],
            where: {
                sid,
            },
        } );

        if ( !data ) {
            const error = new Error( 'no result' );
            error.status = 404;
            throw error;
        }

        return {
            sid:        data.sid,
            expires:    Number( data.expires ),
            data:       data.data,
            userId:     data.userId,
        };
    }
    catch ( err ) {
        if ( err.status )
            throw err;
        const error = new Error();
        error.status = 500;
        throw error;
    }
};
