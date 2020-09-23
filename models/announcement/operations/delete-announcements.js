import ValidateUtils from 'models/common/utils/validate.js';
import { Announcement, } from 'models/announcement/operations/associations.js';

export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            announcementIds = null,
        } = opt;

        if ( !ValidateUtils.isValidArray( announcementIds ) ) {
            const error = new Error( 'Invalid announcement id' );
            error.status = 400;
            throw error;
        }

        announcementIds.forEach( ( id ) => {
            if ( !ValidateUtils.isValidId( id ) ) {
                const error = new Error( 'Invalid announcement id' );
                error.status = 400;
                throw error;
            }
        } );

        return Announcement.update( {
            isPublished:    0,
        }, {
            where: {
                announcementId: announcementIds,
            },
        } )
        .then( () => ( { 'message': 'success', } ) )
        .catch( ( err ) => {
            throw err;
        } );
    }
    catch ( err ) {
        throw err;
    }
};
