const ValidateUtils = require('../../../common/utils/validate.js');
const publicationCategoryUtils = require('../../utils/publication-category.js');

const PublicationValidationConstraints = {
    issueYear: {
        presence: false,
        type: 'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
    issueMonth: {
        presence: false,
        type: 'integer',
        numericality: {
            greaterThan: 0,
            lessThanOrEqualTo: 12,
        },
    },
    category: {
        presence: false,
        type: {
            type: value => publicationCategoryUtils.isSupportedId(value),
        },
    },
    international: {
        presence: false,
        type: {
            type: value => ValidateUtils.isValidBoolean(value),
        },
    },
    refereed: {
        presence: false,
        type: {
            type: value => ValidateUtils.isValidBoolean(value),
        },
    },
};

module.exports = PublicationValidationConstraints;
