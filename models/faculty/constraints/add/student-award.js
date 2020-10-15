const LanguageUtils = require('models/common/utils/language.js');

const StudentAwardValidationConstraints = {
    receivedYear: {
        presence: true,
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
