import { Announcement, } from 'models/announcement/operations/associations.js';

import AnnouncementValidationConstraints from 'models/announcement/constraints/patch/announcement.js';
import validate from 'validate.js';

export default ( opt ) => {
    try {
        opt = opt || {};
        const announcementId = Number.parseInt( opt.announcementId, 10 );
        const isPinned = opt.isPinned;

        if ( typeof ( validate( {
            announcementId,
            isPinned,
        }, AnnouncementValidationConstraints ) ) !== 'undefined' ) {
            const error = new Error( 'Invalid announcement object' );
            error.status = 400;
            throw error;
        }

        return Announcement.update( {
            isPinned,
        }, {
            where: {
                announcementId,
            },
        } )
        .then( () => ( { 'message': 'success', } ) )
        .catch( ( err ) => {
            err.status = 500;
            throw err;
        } );
    }
    catch ( err ) {
        throw err;
    }
};
