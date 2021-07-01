const LanguageUtils = require('../../../common/utils/language.js');

const ProjectI18nValidationConstraints = {
    languageId: {
        presence: true,
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    name: {
        presence: true,
        type: 'string',
        length: {
            maximum: 300,
        },
    },
    support: {
        presence: false,
        type: 'string',
        length: {
            maximum: 100,
        },
    },
};

module.exports = ProjectI18nValidationConstraints;
