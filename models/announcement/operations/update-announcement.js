import ValidateUtils from 'models/common/utils/validate.js';
import LanguageUtils from 'models/common/utils/language.js';
import {
    Announcement,
    AnnouncementI18n,
    File,
    Tag,
} from 'models/announcement/operations/associations.js';
import { announcement, } from 'models/common/utils/connect.js';

import AnnouncementValidationConstraints from 'models/announcement/constraints/update/announcement.js';
import AnnouncementI18nValidationConstraints from 'models/announcement/constraints/update/announcement-i18n.js';
import AddedFileValidationConstraints from 'models/announcement/constraints/update/addedFiles.js';
import DeletedFileValidationConstraints from 'models/announcement/constraints/update/deletedFiles.js';
import TagValidationConstraints from 'models/announcement/constraints/update/tag.js';
import validate from 'validate.js';

function sortByValue ( a, b ) {
    return a - b;
}

function equalArray ( a, b ) {
    if ( a === b )
        return true;
    if ( a == null || b == null )
        return false;
    if ( a.length !== b.length )
        return false;
    for ( let i = 0; i < a.length; ++i ) {
        if ( a[ i ] !== b[ i ] )
            return false;
    }

    return true;
}

export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            announcementId = null,
            publishTime = null,
            updateTime = null,
            isPinned = null,
            image = null,
            announcementI18n = null,
            addedFiles = null,
            deletedFiles = null,
            tags = null,
        } = opt;

        if ( typeof ( validate( {
            announcementId,
            publishTime,
            updateTime,
            isPinned,
            image,
            announcementI18n,
            addedFiles,
            deletedFiles,
            tags,
        }, AnnouncementValidationConstraints ) ) !== 'undefined' ) {
            const error = new Error( 'Invalid announcement object' );
            error.status = 400;
            throw error;
        }

        const langArr = [];
        announcementI18n.forEach( i18nData => {
            if ( typeof ( validate( i18nData, AnnouncementI18nValidationConstraints ) ) !== 'undefined' ) {
                const error = new Error( 'Invalid announcementI18n object' );
                error.status = 400;
                throw error;
            }
            langArr.push( i18nData.languageId );
        });
        if ( !equalArray( langArr.sort( sortByValue ), LanguageUtils.supportedLanguageId.sort( sortByValue ) ) ) {
            const error = new Error( 'Invalid announcementI18n object' );
            error.status = 400;
            throw error;
        }

        addedFiles.forEach( ( file ) => {
            if ( typeof ( validate( file, AddedFileValidationConstraints ) ) !== 'undefined' || !ValidateUtils.isValidBlob( file.content ) ) {
                const error = new Error( 'Invalid added file object' );
                error.status = 400;
                throw error;
            }
        } );

        deletedFiles.forEach( ( file ) => {
            if ( typeof ( validate( file, DeletedFileValidationConstraints ) ) !== 'undefined' ) {
                const error = new Error( 'Invalid deleted file object' );
                error.status = 400;
                throw error;
            }
        } );

        tags.forEach( ( tag ) => {
            if ( typeof ( validate( tag, TagValidationConstraints ) ) !== 'undefined' ) {
                const error = new Error( 'Invalid tag object' );
                error.status = 400;
                throw error;
            }
        } );

        await announcement.transaction( t => Announcement.update( {
            publishTime,
            updateTime,
            isPinned,
            image,
        }, {
            where: {
                announcementId,
            },
            transaction: t,
        } ).then( () => {
            return Promise.all( announcementI18n.map( i18nObj => AnnouncementI18n.update( {
                title:   i18nObj.title,
                content: i18nObj.content,
            }, {
                where: {
                    announcementId,
                    language: i18nObj.language,
                },
                transaction: t,
            } ) ) );
        } ).then(() => {
            return Tag.destroy({
                where: {
                    announcementId,
                },
                transaction: t,
            });
        }).then(() => {
            return Tag.bulkCreate(tags, {
                transaction: t,
            });
        }).then(() => {
            return File.destroy({
                where: {
                    fileId: deletedFiles,
                },
                transaction: t,
            });
        }).then(() => {
            return File.bulkCreate(addedFiles,
            {
                transaction: t,
            });
        })).then( () => {
            return { 'message': 'success' };
        })
        .catch( ( err ) => {
            error.status = 500;
            throw err;
        } );

        return res;
    }
    catch ( err ) {
        throw err;
    }
};
