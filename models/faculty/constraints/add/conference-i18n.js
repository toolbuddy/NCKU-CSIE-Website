const LanguageUtils = require('../../../common/utils/language.js');

const ConferenceI18nValidationConstraints = {
    languageId: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    conference: {
        presence: true,
        type: 'string',
        length: {
            maximum: 300,
        },
    },
    title: {
        presence: true,
        type: 'string',
        length: {
            maximum: 300,
        },
    },
};

module.exports = ConferenceI18nValidationConstraints;
