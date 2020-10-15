const LanguageUtils = require('models/common/utils/language.js');
const ValidateUtils = require('models/common/utils/validate.js');

const TechnologyTransferPatentValidationConstraints = {
    technologyTransferId: {
        presence: true,
        type: {
            type: value => ValidateUtils.isValidId(value),
        },
    },
    technologyTransferPatentI18n: {
        presence: {
            allowEmpty: false,
        },
        type: 'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
};

module.exports = TechnologyTransferPatentValidationConstraints;
