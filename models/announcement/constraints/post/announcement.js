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
    views: {
        presence:     true,
        type:         'integer',
        numericality: {
            greaterThanOrEqualTo: 0,
        },
    },
    isPinned: {
        presence:     true,
        type:     {
            type: value => ValidateUtils.isValidBoolean( value ),
        },
    },
    isPublished: {
        presence:     true,
        type:     {
            type: value => ValidateUtils.isValidBoolean( value ),
        },
    },
    image: {
        presence:     false,
        type:       'string',
        length:   {
            maximum: 2083,
        },
    },
    i18n: {
        presence: {
            allowEmpty: false,
        },
        type:     'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
};

export default AnnouncementValidationConstraints;
