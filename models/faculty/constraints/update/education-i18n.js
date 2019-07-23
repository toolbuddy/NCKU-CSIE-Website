import ValidateUtils from 'models/common/utils/validate.js';
import LanguageUtils from 'models/common/utils/language.js';

const EducationI18nValidationConstraints = {
    educationId: {
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
    school: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 100,
        },
    },
    major: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 100,
        },
    },
};

export default EducationI18nValidationConstraints;
