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
    receivedMonth: {
        presence:     false,
        type:         'integer',
        numericality: {
            greaterThan:       0,
            lessThanOrEqualTo: 12,
        },
    },
    receivedDay: {
        presence:     false,
        type:         'integer',
        numericality: {
            greaterThan:       0,
            lessThanOrEqualTo: 31,
        },
    },
    i18n: {
        presence: false,
        type:     'array',
    },
};

export default AwardValidationConstraints;
