import LanguageUtils from 'models/common/utils/language.js';

const ConferenceValidationConstraints = {
    hostYear: {
        presence:     true,
        type:         'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
    conferenceI18n: {
        presence: {
            allowEmpty: false,
        },
        type:     'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
};

export default ConferenceValidationConstraints;
