/**
 * A function to get a specific newsby its id.
 *
 * @async
 * @param {number} newsId - Id of the requested news.
 * @returns {object} Related information of the requested news, including:
 * - id
 * - title
 * - image
 * - url
 */

const {
    News,
} = require('./associations.js');
const ValidateUtils = require('../../common/utils/validate.js');

module.exports = async (opt) => {
    try {
        // Get parameters.
        const {
            newsId = null,
        } = opt || {};

        if (!ValidateUtils.isPositiveInteger(newsId)) {
            const error = new Error('Invalid news id.');
            error.status = 400;
            throw error;
        }

        // Get an news's detail with specific id.
        const news = await News.findOne({
            attributes: [
                'newsId',
                'title',
                'url',
                'image',
            ],
            where: {
                newsId,
            }
        });

        // If no news returned, throw 404 error.
        if (!news) {
            const error = new Error('News not found.');
            error.status = 404;
            throw error;
        }

        // Return everything related to this news in flatten format.
        return {
            newsId: news.newsId,
            image: news.image,
            title: news.title,
            url: news.url,
        };
    }
    catch (error) {
        if (!error.status)
            error.status = 500;
        throw error;
    }
};
