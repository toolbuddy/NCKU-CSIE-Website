/**
 * A function to update news with given id.
 *
 * @async
 * @function
 * @param {number} newsId - Id of the requested news.
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
const NewsValidationConstraints = require('../constraints/put/news.js');

module.exports = async (opt) => {
    try {
        // Get parameters.
        const {
            newsId = null,
            image = null,
            title = null,
            url = null,
        } = opt || {};

        // Check if parameters meet constraints. If not, throw 400 error.
        if (typeof (validate({
            newsId,
            image,
            title,
            url,
        }, NewsValidationConstraints)) !== 'undefined') {
            const error = new Error('Invalid news object');
            error.status = 400;
            throw error;
        }

        // Update news.
        await News.update(
            image ?
                {
                    image,
                    title,
                    url,
                } :
                {
                    title,
                    url,

                },
            {
                where: {
                    newsId,
                },
            },
        );

        // Return success message.
        return {message: 'News updated.'};
    }
    catch (error) {
        if (!error.status)
            error.status = 500;
        throw error;
    }
};
