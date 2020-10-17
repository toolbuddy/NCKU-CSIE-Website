const ValidateUtils = require('../../../common/utils/validate.js');

const DeletedFileValidationConstraints = {
    fileId: {
        presence: true,
        type:     {
            type: ValidateUtils.isValidId,
        },
    },
};

module.exports = DeletedFileValidationConstraints;
