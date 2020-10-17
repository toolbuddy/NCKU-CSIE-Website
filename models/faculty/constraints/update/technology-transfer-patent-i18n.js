const LanguageUtils = require('../../../common/utils/language.js');

const TechnologyTransferPatentI18nValidationConstraints = {
    language: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    patent: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 300,
        },
    },
};

module.exports = TechnologyTransferPatentI18nValidationConstraints;
