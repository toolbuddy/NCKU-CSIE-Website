const LanguageUtils = require('models/common/utils/language.js');
const ValidateUtils = require('models/common/utils/validate.js');
const nationUtils = require('models/faculty/utils/nation.js');

const PatentValidationConstraints = {
    nation: {
        presence: true,
        type: {
            type: value => nationUtils.isSupportedId(value),
        },
    },
    certificationNumber: {
        presence: false,
        type: 'string',
        length: {
            maximum: 100,
        },
    },
    applicationDate: {
        presence: false,
        type: {
            type: value => ValidateUtils.isValidDate(value),
        },
    },
    issueDate: {
        presence: false,
        type: {
            type: value => ValidateUtils.isValidDate(value),
        },
    },
    expireDate: {
        presence: false,
        type: {
            type: value => ValidateUtils.isValidDate(value),
        },
    },
    patentI18n: {
        presence: {
            allowEmpty: false,
        },
        type: 'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
};

module.exports = PatentValidationConstraints;
