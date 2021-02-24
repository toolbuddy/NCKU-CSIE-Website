/**
 * A function to update announcement with given id.
 *
 * @async
 * @function
 * @param {number}   announcementId          - Id of the requested announcement.
 * @param {number}   image                   - Image of this announcement. An announcement can only have one image.
 * @param {blob}     [announcementI18n = []] - Title and content of this announcement in different languages.
 * @param {object}   [addedFiles = []]       - New files to be appended on this announcement.
 * @param {number[]} [deletedFiles = []]     - Files which need to be deleted.
 * @param {blob[]}   [tags = []]             - Tags of this announcement.
 * @returns {object} On success, return an object with success message.
 * - message
 */

const validate = require('validate.js');
const {
    // Announcement,
    AnnouncementI18n,
    File,
    Tag,
} = require('./associations.js');
const {announcement} = require('../../common/utils/connect.js');
const AnnouncementValidationConstraints = require('../constraints/put/announcement.js');
const AnnouncementI18nValidationConstraints = require('../constraints/put/announcement-i18n.js');
const AddedFileValidationConstraints = require('../constraints/put/addedFile.js');
const DeletedFileValidationConstraints = require('../constraints/put/deletedFile.js');
const TagValidationConstraints = require('../constraints/put/tag.js');
const LanguageUtils = require('../../common/utils/language.js');
const equalArray = require('../../common/utils/equal-array.js');
const Announcement = require('../schemas/announcement.js');

module.exports = async (opt) => {
    try {
        // Get parameters.
        const {
            announcementId = null,
            image = null,
            announcementI18n = [],
            addedFiles = [],
            deletedFiles = [],
            tags = [],
        } = opt || {};

        // Check if parameters meet constraints. If not, throw 400 error.
        if (typeof (validate({
            announcementId,
            image,
            announcementI18n,
            addedFiles,
            deletedFiles,
            tags,
        }, AnnouncementValidationConstraints)) !== 'undefined') {
            const error = new Error('Invalid announcement object');
            error.status = 400;
            throw error;
        }
        const langArr = [];
        announcementI18n.forEach((i18nData) => {
            i18nData.languageId = Number(i18nData.languageId);
            if (typeof (validate(i18nData, AnnouncementI18nValidationConstraints)) !== 'undefined') {
                const error = new Error('Invalid announcementI18n object');
                error.status = 400;
                throw error;
            }
            langArr.push(i18nData.languageId);
        });
        if (!equalArray(langArr.sort((a, b) => a - b), LanguageUtils.supportedLanguageId.sort((a, b) => a - b))) {
            const error = new Error('Invalid announcementI18n object');
            error.status = 400;
            throw error;
        }
        addedFiles.forEach((file) => {
            if (typeof (validate(file, AddedFileValidationConstraints)) !== 'undefined') {
                const error = new Error('Invalid added file object');
                error.status = 400;
                throw error;
            }
        });
        deletedFiles.forEach((file) => {
            file.fileId = Number(file.fileId);
            if (typeof (validate(file, DeletedFileValidationConstraints)) !== 'undefined') {
                const error = new Error('Invalid deleted file object');
                error.status = 400;
                throw error;
            }
        });
        tags.forEach((tag) => {
            tag.tagId = Number(tag.tagId);
            if (typeof (validate(tag, TagValidationConstraints)) !== 'undefined') {
                const error = new Error('Invalid tag object');
                error.status = 400;
                throw error;
            }
        });

        // Update announcement.
        await announcement.transaction(t => Promise.all(announcementI18n.map(i18nObj => AnnouncementI18n.update(
            i18nObj,
            {
                where: {
                    announcementId,
                    languageId: i18nObj.languageId,
                },
                transaction: t,
            },
        )))
        .then(() => Announcement.update({
            updateTime: new Date(),
        }, {
            where: {
                announcementId,
            },
        }))
        .then(() => Tag.destroy({
            where: {
                announcementId,
            },
            transaction: t,
        }))
        .then(() => Tag.bulkCreate(tags.map(tag => ({
            tagId: tag.tagId,
            announcementId,
        })), {
            transaction: t,
        }))
        .then(() => File.destroy({
            where: {
                fileId: deletedFiles.map(file => file.fileId),
            },
            transaction: t,
        }))
        .then(() => File.bulkCreate(addedFiles.map(file => ({
            name: file.name,
            content: file.content,
            announcementId,
        })), {
            transaction: t,
        })));

        // Return success message.
        return {message: 'Announcement updated.'};
    }
    catch (error) {
        if (!error.status)
            error.status = 500;
        throw error;
    }
};
