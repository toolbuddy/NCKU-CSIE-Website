import LanguageUtils from 'models/common/utils/language.js';

const TitleValidationConstraints = {
    titleI18n: {
        presence: {
            allowEmpty: false,
        },
        type:     'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
};

export default TitleValidationConstraints;
