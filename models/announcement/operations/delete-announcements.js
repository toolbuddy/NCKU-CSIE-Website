import ValidateUtils from 'models/common/utils/validate.js';
import {
    Announcement,
} from 'models/announcement/operations/associations.js';
import { announcement, } from 'models/common/utils/connect.js';

export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            announcementId = null,
        } = opt;

        if ( !ValidateUtils.isValidId( announcementId ) ) {
            const error = new Error( 'Invalid announcement id' );
            error.status = 400;
            throw error;
        }

        await announcement.transaction( t => Announcement.update( {
            isPublished:    0,
        }, {
            where: {
                announcementId,
            },
            transaction: t,
        } ) ).catch( ( err ) => {
            throw err;
        } );
        return;
    }
    catch ( err ) {
        throw err;
    }
};
