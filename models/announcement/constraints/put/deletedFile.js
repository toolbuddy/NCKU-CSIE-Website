import ValidateUtils from 'models/common/utils/validate.js';

const DeletedFileValidationConstraints = {
    fileId: {
        presence: true,
        type:     {
            type: ValidateUtils.isValidId,
        },
    },
};

export default DeletedFileValidationConstraints;
