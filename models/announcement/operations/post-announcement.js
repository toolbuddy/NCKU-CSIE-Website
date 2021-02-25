/**
 * A function to add a new announcement into database.
 *
 * @async
 * @function
 * @param {number}   author                  - ProfileId of the staff who create this announcement.
 * @param {blob}     image                   - Image of this announcement. An announcement can only have one image.
 * @param {object[]} [announcementI18n = []] - Title and content of this announcement in different languages.
 * @param {number[]} [tags = []]             - Tags of this announcement.
 * @param {blob[]}   [files = []]            - Files to be appended on this announcement.
 * @returns {object} On success, return an object with success message.
 * - message
 */

const validate = require('validate.js');
const {
    Announcement,
    AnnouncementI18n,
    File,
    Tag,
} = require('./associations.js');
const AnnouncementValidationConstraints = require('../constraints/post/announcement.js');
const AnnouncementI18nValidationConstraints = require('../constraints/post/announcement-i18n.js');
const FileValidationConstraints = require('../constraints/post/file.js');
const TagValidationConstraints = require('../constraints/post/tag.js');
const LanguageUtils = require('../../common/utils/language.js');
const equalArray = require('../../common/utils/equal-array.js');

module.exports = async (opt) => {
    try {
        // Get parameters.
        const {
            author = null,
            image = null,
            announcementI18n = [],
            tags = [],
            files = [],
        } = opt || {};

        // Check if parameters meet constraints. If not, throw 400 error.
        if (typeof (validate({
            author,
            image,
            announcementI18n,
            tags,
            files,
        }, AnnouncementValidationConstraints)) !== 'undefined') {
            const error = new Error('Invalid announcement object.');
            error.status = 400;
            throw error;
        }
        const langArr = [];
        announcementI18n.forEach((i18nData) => {
            if (typeof (validate(i18nData, AnnouncementI18nValidationConstraints)) !== 'undefined') {
                const error = new Error('Invalid announcementI18n object.');
                error.status = 400;
                throw error;
            }
            langArr.push(i18nData.languageId);
        });
        if (!equalArray(langArr.sort((a, b) => a - b), LanguageUtils.supportedLanguageId.sort((a, b) => a - b))) {
            const error = new Error('Invalid announcementI18n object.');
            error.status = 400;
            throw error;
        }
        files.forEach((file) => {
            if (typeof (validate(file, FileValidationConstraints)) !== 'undefined') {
                const error = new Error('Invalid file object.');
                error.status = 400;
                throw error;
            }
        });
        tags.forEach((tag) => {
            if (typeof (validate(tag, TagValidationConstraints)) !== 'undefined') {
                const error = new Error('Invalid tag object.');
                error.status = 400;
                throw error;
            }
        });

        // Create announcement.
        await Announcement.create({
            author,
            announcementI18n,
            tags,
            files,
            updateTime: new Date(),
        }, {
            include: [
                {
                    model: AnnouncementI18n,
                    as: 'announcementI18n',
                },
                {
                    model: File,
                    as: 'files',
                },
                {
                    model: Tag,
                    as: 'tags',
                },
            ],
        });

        // Return success message.
        return {message: 'Announcement created.'};
    }
    catch (error) {
        if (!error.status)
            error.status = 500;
        throw error;
    }
};
