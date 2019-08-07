import ValidateUtils from 'models/common/utils/validate.js';

const ConferenceValidationConstraints = {
    conferenceId: {
        presence: true,
        type:     {
            type: ValidateUtils.isValidId,
        },
    },
    hostYear: {
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

export default ConferenceValidationConstraints;
