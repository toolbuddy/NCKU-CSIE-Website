import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils from 'models/common/utils/validate.js';

const AnnouncementValidationConstraints = {
    publishTime: {
        presence:     true,
        type:     {
            type: ValidateUtils.isValidDate,
        },
    },
    updateTime: {
        presence:     true,
        type:     {
            type: ValidateUtils.isValidDate,
        },
    },
    author: {
        presence:     true,
        type:     {
            type: ValidateUtils.isValidId,
        },
    },
    isPinned: {
        presence:     true,
        type:     {
            type: value => ValidateUtils.isValidBoolean( value ),
        },
    },
    // isPublished: {
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
    files: {
        presence: true,
        type:     'array',
    },
    tags: {
        presence: {
            allowEmpty: false,
        },
        type:     'array',
    }
};

export default AnnouncementValidationConstraints;
