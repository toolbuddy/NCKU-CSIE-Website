import LanguageUtils from 'models/common/utils/language.js';

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
        presence: true,
        type:       'string',
        length:   {
            maximum: 300,
        },
    },
};

export default TechnologyTransferPatentI18nValidationConstraints;
