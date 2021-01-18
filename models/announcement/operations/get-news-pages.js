/**
 * A function to get the number of pages to display all news.
 *
 * @async
 * @function
 * @param {number}   amount      - Specify the number of announcements in one page.
 * @returns {object} The number of pages required to display all the news.
 * - pages
 */

const Sequelize = require('sequelize');
const {
    News,
} = require('./associations.js');
const ValidateUtils = require('../../common/utils/validate.js');

const op = Sequelize.Op;

module.exports = async (opt) => {
    try {
        // Get parameters.
        const {
            amount = null,
        } = opt || {};

        if (!ValidateUtils.isPositiveInteger(amount)) {
            const error = new Error('Invalid amount.');
            error.status = 400;
            throw error;
        }

        // Get news count
        const newsCount = await News.count();

        // If news count is zero, throw 404 error.
        if (!newsCount === 0) {
            const error = new Error('No result.');
            error.status = 404;
            throw error;
        }

        // Return the number of pages.
        return {
            pages: Math.ceil(newsCount / amount),
        };
    }
    catch (error) {
        if (!error.status)
            error.status = 500;
        throw error;
    }
};
