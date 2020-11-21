/**
 * A function to delete announcement with given id.
 *
 * @async
 * @function
 * @param {number} announcementIds - Array of id of the requested announcements.
 * @returns {object} On success, return an object with success message.
 * - message
 */

const { Announcement } = require('./associations.js');
const ValidateUtils = require('../../common/utils/validate.js');

module.exports = async (opt) => {
    try {
        // Get parameters.
        const {
            announcementIds = null,
        } = opt || {};

        // Check if parameters meet constraints. If not, throw 400 error.
        if (!ValidateUtils.isValidArray(announcementIds)) {
            const error = new Error('Invalid announcement ids.');
            error.status = 400;
            throw error;
        }
        announcementIds.forEach((id) => {
            if (!ValidateUtils.isValidId(id)) {
                const error = new Error('Invalid announcement id.');
                error.status = 400;
                throw error;
            }
        });

        // Soft delete these announcements. (Set thier isPublished to false.)
        await Announcement.update({
            isPublished: 0,
        }, {
            where: {
                announcementId: announcementIds,
            },
        });

        // Return success message.
        return { message: 'Announcement deleted.' };
    }
    catch (error) {
        if (!error.status)
            error.status = 500;
        throw error;
    }
};
