import nationUtils from 'models/faculty/utils/nation.js';
import ValidateUtils from 'models/common/utils/validate.js';

const PatentValidationConstraints = {
    patentId: {
        presence: true,
        type:     {
            type: ValidateUtils.isValidId,
        },
    },
    nation: {
        presence: false,
        type:     {
            type: value => nationUtils.isSupportedId( value ),
        },
    },
    certificationNumber: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 100,
        },
    },
    applicationDate: {
        presence: false,
        type:     {
            type: value => ValidateUtils.isValidDate( value ),
        },
    },
    issueDate: {
        presence: false,
        type:     {
            type: value => ValidateUtils.isValidDate( value ),
        },
    },
    expireDate: {
        presence: false,
        type:     {
            type: value => ValidateUtils.isValidDate( value ),
        },
    },
    i18n: {
        presence: false,
        type:     'array',
    },
};

export default PatentValidationConstraints;
