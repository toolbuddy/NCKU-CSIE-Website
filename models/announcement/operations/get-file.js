import ValidateUtils from 'models/common/utils/validate.js';
import { File } from 'models/announcement/operations/associations.js';

export default ( fileId ) => {
    try {
        if ( !ValidateUtils.isPositiveInteger( fileId ) ) {
            const error = new Error( 'invalid file id' );
            error.status = 400;
            throw error;
        }

        return File.findOne( {
            attributes: [
                'name',
                'content',
            ],
            where: {
                fileId,
            },
        } )
        .then( ( data ) => {
            if ( !data ) {
                const error = new Error( 'no result' );
                error.status = 404;
                throw error;
            }
            else
                return data;
        } );
    }
    catch ( err ) {
        if ( err.status )
            throw err;
        const error = new Error();
        error.status = 500;
        throw error;
    }
};
