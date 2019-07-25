import LanguageUtils from 'models/common/utils/language.js';

const TitleI18nValidationConstraints = {
    language: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    title: {
        presence: {
            allowEmpty: false,
        },
        type:       'string',
        length: {
            maximum: 100,
        },
    },
};

export default TitleI18nValidationConstraints;
