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
        } = opt || {};

        // Validate
        console.log( 'should validate' );

        const data = await Admin.findOne( {
            attributes: [
                'userId',
                'account',
                'password',
                'role',
                'sid',
                'isValid',
                'name',
            ],
            where: {
                userId,
            },
        } );

        if ( !data ) {
            const error = new Error( 'no result' );
            error.status = 404;
            throw error;
        }

        return {
            userId:     data.userId,
            account:    data.account,
            password:   data.password,
            role:       data.role,
            sid:        data.sid,
            isValid:    data.isValid,
            name:       data.name,
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
