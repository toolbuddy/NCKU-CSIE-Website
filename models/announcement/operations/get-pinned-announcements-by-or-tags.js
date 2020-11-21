/**
 * A function to get pinned announcement briefings which containat least one of the given tags.
 *
 * @async
 * @function
 * @param {number[]} [tags = []] - Specify the announcements with the given tag ids.
 * @param {date}     from        - Specify the earliest time of filter interval when announcements were post.
 * @param {date}     to          - Specify the latest time of filter interval when announcements were post.
 * @param {number}   languageId  - Language option of the announcements.
 * @returns {object[]} Requested announcement briefings, including:
 * - id
 * - title
 * - content
 * - updateTime
 * - tag ids
 */

const {Op} = require('sequelize');
const {
    Announcement,
    AnnouncementI18n,
    Tag,
} = require('./associations.js');
const LanguageUtils = require('../../common/utils/language.js');
const ValidateUtils = require('../../common/utils/validate.js');
const tagUtils = require('../utils/tag.js');

module.exports = async (opt) => {
    try {
        // Get parameters.
        const {
            tags = [],
            from = null,
            to = null,
            languageId = null,
        } = opt || {};

        // Check if parameters meet constraints. If not, throw 400 error.
        if (!tags.every(tagUtils.isSupportedId, tagUtils)) {
            const error = new Error('Invalid tag id.');
            error.status = 400;
            throw error;
        }
        if (!ValidateUtils.isValidDate(new Date(from))) {
            const error = new Error('Invalid time - from.');
            error.status = 400;
            throw error;
        }
        if (!ValidateUtils.isValidDate(new Date(to))) {
            const error = new Error('Invalid time - to.');
            error.status = 400;
            throw error;
        }
        if (!LanguageUtils.isSupportedLanguageId(languageId)) {
            const error = new Error('Invalid language id.');
            error.status = 400;
            throw error;
        }

        // Get announcement briefings which contain one of the given tags and are pinned.
        // In this step, we can only get id, updateTime, title and content, but no tag list.
        // Because in this step, the tag list is limited to the content of given filter tags.
        const announcements = await Announcement.findAll({
            attributes: [
                'announcementId',
                'updateTime',
            ],
            where: {
                updateTime: {
                    [Op.between]: [
                        from,
                        to,
                    ],
                },
                isPublished: true,
                isPinned: true,
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
                {
                    model: Tag,
                    as: 'tags',
                    attributes: [],
                    where: {
                        tagId: {
                            [Op.in]: tags,
                        },
                    },
                },
            ],
            order: [
                [
                    'updateTime',
                    'DESC',
                ],
            ],
        });

        // If no announcement returned, throw 404 error.
        if (!announcements.length) {
            const error = new Error('No result.');
            error.status = 404;
            throw error;
        }

        // If any announcement returned, we can now get their tag list in complete, according to their id.
        const tagIds = await Announcement.findAll({
            attributes: ['announcementId'],
            where: {
                announcementId: announcements.map(announcement => announcement.announcementId),
            },
            include: [
                {
                    model: Tag,
                    as: 'tags',
                    attributes: ['tagId'],
                },
            ],
        }).

        // After we get tag ids, we modify their data structure to let later access more convenient.
        then((result) => {
            const map = {};
            result.forEach((item) => {
                map[item.announcementId] = item.tags.map(tag => tag.tagId);
            });
            return map;
        });

        // Return announcement briefings with the flatten format.
        return announcements.map(announcement => ({
            announcementId: announcement.announcementId,
            updateTime: announcement.updateTime,
            title: announcement.announcementI18n[0].title,
            content: announcement.announcementI18n[0].content,
            tags: tagIds[announcement.announcementId],
        }));
    }
    catch (error) {
        if (!error.status)
            error.status = 500;
        throw error;
    }
};
