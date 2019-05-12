import { Session, } from 'models/auth/operations/associations.js';


export default async ( sessionData ) => {
    const {
        sid = null,
        expires = null,
        data = null,
        userId = null,
    } = sessionData || {};

    // Validate data
    console.log( 'should validate data' );

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
