import ValidateUtils from 'models/common/utils/validate.js';
import {
    Tag,
} from 'models/announcement/operations/associations.js';
import { announcement, } from 'models/common/utils/connect.js';

export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            tags = null,
        } = opt;

        if ( ValidateUtils.isValidArray( tags ) ) {
            tags.forEach( ( tagObj ) => {
                if ( !ValidateUtils.isValidId( tagObj.tagId ) || !ValidateUtils.isValidId( tagObj.announcementId ) ) {
                    const error = new Error( 'Invalid id' );
                    error.status = 400;
                    throw error;
                }
            } );
        }
        else {
            const error = new Error( 'Invalid tag' );
            error.status = 400;
            throw error;
        }

        tags.forEach( async ( tagObj ) => {
            await announcement.transaction( t => Tag.destroy( {
                where: {
                    announcementId: tagObj.announcementId,
                    typeId:         tagObj.tagId,
                },
                transaction: t,
            } ) ).catch( ( err ) => {
                throw err;
            } );
        } );

        return;
    }
    catch ( err ) {
        throw err;
    }
};
