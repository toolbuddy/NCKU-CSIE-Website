const nationUtils = require('../../utils/nation.js');
const degreeUtils = require('../../utils/degree.js');

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
