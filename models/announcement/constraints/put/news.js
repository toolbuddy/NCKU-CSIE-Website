const ValidateUtils = require('../../../common/utils/validate.js');

const NewsValidationConstraints = {
    newsId: {
        presence: true,
        type: {
            type: ValidateUtils.isValidId,
        },
    },
    image: {
        presence: false,

        // TODO: type should be blob
    },
    title: {
        presence: true,
        type: 'string',
        length: {
            maximum: 300,
        },
    },
    url: {
        presence: true,
        type: 'string',
        length: {
            maximum: 2083,
        },
        url: true,
    },
};

module.exports = NewsValidationConstraints;
