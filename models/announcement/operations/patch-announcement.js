import ValidateUtils from 'models/common/utils/validate.js';
import {
    Announcement,
    AnnouncementI18n,
    File,
    FileI18n,
    Tag,
} from 'models/announcement/operations/associations.js';
import { announcement, } from 'models/common/utils/connect.js';

import AnnouncementValidationConstraints from 'models/announcement/constraints/patch/announcement.js';
import AnnouncementI18nValidationConstraints from 'models/announcement/constraints/patch/announcement-i18n.js';
import FileI18nValidationConstraints from 'models/announcement/constraints/patch/file-i18n.js';
import TagValidationConstraints from 'models/announcement/constraints/patch/tag.js';
import validate from 'validate.js';

export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            announcementId = null,
            publishTime = null,
            updateTime = null,
            author = null,
            isPinned = null,
            isPublished = null,
            imageUrl = null,
            views = null,
            i18n = null,
            tags = null,
            fileI18n = null,
        } = opt;

        if ( typeof ( validate( {
            announcementId,
            publishTime,
            updateTime,
            author,
            isPinned,
            isPublished,
            image: imageUrl,
            views,
            i18n,
            tags,
            fileI18n,
        }, AnnouncementValidationConstraints ) ) !== 'undefined' ) {
            const error = new Error( 'Invalid announcement object' );
            error.status = 400;
            throw error;
        }

        if ( i18n ) {
            for ( const i18nData of i18n ) {
                if ( typeof ( validate( i18nData, AnnouncementI18nValidationConstraints ) ) !== 'undefined' ) {
                    const error = new Error( 'Invalid announcement object' );
                    error.status = 400;
                    throw error;
                }
            }
        }

        if ( tags !== null ) {
            if ( !ValidateUtils.isValidArray( tags ) ) {
                const error = new Error( 'Invalid tag object' );
                error.status = 400;
                throw error;
            }
            tags.forEach( ( tagObj ) => {
                if ( typeof ( validate( tagObj, TagValidationConstraints ) ) !== 'undefined' ) {
                    const error = new Error( 'Invalid tag object' );
                    error.status = 400;
                    throw error;
                }
            } );
        }

        if ( fileI18n !== null ) {
            if ( ValidateUtils.isValidArray( fileI18n ) ) {
                for ( const data of fileI18n ) {
                    if ( typeof ( validate( data, FileI18nValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid fileI18n object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid fileI18n object' );
                error.status = 400;
                throw error;
            }
        }

        await announcement.transaction( t => Announcement.update( {
            publishTime,
            updateTime,
            author,
            views,
            isPinned,
            isPublished,
            image: imageUrl,
        }, {
            where: {
                announcementId,
            },
            transaction: t,
            omitNull:    true,
        } ).then( () => Promise.all( i18n.map( announcementI18nInfo => AnnouncementI18n.update( {
            title:   announcementI18nInfo.title,
            content:  announcementI18nInfo.content,
        }, {
            where: {
                announcementId,
                languageId:     announcementI18nInfo.languageId,
            },
            transaction: t,
            omitNull:    true,
        } ) ) ) ).then( () => {
            if ( tags !== null ) {
                return Tag.destroy( {
                    where: {
                        announcementId,
                    },
                    transaction: t,
                    omitNull:    true,
                } );
            }return Promise.resolve( { transaction: t, } );
        } ).then( () => {
            if ( tags !== null ) {
                return Promise.all( tags.map( tagObj => Tag.create( {
                    announcementId,
                    typeId:         tagObj.typeId,
                }, {
                    transaction: t,
                } ) ) );
            }
            return Promise.resolve( { transaction: t, } );
        } ).then( () => Promise.all( fileI18n.map( fileI18nInfo => File.findOne( {
            where: {
                announcementId,
                fileId:         fileI18nInfo.fileId,
            },
            transaction: t,
        } ) ) ) ).then( () => Promise.all( fileI18n.map( fileI18nInfo => FileI18n.update( {
            name: fileI18nInfo.name,
            path: fileI18nInfo.path,
        }, {
            where: {
                fileId:     fileI18nInfo.fileId,
                languageId: fileI18nInfo.languageId,
            },
            transaction: t,
            omitNull:    true,
        } ) ) ) ) ).catch( ( err ) => {
            throw err;
        } );
        return;
    }
    catch ( err ) {
        throw err;
    }
};
