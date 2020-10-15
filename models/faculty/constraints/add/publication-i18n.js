const LanguageUtils = require('../../../common/utils/language.js');

const PublicationI18nValidationConstraints = {
    language: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    title: {
        presence: true,
        type: 'string',
        length: {
            maximum: 500,
        },
    },
    authors: {
        presence: true,
        type: 'string',
        length: {
            maximum: 500,
        },
    },
};

module.exports = PublicationI18nValidationConstraints;
