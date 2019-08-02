import LanguageUtils from 'models/common/utils/language.js';

const ExperienceI18nValidationConstraints = {
    language: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    organization: {
        presence: true,
        type:       'string',
        length:   {
            maximum: 100,
        },
    },
    department: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 100,
        },
    },
    title: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 100,
        },
    },
};

export default ExperienceI18nValidationConstraints;
