const nationUtils = require('models/faculty/utils/nation.js');
const degreeUtils = require('models/faculty/utils/degree.js');
const LanguageUtils = require('models/common/utils/language.js');

const EducationValidationConstraints = {
    nation: {
        presence: true,
        type: {
            type: value => nationUtils.isSupportedId(value),
        },
    },
    degree: {
        presence: true,
        type: {
            type: value => degreeUtils.isSupportedId(value),
        },
    },
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
    educationI18n: {
        presence: {
            allowEmpty: false,
        },
        type: 'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
};

module.exports = EducationValidationConstraints;
