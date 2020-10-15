const LanguageUtils = require('../../../common/utils/language.js');

const AwardValidationConstraints = {
    receivedYear: {
        presence: true,
        type: 'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
    awardI18n: {
        presence: {
            allowEmpty: false,
        },
        type: 'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
};

module.exports = AwardValidationConstraints;
