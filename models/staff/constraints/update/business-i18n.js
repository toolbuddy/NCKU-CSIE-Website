const LanguageUtils = require('../../../common/utils/language.js');

const BusinessI18nValidationConstraints = {
    languageId: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    business: {
        presence: {
            allowEmpty: false,
        },
        type: 'string',
        length: {
            maximum: 100,
        },
    },
};

module.exports = BusinessI18nValidationConstraints;
