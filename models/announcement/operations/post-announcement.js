import ValidateUtils from 'models/common/utils/validate.js';
import LanguageUtils from 'models/common/utils/language.js';
import {
    Announcement,
    AnnouncementI18n,
    File,
    FileI18n,
    Tag,
} from 'models/announcement/operations/associations.js';
import { announcement, } from 'models/common/utils/connect.js';

import AnnouncementValidationConstraints from 'models/announcement/constraints/post/announcement.js';
import AnnouncementI18nValidationConstraints from 'models/announcement/constraints/post/announcement-i18n.js';
import FileI18nValidationConstraints from 'models/announcement/constraints/post/file-i18n.js';
import TagValidationConstraints from 'models/announcement/constraints/post/tag.js';
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
            publishTime = null,
            updateTime = null,
            author = null,
            isPinned = null,
            isPublished = null,
            views = null,
            imageUrl = null,
            tag = null,
            announcementI18n = null,
            fileI18n = null,
        } = opt;

        if ( typeof ( validate( {
            publishTime,
            updateTime,
            author,
            isPinned,
            isPublished,
            views,
            image: imageUrl,
            i18n:  announcementI18n,
        }, AnnouncementValidationConstraints ) ) !== 'undefined' ) {
            const error = new Error( 'Invalid announcement object' );
            error.status = 400;
            throw error;
        }
        const langArr = [];
        for ( const i18nData of announcementI18n ) {
            if ( typeof ( validate( i18nData, AnnouncementI18nValidationConstraints ) ) !== 'undefined' ) {
                const error = new Error( 'Invalid announcementI18n object' );
                error.status = 400;
                throw error;
            }
            langArr.push( i18nData.languageId );
        }
        if ( !equalArray( langArr.sort( sortByValue ), LanguageUtils.supportedLanguageId.sort( sortByValue ) ) ) {
            const error = new Error( 'Invalid announcementI18n object' );
            error.status = 400;
            throw error;
        }

        if ( !ValidateUtils.isValidArray( tag ) ) {
            const error = new Error( 'Invalid tag object' );
            error.status = 400;
            throw error;
        }
        tag.forEach( ( tagObj ) => {
            if ( typeof ( validate( tagObj, TagValidationConstraints ) ) !== 'undefined' ) {
                const error = new Error( 'Invalid tag object' );
                error.status = 400;
                throw error;
            }
        } );

        if ( !ValidateUtils.isValidArray( fileI18n ) ) {
            const error = new Error( 'Invalid fileI18n object' );
            error.status = 400;
            throw error;
        }
        fileI18n.forEach( ( fileI18nArr ) => {
            if ( !ValidateUtils.isValidArray( fileI18nArr ) ) {
                const error = new Error( 'Invalid fileI18n object' );
                error.status = 400;
                throw error;
            }
            const langArr = [];
            fileI18nArr.forEach( ( fileI18nObj ) => {
                if ( typeof ( validate( fileI18nObj, FileI18nValidationConstraints ) ) !== 'undefined' ) {
                    const error = new Error( 'Invalid fileI18n object' );
                    error.status = 400;
                    throw error;
                }
                langArr.push( fileI18nObj.languageId );
            } );
            if ( !equalArray( langArr.sort( sortByValue ), LanguageUtils.supportedLanguageId.sort( sortByValue ) ) ) {
                const error = new Error( 'Invalid fileI18n object' );
                error.status = 400;
                throw error;
            }
        } );

        await announcement.transaction( t => Announcement.create( {
            publishTime,
            updateTime,
            author,
            isPinned,
            isPublished,
            image: imageUrl,
            views,
            announcementI18n,
            fileI18n,
            tag,
        }, {
            include: [
                {
                    model: AnnouncementI18n,
                    as:    'announcementI18n',
                },
                {
                    model: Tag,
                    as:    'tag',
                },
            ],
            transaction: t,
        } ).then( ann => Promise.all( fileI18n.map( async ( fileI18nInfo ) => {
            const result = await File.create( {
                announcementId: ann.announcementId,
                fileI18n:       fileI18nInfo,
            }, {
                include: [ {
                    model: FileI18n,
                    as:    'fileI18n',
                }, ],
                transaction: t,
            } );
            return result;
        } ) ) ) ).catch( ( err ) => {
            throw err;
        } );

        return;
    }
    catch ( err ) {
        throw err;
    }
};
