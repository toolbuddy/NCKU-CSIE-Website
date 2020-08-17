import researchGroupUtils from 'models/faculty/utils/research-group.js';

const ResearchGroupValidationConstraints = {
    type: {
        presence:     true,
        type:     {
            type: value => researchGroupUtils.isSupportedId( value ),
        },
    },
};

export default ResearchGroupValidationConstraints;
