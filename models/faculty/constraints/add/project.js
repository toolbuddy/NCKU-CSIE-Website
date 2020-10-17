const LanguageUtils = require('../../../common/utils/language.js');
const projectCategoryUtils = require('../../utils/project-category.js');

const ProjectValidationConstraints = {
    from: {
        presence: true,
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
    category: {
        presence: true,
        type: {
            type: value => projectCategoryUtils.isSupportedId(value),
        },
    },
    projectI18n: {
        presence: {
            allowEmpty: false,
        },
        type: 'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
};

module.exports = ProjectValidationConstraints;
