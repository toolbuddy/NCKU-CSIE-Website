import ValidateUtils from 'models/common/utils/validate.js';
import LanguageUtils from 'models/common/utils/language.js';

const TitleI18nValidationConstraints = {
    titleId: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: ValidateUtils.isValidId,
        },
    },
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
