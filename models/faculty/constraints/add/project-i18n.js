import LanguageUtils from 'models/common/utils/language.js';

const ProjectI18nValidationConstraints = {
    language: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    name: {
        presence: true,
        type:       'string',
        length:   {
            maximum: 300,
        },
    },
    support: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 100,
        },
    },
};

export default ProjectI18nValidationConstraints;
