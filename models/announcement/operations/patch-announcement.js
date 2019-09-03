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
            announcementInfo = null,
        } = opt;

        if ( announcementInfo !== null ) {
            if ( typeof ( validate( announcementInfo, AnnouncementValidationConstraints ) ) !== 'undefined' ) {
                const error = new Error( 'Invalid announcement object' );
                error.status = 400;
                throw error;
            }
            if ( announcementInfo.i18n ) {
                for ( const i18nData of announcementInfo.i18n ) {
                    if ( typeof ( validate( i18nData, AnnouncementI18nValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid announcement object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }

            if ( announcementInfo.tags !== null ) {
                if ( !ValidateUtils.isValidArray( announcementInfo.tags ) ) {
                    const error = new Error( 'Invalid tag object' );
                    error.status = 400;
                    throw error;
                }
                announcementInfo.tags.forEach( ( tagObj ) => {
                    if ( typeof ( validate( tagObj, TagValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid tag object' );
                        error.status = 400;
                        throw error;
                    }
                } );
            }

            if ( announcementInfo.fileI18n !== null ) {
                if ( ValidateUtils.isValidArray( announcementInfo.fileI18n ) ) {
                    for ( const data of announcementInfo.fileI18n ) {
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
        }

        if ( announcementInfo ) {
            await announcement.transaction( t => Announcement.update( {
                publishTime:    announcementInfo.publishTime,
                updateTime:    announcementInfo.updateTime,
                author:      announcementInfo.author,
                views:       announcementInfo.views,
                isPinned:    announcementInfo.isPinned,
                isPublished:    announcementInfo.isPublished,
                image:       announcementInfo.imageUrl,
            }, {
                where: {
                    announcementId: announcementInfo.announcementId,
                },
                transaction: t,
            } ).then( () => Promise.all( announcementInfo.i18n.map( announcementI18nInfo => AnnouncementI18n.update( {
                title:   announcementI18nInfo.title,
                content:  announcementI18nInfo.content,
            }, {
                where: {
                    announcementId:  announcementInfo.announcementId,
                    languageId:     announcementI18nInfo.languageId,
                },
                transaction: t,
            } ) ) ) ).then( () => Tag.destroy( {
                where: {
                    announcementId: announcementInfo.announcementId,
                },
                transaction: t,
            } ) ).then( () => Promise.all( announcementInfo.tags.map( tagObj => Tag.create( {
                announcementId: announcementInfo.announcementId,
                typeId:         tagObj.typeId,
            }, {
                transaction: t,
            } ) ) ) ).then( () => Promise.all( announcementInfo.fileI18n.map( fileI18nInfo => File.findOne( {
                where: {
                    announcementId: announcementInfo.announcementId,
                    fileId:         fileI18nInfo.fileId,
                },
                transaction: t,
            } ) ) ) ).then( () => Promise.all( announcementInfo.fileI18n.map( fileI18nInfo => FileI18n.update( {
                name: fileI18nInfo.name,
            }, {
                where: {
                    fileId:     fileI18nInfo.fileId,
                    languageId: fileI18nInfo.languageId,
                },
                transaction: t,
            } ) ) ) ) ).catch( ( err ) => {
                throw err;
            } );
        }
        return;
    }
    catch ( err ) {
        throw err;
    }
};
