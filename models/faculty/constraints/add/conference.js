const LanguageUtils = require('../../../common/utils/language.js');

const ConferenceValidationConstraints = {
    hostYear: {
        presence: false,
        type: 'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
    conferenceI18n: {
        presence: {
            allowEmpty: false,
        },
        type: 'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
};

module.exports = ConferenceValidationConstraints;
