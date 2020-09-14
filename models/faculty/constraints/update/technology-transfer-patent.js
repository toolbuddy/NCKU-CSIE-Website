import ValidateUtils from 'models/common/utils/validate.js';

const TechnologyTransferPatentValidationConstraints = {
    technologyTransferPatentId: {
        presence:     true,
        type:     {
            type: value => ValidateUtils.isValidId( value ),
        },
    },
};

export default TechnologyTransferPatentValidationConstraints;
