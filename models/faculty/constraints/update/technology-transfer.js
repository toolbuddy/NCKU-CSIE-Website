import ValidateUtils from 'models/common/utils/validate.js';

const TechnologyTransferValidationConstraints = {
    technologyTransferId: {
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
    i18n: {
        presence: false,
        type:     'array',
    },
};

export default TechnologyTransferValidationConstraints;
