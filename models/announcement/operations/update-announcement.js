import LanguageUtils from 'models/common/utils/language.js';
import {
    Announcement,
    AnnouncementI18n,
    File,
    Tag,
} from 'models/announcement/operations/associations.js';
import { announcement, } from 'models/common/utils/connect.js';

import AnnouncementValidationConstraints from 'models/announcement/constraints/put/announcement.js';
import AnnouncementI18nValidationConstraints from 'models/announcement/constraints/put/announcement-i18n.js';
import AddedFileValidationConstraints from 'models/announcement/constraints/put/addedFile.js';
import DeletedFileValidationConstraints from 'models/announcement/constraints/put/deletedFile.js';
import TagValidationConstraints from 'models/announcement/constraints/put/tag.js';
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

export default ( opt ) => {
    try {
        opt = opt || {};
        const announcementId = Number( opt.announcementId );
        const {
            image = null,
            announcementI18n = null,
            addedFiles = [],
            deletedFiles = [],
            tags = null,
        } = opt;

        if ( typeof ( validate( {
            announcementId,
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
        announcementI18n.forEach( ( i18nData ) => {
            i18nData.language = Number( i18nData.language );
            if ( typeof ( validate( i18nData, AnnouncementI18nValidationConstraints ) ) !== 'undefined' ) {
                const error = new Error( 'Invalid announcementI18n object' );
                error.status = 400;
                throw error;
            }
            langArr.push( i18nData.language );
        } );
        if ( !equalArray( langArr.sort( sortByValue ), LanguageUtils.supportedLanguageId.sort( sortByValue ) ) ) {
            const error = new Error( 'Invalid announcementI18n object' );
            error.status = 400;
            throw error;
        }

        addedFiles.forEach( ( file ) => {
            if ( typeof ( validate( file, AddedFileValidationConstraints ) ) !== 'undefined' ) {
                const error = new Error( 'Invalid added file object' );
                error.status = 400;
                throw error;
            }
        } );

        deletedFiles.forEach( ( file ) => {
            file.fileId = Number( file.fileId );
            if ( typeof ( validate( file, DeletedFileValidationConstraints ) ) !== 'undefined' ) {
                const error = new Error( 'Invalid deleted file object' );
                error.status = 400;
                throw error;
            }
        } );

        tags.forEach( ( tag ) => {
            tag.tagId = Number( tag.tagId );
            if ( typeof ( validate( tag, TagValidationConstraints ) ) !== 'undefined' ) {
                const error = new Error( 'Invalid tag object' );
                error.status = 400;
                throw error;
            }
        } );

        return announcement.transaction( t => Announcement.update( {
            image,
        }, {
            where: {
                announcementId,
            },
            transaction: t,
        } ).then( () => Promise.all( announcementI18n.map( i18nObj => AnnouncementI18n.update(
            i18nObj,
            {
                where: {
                    announcementId,
                    language: i18nObj.language,
                },
                transaction: t,
            }
        ) ) ) ).then( () => Tag.destroy( {
            where: {
                announcementId,
            },
            transaction: t,
        } ) ).then( () => Tag.bulkCreate( tags.map( tag => ( {
            tagId: tag.tagId,
            announcementId,
        } ) ), {
            transaction: t,
        } ) ).then( () => File.destroy( {
            where: {
                fileId: deletedFiles.map( file => file.fileId ),
            },
            transaction: t,
        } ) ).then( () => File.bulkCreate( addedFiles.map( file => ( {
            name:    file.name,
            content: file.content,
            announcementId,
        } ) ), {
            transaction: t,
        } ) ) ).then( () => ( { 'message': 'success', } ) )
        .catch( ( err ) => {
            err.status = 500;
            throw err;
        } );
    }
    catch ( err ) {
        throw err;
    }
};
