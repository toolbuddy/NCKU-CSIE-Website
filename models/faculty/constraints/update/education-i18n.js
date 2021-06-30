const LanguageUtils = require('../../../common/utils/language.js');

const EducationI18nValidationConstraints = {
    languageId: {
        presence: true,
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    school: {
        presence: false,
        type: 'string',
        length: {
            maximum: 100,
        },
    },
    major: {
        presence: false,
        type: 'string',
        length: {
            maximum: 100,
        },
    },
};

module.exports = EducationI18nValidationConstraints;
