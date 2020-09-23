import degreeUtils from 'models/faculty/utils/degree.js';

const StudentValidationConstraints = {
    degree: {
        presence:     false,
        type:     {
            type: value => degreeUtils.isSupportedId( value ),
        },
    },
};

export default StudentValidationConstraints;
