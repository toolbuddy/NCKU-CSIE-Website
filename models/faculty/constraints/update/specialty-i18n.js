const LanguageUtils = require('../../../common/utils/language.js');

const SpecialtyI18nValidationConstraints = {
    languageId: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    specialty: {
        presence: {
            allowEmpty: false,
        },
        type: 'string',
        length: {
            maximum: 100,
        },
    },
};

module.exports = SpecialtyI18nValidationConstraints;
