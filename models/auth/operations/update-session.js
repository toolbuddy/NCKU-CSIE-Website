import { Session, } from 'models/auth/operations/associations.js';
import ValidateUtils from 'models/common/utils/validate.js';

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
