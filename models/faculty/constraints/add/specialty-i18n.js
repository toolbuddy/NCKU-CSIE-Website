import LanguageUtils from 'models/common/utils/language.js';

const SpecialtyI18nValidationConstraints = {
    language: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    specialty: {
        presence: {
            allowEmpty: false,
        },
        type:       'string',
        length: {
            maximum: 100,
        },
    },
};

export default SpecialtyI18nValidationConstraints;
