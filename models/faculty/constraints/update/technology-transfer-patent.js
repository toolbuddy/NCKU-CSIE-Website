import ValidateUtils from 'models/common/utils/validate.js';

const TechnologyTransferPatentValidationConstraints = {
    technologyTransferPatentId: {
        presence:     true,
        type:     {
            type: value => ValidateUtils.isValidId( value ),
        },
    },
    i18n: {
        presence: {
            allowEmpty: false,
        },
        type:     'array',
    },
};

export default TechnologyTransferPatentValidationConstraints;
