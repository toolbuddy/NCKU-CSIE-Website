import LanguageUtils from 'models/common/utils/language.js';

const AwardI18nValidationConstraints = {
    language: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    award: {
        presence: true,
        type:       'string',
        length:   {
            maximum: 300,
        },
    },
};

export default AwardI18nValidationConstraints;
