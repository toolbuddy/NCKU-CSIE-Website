import LanguageUtils from 'models/common/utils/language.js';
import {
    Announcement,
    AnnouncementI18n,
    File,
    Tag,
} from 'models/announcement/operations/associations.js';
import { announcement, } from 'models/common/utils/connect.js';

import AnnouncementValidationConstraints from 'models/announcement/constraints/post/announcement.js';
import AnnouncementI18nValidationConstraints from 'models/announcement/constraints/post/announcement-i18n.js';
import FileValidationConstraints from 'models/announcement/constraints/post/file.js';
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

export default ( opt ) => {
    try {
        opt = opt || {};
        const {
            author = null,
            image = null,
            announcementI18n = null,
            tags = null,
            files = null,
        } = opt;

        if ( typeof ( validate( {
            author,
            image,
            announcementI18n,
            tags,
            files,
        }, AnnouncementValidationConstraints ) ) !== 'undefined' ) {
            const error = new Error( 'Invalid announcement object' );
            error.status = 400;
            throw error;
        }

        const langArr = [];
        announcementI18n.forEach( ( i18nData ) => {
            i18nData.languageId = Number.parseInt( i18nData.languageId, 10 );
            if ( typeof ( validate( i18nData, AnnouncementI18nValidationConstraints ) ) !== 'undefined' ) {
                const error = new Error( 'Invalid announcementI18n object' );
                error.status = 400;
                throw error;
            }
            langArr.push( i18nData.languageId );
        } );
        if ( !equalArray( langArr.sort( sortByValue ), LanguageUtils.supportedLanguageId.sort( sortByValue ) ) ) {
            const error = new Error( 'Invalid announcementI18n object' );
            error.status = 400;
            throw error;
        }

        files.forEach( ( file ) => {
            if ( typeof ( validate( file, FileValidationConstraints ) ) !== 'undefined' ) {
                const error = new Error( 'Invalid file object' );
                error.status = 400;
                throw error;
            }
        } );

        tags.forEach( ( tagObj ) => {
            tagObj.tagId = Number.parseInt( tagObj.tagId, 10 );
            if ( typeof ( validate( tagObj, TagValidationConstraints ) ) !== 'undefined' ) {
                const error = new Error( 'Invalid tag object' );
                error.status = 400;
                throw error;
            }
        } );

        return Announcement.create( {
            author,
            image,
            announcementI18n,
            tags,
            files,
        }, {
            include: [
                {
                    model: AnnouncementI18n,
                    as:    'announcementI18n',
                },
                {
                    model: File,
                    as:    'files',
                },
                {
                    model: Tag,
                    as:    'tags',
                },
            ],
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
