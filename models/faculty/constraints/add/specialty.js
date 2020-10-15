const LanguageUtils = require('models/common/utils/language.js');

const SpecialtyValidationConstraints = {
    specialtyI18n: {
        presence: {
            allowEmpty: false,
        },
        type: 'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
};

module.exports = SpecialtyValidationConstraints;
