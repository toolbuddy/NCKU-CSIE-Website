/**
 * A function to get a specific file by its id.
 *
 * @async
 * @function
 * @param {number} fileId - Id of the requested file.
 * @returns {object} Related information of the requested file, including:
 * - content (in base64 string)
 * - file name
 */

const {File} = require('./associations.js');
const ValidateUtils = require('../../common/utils/validate.js');

module.exports = async (fileId) => {
    try {
        // Check if parameter meet constraints. If not, throw 400 error.
        if (!ValidateUtils.isPositiveInteger(fileId)) {
            const error = new Error('Invalid file id.');
            error.status = 400;
            throw error;
        }

        // Get a file's detail with specific id.
        const file = await File.findOne({
            attributes: [
                'name',
                'content',
            ],
            where: {
                fileId,
            },
        });

        // If no file returned, throw 404 error.
        if (!file) {
            const error = new Error('File not found.');
            error.status = 404;
            throw error;
        }

        // Return this file.
        return file;
    }
    catch (error) {
        if (!error.status)
            error.status = 500;
        throw error;
    }
};
