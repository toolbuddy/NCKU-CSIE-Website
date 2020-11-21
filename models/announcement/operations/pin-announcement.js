/**
 * A function to pin / unpin announcement with given id.
 *
 * @async
 * @function
 * @param {number}  announcementId - Id of the requested announcement.
 * @param {boolean} isPinned       - Whether or not this announcement should be pinned.
 * @returns {object} On success, return an object with success message.
 * - message
 */

const validate = require('validate.js');
const { Announcement } = require('./associations.js');
const AnnouncementValidationConstraints = require('../constraints/patch/announcement.js');

module.exports = async (opt) => {
    try {
        // Get parameters.
        const {
            announcementId = null,
            isPinned = null,
        } = opt || {};

        // Check if parameters meet constraints. If not, throw 400 error.
        if (typeof (validate({
            announcementId,
            isPinned,
        }, AnnouncementValidationConstraints)) !== 'undefined') {
            const error = new Error('Invalid announcement object.');
            error.status = 400;
            throw error;
        }

        // Update isPinned attribute of this announcement.
        await Announcement.update({ isPinned }, {
            where: {
                announcementId,
            },
        });

        // Return success message.
        return{ message: `Announcement ${isPinned ? 'pinned' : 'unpinned'}.` };
    }
    catch (error) {
        if (!error.status)
            error.status = 500;
        throw error;
    }
};
