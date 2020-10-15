const degreeUtils = require('../../utils/degree.js');

const StudentValidationConstraints = {
    degree: {
        presence: false,
        type: {
            type: value => degreeUtils.isSupportedId(value),
        },
    },
};

module.exports = StudentValidationConstraints;
