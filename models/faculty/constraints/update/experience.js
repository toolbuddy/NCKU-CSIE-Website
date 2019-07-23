import ValidateUtils from 'models/common/utils/validate.js';

const ExperienceValidationConstraints = {
    experienceId: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: ValidateUtils.isValidId,
        },
    },
    from: {
        presence:     false,
        type:         'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
    to: {
        presence:     false,
        type:         'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
};

export default ExperienceValidationConstraints;
