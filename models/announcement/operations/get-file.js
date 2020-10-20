/**
 * A function for getting a specific file by the id of it.
 *
 * @param {number} [fileId] - Id of the requested file.
 * @returns {object}        - Related information of the requested file, including:
 * - content (in base64 string)
 * - file name.
 */

const ValidateUtils = require('../../common/utils/validate.js');
const {File} = require('./associations.js');

module.exports = (fileId) => {
    try {
        if (!ValidateUtils.isPositiveInteger(fileId)) {
            const error = new Error('Invalid file id');
            error.status = 400;
            throw error;
        }

        return File.findOne({
            attributes: [
                'name',
                'content',
            ],
            where: {
                fileId,
            },
        }).
        then((data) => {
            if (!data) {
                const error = new Error('File not found');
                error.status = 404;
                throw error;
            }
            else
                return data;
        });
    }
    catch (error) {
        if (!error.status)
            error.status = 500;
        throw error;
    }
};
