import {
    Session,
} from 'models/auth/operations/associations.js';

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

export default async ( opt ) => {
    try {
        const {
            sid = null,
        } = opt || {};

        // Validate data
        console.log( 'should validate data' );

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
