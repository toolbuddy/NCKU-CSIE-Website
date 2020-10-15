const LanguageUtils = require('../../../common/utils/language.js');

const EducationI18nValidationConstraints = {
    language: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    school: {
        presence: true,
        type: 'string',
        length: {
            maximum: 100,
        },
    },
    major: {
        presence: true,
        type: 'string',
        length: {
            maximum: 100,
        },
    },
};

module.exports = EducationI18nValidationConstraints;
