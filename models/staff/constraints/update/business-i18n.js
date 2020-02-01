import ValidateUtils from 'models/common/utils/validate.js';
import LanguageUtils from 'models/common/utils/language.js';

const BusinessI18nValidationConstraints = {
    businessId: {
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
    business: {
        presence: {
            allowEmpty: false,
        },
        type:       'string',
        length: {
            maximum: 100,
        },
    },
};

export default BusinessI18nValidationConstraints;
