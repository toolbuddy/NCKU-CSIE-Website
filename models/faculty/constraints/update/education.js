const nationUtils = require('models/faculty/utils/nation.js');
const degreeUtils = require('models/faculty/utils/degree.js');

const EducationValidationConstraints = {
    nation: {
        presence: false,
        type: {
            type: value => nationUtils.isSupportedId(value),
        },
    },
    degree: {
        presence: false,
        type: {
            type: value => degreeUtils.isSupportedId(value),
        },
    },
    from: {
        presence: false,
        type: 'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
    to: {
        presence: false,
        type: 'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
};

module.exports = EducationValidationConstraints;
