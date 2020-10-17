const LanguageUtils = require('../../../common/utils/language.js');

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
        presence: false,
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

module.exports = ExperienceI18nValidationConstraints;
