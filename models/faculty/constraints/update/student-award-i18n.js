const LanguageUtils = require('../../../common/utils/language.js');

const StudentAwardI18nValidationConstraints = {
    language: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    award: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 300,
        },
    },
};

module.exports = StudentAwardI18nValidationConstraints;
