import LanguageUtils from 'models/common/utils/language.js';
import projectCategoryUtils from 'models/faculty/utils/project-category.js';

const ProjectValidationConstraints = {
    from: {
        presence:     true,
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
        presence: true,
        type:     {
            type: value => projectCategoryUtils.isSupportedId( value ),
        },
    },
    i18n: {
        presence: {
            allowEmpty: false,
        },
        type:     'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
};

export default ProjectValidationConstraints;
