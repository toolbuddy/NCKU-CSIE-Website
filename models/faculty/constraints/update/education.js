import ValidateUtils from 'models/common/utils/validate.js';
import nationUtils from 'models/faculty/utils/nation.js';
import degreeUtils from 'models/faculty/utils/degree.js';

const EducationValidationConstraints = {
    educationId: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: ValidateUtils.isValidId,
        },
    },
    nation: {
        presence: false,
        type:     {
            type: value => nationUtils.isSupportedId( value ),
        },
    },
    degree: {
        presence: false,
        type:     {
            type: value => degreeUtils.isSupportedId( value ),
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

export default EducationValidationConstraints;
