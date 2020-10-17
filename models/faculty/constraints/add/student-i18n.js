const LanguageUtils = require('../../../common/utils/language.js');

const StudentI18nValidationConstraints = {
    language: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    name: {
        presence: true,
        type:       'string',
        length:   {
            maximum: 100,
        },
    },
};

module.exports = StudentI18nValidationConstraints;
