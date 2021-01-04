/**
 * A function to get the number of pages to display all requested announcements.
 * The announcement will contain at least one of the given tags.
 *
 * @async
 * @function
 * @param {number[]} [tags = []] - Specify the announcements with the given tag ids.
 * @param {date}     from        - Specify the earliest time of filter interval when announcements were post.
 * @param {date}     to          - Specify the latest time of filter interval when announcements were post.
 * @param {number}   amount      - Specify the number of announcements in one page.
 * @returns {object} The number of pages required to display all the requested announcements.
 * - pages
 */

const {Op} = require('sequelize');
const {
    Announcement,
    Tag,
} = require('./associations.js');
const tagUtils = require('../utils/tag.js');
const ValidateUtils = require('../../common/utils/validate.js');

module.exports = async (opt) => {
    try {
        // Get parameters.
        const {
            tags = [],
            from = null,
            to = null,
            amount = null,
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
        if (!ValidateUtils.isPositiveInteger(amount)) {
            const error = new Error('Invalid amount.');
            error.status = 400;
            throw error;
        }

        // Get announcementId which contain one of the given tags.
        const announcements = await Announcement.findAll({
            attributes: ['announcementId'],
            where: {
                updateTime: {
                    [Op.between]: [
                        from,
                        to,
                    ],
                },
                isPublished: true,
            },
            include: [
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
        });

        // If no announcement returned, throw 404 error.
        if (!announcements.length) {
            const error = new Error('No result.');
            error.status = 404;
            throw error;
        }

        // Return the number of pages.
        return {
            pages: Math.ceil(announcements.length / amount),
        };
    }
    catch (error) {
        if (!error.status)
            error.status = 500;
        throw error;
    }
};
