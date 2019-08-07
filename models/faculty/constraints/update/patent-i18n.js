import LanguageUtils from 'models/common/utils/language.js';

const PatentI18nValidationConstraints = {
    language: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    inventor: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 300,
        },
    },
    patentOwner: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 300,
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

export default PatentI18nValidationConstraints;
