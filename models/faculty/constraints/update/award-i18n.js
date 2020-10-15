const LanguageUtils = require('models/common/utils/language.js');

const AwardI18nValidationConstraints = {
    language: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    award: {
        presence: true,
        type: 'string',
        length: {
            maximum: 300,
        },
    },
};

module.exports = AwardI18nValidationConstraints;
