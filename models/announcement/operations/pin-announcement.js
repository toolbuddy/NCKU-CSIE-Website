const { Announcement, } = require('./associations.js');

const AnnouncementValidationConstraints = require('../constraints/patch/announcement.js');
const validate = require('validate.js');

module.exports = ( opt ) => {
    try {
        opt = opt || {};
        const announcementId = Number( opt.announcementId );
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
