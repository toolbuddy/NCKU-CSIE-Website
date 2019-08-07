import LanguageUtils from 'models/common/utils/language.js';

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
        presence: true,
        type:       'string',
        length:   {
            maximum: 300,
        },
    },
    authorizingParty: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 100,
        },
    },
    authorizedParty: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 100,
        },
    },
};

export default TechnologyTransferI18nValidationConstraints;
