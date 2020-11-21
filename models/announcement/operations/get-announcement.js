/**
 * A function to get a specific announcement in specific languages by its id.
 * Everytime someone successfully get an announcement, its views will increased by 1.
 *
 * @async
 * @param {number} languageId     - Language option of the announcements.
 * @param {number} announcementId - Id of the requested announcement.
 * @returns {object} Related information of the requested announcement, including:
 * - id
 * - title
 * - content
 * - image
 * - author
 * - publishTime
 * - updateTime
 * - views
 * - ispinned
 * - files
 * - tag ids
 */

const {
    Announcement,
    AnnouncementI18n,
    File,
    Tag,
} = require('./associations.js');
const LanguageUtils = require('../../common/utils/language.js');
const ValidateUtils = require('../../common/utils/validate.js');

module.exports = async (opt) => {
    try {
        // Get parameters.
        const {
            languageId = null,
            announcementId = null,
        } = opt || {};

        // Check if parameters meet constraints. If not, throw 400 error.
        if (!LanguageUtils.isSupportedLanguageId(languageId)) {
            const error = new Error('Invalid language id.');
            error.status = 400;
            throw error;
        }
        if (!ValidateUtils.isPositiveInteger(announcementId)) {
            const error = new Error('Invalid announcement id.');
            error.status = 400;
            throw error;
        }

        // Get an announcement's detail with specific id and language.
        const announcement = await Announcement.findOne({
            attributes: [
                'announcementId',
                'author',
                'publishTime',
                'updateTime',
                'views',
                'isPinned',
                'image',
            ],
            where: {
                announcementId,
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
                    attributes: ['tagId'],
                },
            ],
        });

        // If no announcement returned, throw 404 error.
        if (!announcement) {
            const error = new Error('Announcement not found.');
            error.status = 404;
            throw error;
        }

        // If successfully get the announcement, increase its views
        await Announcement.update({
            views: announcement.views + 1,
        }, {
            where: {
                announcementId,
            },
        });

        // Get files owned by this announcement.
        // This must be done after we got announcement, because an announcement may not contain any file.
        // In such case, if we put this query inside above one's `include`, the result might be null.
        const files = await File.findAll({
            attributes: [
                'fileId',
                'name',
            ],
            where: {
                announcementId,
            },
        });

        // Return everything related to this announcement in flatten format.
        return {
            announcementId: announcement.announcementId,
            author: announcement.author,
            publishTime: announcement.publishTime,
            updateTime: announcement.updateTime,
            views: announcement.views,
            isPinned: announcement.isPinned,
            image: announcement.image,
            title: announcement.announcementI18n[0].title,
            content: announcement.announcementI18n[0].content,
            tags: announcement.tags.map(tag => tag.tagId),
            files,
        };
    }
    catch (error) {
        if (!error.status)
            error.status = 500;
        throw error;
    }
};
