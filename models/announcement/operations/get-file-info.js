import {
    File,
    FileI18n,
} from 'models/announcement/operations/associations.js';
import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils from 'models/common/utils/validate.js';

export default async ( opt ) => {
    try {
        const {
            languageId = null,
            announcementId = null,
            fileId = null,
        } = opt || {};

        if ( !LanguageUtils.isSupportedLanguageId( languageId ) ) {
            const error = new Error( 'invalid language id' );
            error.status = 400;
            throw error;
        }
        if ( !ValidateUtils.isPositiveInteger( announcementId ) ) {
            const error = new Error( 'invalid announcement id' );
            error.status = 400;
            throw error;
        }
        if ( !ValidateUtils.isPositiveInteger( fileId ) ) {
            const error = new Error( 'invalid file id' );
            error.status = 400;
            throw error;
        }

        const data = await File.findOne( {
            attributes: [
                'fileId',
                'announcementId',
            ],
            where: {
                announcementId,
                fileId,
            },
            include: [
                {
                    model:      FileI18n,
                    as:         'fileI18n',
                    attributes: [
                        'name',
                        'path',
                    ],
                    where: {
                        fileId,
                        languageId,
                    },
                },
            ],
        } );
        if ( !data ) {
            const error = new Error( 'no result' );
            error.status = 404;
            throw error;
        }

        return {
            name:           data.fileI18n[ 0 ].name,
            path:           data.fileI18n[ 0 ].path,
            announcementId: data.announcementId,
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
