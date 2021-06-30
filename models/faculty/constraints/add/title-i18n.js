const LanguageUtils = require('../../../common/utils/language.js');

const TitleI18nValidationConstraints = {
    languageId: {
        presence: true,
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    title: {
        presence: {
            allowEmpty: false,
        },
        type: 'string',
        length: {
            maximum: 100,
        },
    },
};

module.exports = TitleI18nValidationConstraints;
