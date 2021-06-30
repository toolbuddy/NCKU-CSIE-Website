const LanguageUtils = require('../../../common/utils/language.js');

const TechnologyTransferI18nValidationConstraints = {
    languageId: {
        presence: true,
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    technology: {
        presence: true,
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
