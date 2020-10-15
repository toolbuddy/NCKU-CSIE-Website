const LanguageUtils = require('models/common/utils/language.js');

const AnnouncementI18nValidationConstraints = {
    language: {
        presence: true,
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    title: {
        presence: true,
        type: 'string',
        length: {
            maximum: 300,
        },
    },
    content: {
        presence: true,
        type: 'string',
    },
};

module.exports = AnnouncementI18nValidationConstraints;
