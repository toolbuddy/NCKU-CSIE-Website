import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils from 'models/common/utils/validate.js';

const AnnouncementValidationConstraints = {
    announcementId: {
        presence: true,
        type:     {
            type: ValidateUtils.isValidId,
        },
    },

    // IsPublished: {
    //     presence:     true,
    //     type:     {
    //         type: value => ValidateUtils.isValidBoolean( value ),
    //     },
    // },
    image: {
        presence:     false,
        type:       'string',
        length:   {
            maximum: 2083,
        },
    },
    announcementI18n: {
        presence: {
            allowEmpty: false,
        },
        type:     'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
    addedFiles: {
        presence: true,
        type:     'array',
    },
    deletedFiles: {
        presence: true,
        type:     'array',
    },
    tags: {
        presence: {
            allowEmpty: false,
        },
        type:     'array',
    },
};

export default AnnouncementValidationConstraints;
