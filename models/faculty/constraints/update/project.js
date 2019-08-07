import projectCategoryUtils from 'models/faculty/utils/project-category.js';
import ValidateUtils from 'models/common/utils/validate.js';

const ProjectValidationConstraints = {
    projectId: {
        presence: true,
        type:     {
            type: ValidateUtils.isValidId,
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
    category: {
        presence: false,
        type:     {
            type: value => projectCategoryUtils.isSupportedId( value ),
        },
    },
    i18n: {
        presence: false,
        type:     'array',
    },
};

export default ProjectValidationConstraints;
