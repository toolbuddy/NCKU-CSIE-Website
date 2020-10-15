const LanguageUtils = require('models/common/utils/language.js');

const ExperienceValidationConstraints = {
    from: {
        presence: true,
        type: 'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
    to: {
        presence: true,
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
