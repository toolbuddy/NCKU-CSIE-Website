const LanguageUtils = require('../../../common/utils/language.js');
const ValidateUtils = require('../../../common/utils/validate.js');

const AnnouncementValidationConstraints = {
    author: {
        presence: true,
        type: {
            type: ValidateUtils.isValidId,
        },
    },
    image: {
        presence: false,

        // TODO: type should be blob
        type: 'string',
        length: {
            maximum: 2083,
        },
    },
    announcementI18n: {
        presence: {
            allowEmpty: false,
        },
        type: 'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
    files: {
        presence: true,
        type: 'array',
    },
    tags: {
        presence: {
            allowEmpty: false,
        },
        type: 'array',
    },
};

module.exports = AnnouncementValidationConstraints;
