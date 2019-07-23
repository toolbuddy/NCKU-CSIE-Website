import ValidateUtils from 'models/common/utils/validate.js';

const AwardI18nValidationConstraints = {
    awardId: {
        presence:     true,
        allowEmpty:   false,
        type:         'integer',
        numericality: {
            greaterThanOrEqualTo: 0,
        },
    },
    language: {
        presence:   true,
        allowEmpty: false,
        type:       ValidateUtils.isSupportedLanguageId,
    },
    award: {
        presence:   true,
        allowEmpty: false,
        type:       'string',
    },
};

export default AwardI18nValidationConstraints;
