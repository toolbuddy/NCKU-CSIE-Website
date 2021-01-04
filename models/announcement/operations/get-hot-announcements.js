/**
 * A function to get announcement briefings which have the most views.
 *
 * @async
 * @function
 * @param {date}     from        - Specifying the earliest time of filter interval when announcements were post.
 * @param {date}     to          - Specifying the latest time of filter interval when announcements were post.
 * @param {number}   amount      - Specify how many announcements to be returned.
 * @param {number}   page        - Specify the announcements under the given page number.
 * @param {number}   languageId  - Language option of the announcements.
 * @returns {object[]} Requested announcement briefings, including:
 * - id
 * - title
 * - content
 * - updateTime
 * - views
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
            from = null,
            to = null,
            amount = null,
            page = null,
            languageId = null,
        } = opt || {};

        // Check if parameters meet constraints. If not, throw 400 error.
        if (!ValidateUtils.isValidDate(from)) {
            const error = new Error('Invalid time - from.');
            error.status = 400;
            throw error;
        }
        if (!ValidateUtils.isValidDate(to)) {
            const error = new Error('Invalid time - to.');
            error.status = 400;
            throw error;
        }
        if (!ValidateUtils.isPositiveInteger(amount)) {
            const error = new Error('Invalid amount.');
            error.status = 400;
            throw error;
        }
        if (!ValidateUtils.isPositiveInteger(page)) {
            const error = new Error('Invalid page.');
            error.status = 400;
            throw error;
        }
        if (!LanguageUtils.isSupportedLanguageId(languageId)) {
            const error = new Error('Invalid language id.');
            error.status = 400;
            throw error;
        }

        // Get announcements briefings which have the most views.
        const announcements = await Announcement.findAll({
            attributes: [
                'announcementId',
                'updateTime',
                'views',
            ],
            where: {
                updateTime: {
                    [op.between]: [
                        from,
                        to,
                    ],
                },
                isPublished: true,
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
            offset: amount * (page - 1),
            order: [
                [
                    'views',
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
            title: announcement.announcementI18n[0].title,
            content: announcement.announcementI18n[0].content,
            updateTime: announcement.updateTime,
            views: announcement.views,
        }));
    }
    catch (error) {
        if (!error.status)
            error.status = 500;
        throw error;
    }
};
