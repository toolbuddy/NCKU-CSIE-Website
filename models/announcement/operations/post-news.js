/**
 * A function to add a new news into database.
 *
 * @async
 * @function
 * @param {number} author - ProfileId of the staff who create this announcement.
 * @param {string} title  - Title of this news.
 * @param {blob}   image  - Image of this news. A news can only have one image.
 * @param {string} url    - Url to the news page
 * @returns {object} On success, return an object with success message.
 * - message
 */

const validate = require('validate.js');
const {
    News,
} = require('./associations.js');
const NewsValidationConstraints = require('../constraints/post/news.js');

module.exports = async (opt) => {
    try {
        // Get parameters.
        const {
            author = null,
            title = null,
            image = null,
            url = null,
        } = opt || {};

        // Check if parameters meet constraints. If not, throw 400 error.
        if (typeof (validate({
            author,
            title,
            image,
            url,
        }, NewsValidationConstraints)) !== 'undefined') {
            const error = new Error('Invalid news object.');
            error.status = 400;
            throw error;
        }

        // Create news.
        await News.create({
            author,
            title,
            image,
            url,
        });

        // Return success message.
        return {message: 'News created.'};
    }
    catch (error) {
        if (!error.status)
            error.status = 500;
        throw error;
    }
};
