const LanguageUtils = require('../../../common/utils/language.js');

const ExperienceValidationConstraints = {
    from: {
        presence: false,
        type: 'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
    to: {
        presence: false,
        type: 'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
    experienceI18n: {
        presence: {
            allowEmpty: false,
        },
        type: 'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
};

module.exports = ExperienceValidationConstraints;
