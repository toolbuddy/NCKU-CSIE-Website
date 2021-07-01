const LanguageUtils = require('../../../common/utils/language.js');

const PatentI18nValidationConstraints = {
    languageId: {
        presence: true,
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    inventor: {
        presence: false,
        type: 'string',
        length: {
            maximum: 300,
        },
    },
    patentOwner: {
        presence: false,
        type: 'string',
        length: {
            maximum: 300,
        },
    },
    patent: {
        presence: false,
        type: 'string',
        length: {
            maximum: 300,
        },
    },
};

module.exports = PatentI18nValidationConstraints;
