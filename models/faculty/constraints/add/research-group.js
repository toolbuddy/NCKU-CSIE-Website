const researchGroupUtils = require('../../utils/research-group.js');

const ResearchGroupValidationConstraints = {
    type: {
        presence:     true,
        type:     {
            type: value => researchGroupUtils.isSupportedId( value ),
        },
    },
};

module.exports = ResearchGroupValidationConstraints;
