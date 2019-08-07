import LanguageUtils from 'models/common/utils/language.js';

const AwardValidationConstraints = {
    receivedYear: {
        presence:     true,
        type:         'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
    receivedMonth: {
        presence:     false,
        type:         'integer',
        numericality: {
            greaterThan:       0,
            lessThanOrEqualTo: 12,
        },
    },
    receivedDay: {
        presence:     false,
        type:         'integer',
        numericality: {
            greaterThan:       0,
            lessThanOrEqualTo: 31,
        },
    },
    i18n: {
        presence: {
            allowEmpty: false,
        },
        type:     'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
};

export default AwardValidationConstraints;
