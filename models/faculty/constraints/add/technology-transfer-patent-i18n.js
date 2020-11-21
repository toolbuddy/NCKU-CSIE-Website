const LanguageUtils = require('../../../common/utils/language.js');

const TechnologyTransferPatentI18nValidationConstraints = {
    languageId: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    patent: {
        presence: true,
        type: 'string',
        length: {
            maximum: 300,
        },
    },
};

module.exports = TechnologyTransferPatentI18nValidationConstraints;
