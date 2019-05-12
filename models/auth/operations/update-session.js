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
