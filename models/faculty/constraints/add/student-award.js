const LanguageUtils = require('../../../common/utils/language.js');

const StudentAwardValidationConstraints = {
    receivedYear: {
        presence: false,
        type: 'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
    studentAwardI18n: {
        presence: {
            allowEmpty: false,
        },
        type: 'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
};

module.exports = StudentAwardValidationConstraints;
