const LanguageUtils = require('../../../common/utils/language.js');

const StudentAwardI18nValidationConstraints = {
    languageId: {
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

module.exports = StudentAwardI18nValidationConstraints;
