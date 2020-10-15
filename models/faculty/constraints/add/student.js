const LanguageUtils = require('models/common/utils/language.js');
const ValidateUtils = require('models/common/utils/validate.js');
const degreeUtils = require('models/faculty/utils/degree.js');

const StudentValidationConstraints = {
    degree: {
        presence: true,
        type: {
            type: value => degreeUtils.isSupportedId(value),
        },
    },
    studentAwardId: {
        presence: true,
        type: {
            type: value => ValidateUtils.isValidId(value),
        },
    },
    studentI18n: {
        presence: {
            allowEmpty: false,
        },
        type: 'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
};

module.exports = StudentValidationConstraints;
