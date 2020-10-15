const ValidateUtils = require('../../../common/utils/validate.js');

const AdminValidationConstraints = {
    userId: {
        presence: true,
        type: {
            type: ValidateUtils.isValidId,
        },
    },
    account: {
        presence: false,
        type: 'string',
        length: {
            maximum: 200,
        },
    },
    password: {
        presence: false,
        type: 'string',
        length: {
            maximum: 255,
        },
    },
    role: {
        presence: false,
        type: {
            type: ValidateUtils.isValidId,
        },
    },
    roleId: {
        presence: false,
        type: {
            type: ValidateUtils.isValidId,
        },
    },
};

module.exports = AdminValidationConstraints;
