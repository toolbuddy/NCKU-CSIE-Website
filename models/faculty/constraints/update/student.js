import ValidateUtils from 'models/common/utils/validate.js';
import degreeUtils from 'models/faculty/utils/degree.js';

const StudentValidationConstraints = {
    studentId: {
        presence: true,
        type:     {
            type: ValidateUtils.isValidId,
        },
    },
    degree: {
        presence:     false,
        type:     {
            type: value => degreeUtils.isSupportedId( value ),
        },
    },
    i18n: {
        presence: false,
        type:     'array',
    },
};

export default StudentValidationConstraints;
