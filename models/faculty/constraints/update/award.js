import ValidateUtils from 'models/common/utils/validate.js';

const AwardValidationConstraints = {
    awardId: {
        presence: true,
        type:     {
            type: ValidateUtils.isValidId,
        },
    },
    receivedYear: {
        presence:     false,
        type:         'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
    i18n: {
        presence: false,
        type:     'array',
    },
};

export default AwardValidationConstraints;
