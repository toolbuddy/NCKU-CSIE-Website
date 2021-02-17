/**
 * A function to delete news with given id.
 *
 * @async
 * @function
 * @param {number} newsIds - Array of id of the requested announcements.
 * @returns {object} On success, return an object with success message.
 * - message
 */

const {News} = require('./associations.js');
const ValidateUtils = require('../../common/utils/validate.js');

module.exports = async (opt) => {
    try {
        // Get parameters.
        const {
            newsIds = null,
        } = opt || {};

        // Check if parameters meet constraints. If not, throw 400 error.
        if (!ValidateUtils.isValidArray(newsIds)) {
            const error = new Error('Invalid news ids.');
            error.status = 400;
            throw error;
        }
        newsIds.forEach((id) => {
            if (!ValidateUtils.isValidId(id)) {
                const error = new Error('Invalid news id.');
                error.status = 400;
                throw error;
            }
        });

        // Delete these news
        await News.destroy({
            where: {
                newsId: newsIds,
            },
        });

        // Return success message.
        return {message: 'News deleted.'};
    }
    catch (error) {
        if (!error.status)
            error.status = 500;
        throw error;
    }
};
