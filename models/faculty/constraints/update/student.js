const degreeUtils = require('models/faculty/utils/degree.js');

const StudentValidationConstraints = {
    degree: {
        presence: false,
        type: {
            type: value => degreeUtils.isSupportedId(value),
        },
    },
};

module.exports = StudentValidationConstraints;
