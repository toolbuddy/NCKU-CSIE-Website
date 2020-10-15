const LanguageUtils = require('models/common/utils/language.js');

const TechnologyTransferI18nValidationConstraints = {
    language: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    technology: {
        presence: false,
        type: 'string',
        length: {
            maximum: 300,
        },
    },
    authorizingParty: {
        presence: false,
        type: 'string',
        length: {
            maximum: 100,
        },
    },
    authorizedParty: {
        presence: false,
        type: 'string',
        length: {
            maximum: 100,
        },
    },
};

module.exports = TechnologyTransferI18nValidationConstraints;
