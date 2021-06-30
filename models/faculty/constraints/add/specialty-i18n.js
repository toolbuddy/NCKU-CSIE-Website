const LanguageUtils = require('../../../common/utils/language.js');

const SpecialtyI18nValidationConstraints = {
    languageId: {
        presence: true,
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    specialty: {
        presence: true,
        type: 'string',
        length: {
            maximum: 100,
        },
    },
};

module.exports = SpecialtyI18nValidationConstraints;
