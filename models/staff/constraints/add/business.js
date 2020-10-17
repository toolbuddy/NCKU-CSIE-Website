const LanguageUtils = require('../../../common/utils/language.js');

const BusinessValidationConstraints = {
    businessI18n: {
        presence: {
            allowEmpty: false,
        },
        type:     'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
};

module.exports = BusinessValidationConstraints;
