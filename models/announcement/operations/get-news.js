/**
 * A function to get news for home page
 *
 * @async
 * @function
 * @param {number}   amount      - Specify how many news to be returned.
 * @param {number}   page        - Specify the news under the given page number.
 * @returns {object[]} Requested announcement briefings, including:
 * - id
 * - author
 * - title
 * - image
 * - url
 * - publishTime
 */

const {
    News,
} = require('./associations.js');
const ValidateUtils = require('../../common/utils/validate.js');

module.exports = async (opt) => {
    try {
        // Get parameters.
        const {
            amount = null,
            page = null,
        } = opt || {};

        if (!ValidateUtils.isPositiveInteger(amount)) {
            const error = new Error('Invalid amount.');
            error.status = 400;
            throw error;
        }
        if (!ValidateUtils.isPositiveInteger(page)) {
            const error = new Error('Invalid page.');
            error.status = 400;
            throw error;
        }

        // Get news.
        const news = await News.findAll({
            attributes: [
                'newsId',
                'author',
                'title',
                'image',
                'url',
                'publishTime',
            ],
            order: [
                [
                    'publishTime',
                    'DESC',
                ],
            ],
            offset: amount * (page - 1),
            limit: amount,
        });

        // If no news returned, throw 404 error.
        if (!news.length) {
            const error = new Error('No result.');
            error.status = 404;
            throw error;
        }

        // Return news with the flatten format.
        return news.map(report => ({
            newsId: report.newsId,
            author: report.author,
            title: report.title,
            image: report.image,
            url: report.url,
            publishTime: report.publishTime,
        }));
    }
    catch (error) {
        if (!error.status)
            error.status = 500;
        throw error;
    }
};
