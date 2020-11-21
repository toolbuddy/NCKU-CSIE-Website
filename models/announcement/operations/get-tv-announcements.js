/**
 * A function to get announcement which has an image.
 *
 * @async
 * @function
 * @param {number}   amount      - Specify how many announcements to be returned.
 * @param {number}   languageId  - Language option of the announcements.
 * @returns {object[]} Requested announcement briefings, including:
 * - id
 * - content
 * - title
 * - image
 */

const Sequelize = require('sequelize');
const {
    Announcement,
    AnnouncementI18n,
} = require('./associations.js');
const LanguageUtils = require('../../common/utils/language.js');
const ValidateUtils = require('../../common/utils/validate.js');

const op = Sequelize.Op;

module.exports = async (opt) => {
    try {
        // Get parameters.
        const {
            amount = null,
            languageId = null,
        } = opt || {};

        if (!ValidateUtils.isPositiveInteger(amount)) {
            const error = new Error('Invalid amount.');
            error.status = 400;
            throw error;
        }
        if (!LanguageUtils.isSupportedLanguageId(languageId)) {
            const error = new Error('Invalid language id.');
            error.status = 400;
            throw error;
        }

        // Get announcements which has an image.
        const announcements = await Announcement.findAll({
            attributes: [
                'announcementId',
                'image',
            ],
            where: {
                isPublished: true,
                image: {
                    [op.not]: null,
                },
            },
            include: [
                {
                    model: AnnouncementI18n,
                    as: 'announcementI18n',
                    attributes: [
                        'title',
                        'content',
                    ],
                    where: {
                        languageId,
                    },
                },
            ],
            order: [
                [
                    'updateTime',
                    'DESC',
                ],
            ],
            limit: amount,

            // Sequelize have some issue when using limit, currently solving hack can use `subQuery: fasle`.
            subQuery: false,
        });

        // If no announcement returned, throw 404 error.
        if (!announcements.length) {
            const error = new Error('No result.');
            error.status = 404;
            throw error;
        }

        // Return announcement briefings with the flatten format.
        return announcements.map(announcement => ({
            announcementId: announcement.announcementId,
            content: announcement.announcementI18n[0].content,
            title: announcement.announcementI18n[0].title,
            image: announcement.image,
        }));
    }
    catch (error) {
        if (!error.status)
            error.status = 500;
        throw error;
    }
};
