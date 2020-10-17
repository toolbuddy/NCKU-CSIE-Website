const LanguageUtils = require('../../../common/utils/language.js');
const ValidateUtils = require('../../../common/utils/validate.js');
const publicationCategoryUtils = require('../../utils/publication-category.js');

const PublicationValidationConstraints = {
    issueYear: {
        presence:     false,
        type:         'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
    issueMonth: {
        presence:     false,
        type:         'integer',
        numericality: {
            greaterThan:       0,
            lessThanOrEqualTo: 12,
        },
    },
    category: {
        presence: true,
        type:     {
            type: value => publicationCategoryUtils.isSupportedId( value ),
        },
    },
    international: {
        presence: true,
        type:     {
            type: value => ValidateUtils.isValidBoolean( value ),
        },
    },
    refereed: {
        presence: true,
        type:     {
            type: value => ValidateUtils.isValidBoolean( value ),
        },
    },
    publicationI18n: {
        presence: {
            allowEmpty: false,
        },
        type:     'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
};

module.exports = PublicationValidationConstraints;
