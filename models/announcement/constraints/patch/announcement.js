import ValidateUtils from 'models/common/utils/validate.js';

const AnnouncementValidationConstraints = {
    announcementId: {
        presence: true,
        type:     {
            type: ValidateUtils.isValidId,
        },
    },
    publishTime: {
        presence:     false,
        type:     {
            type: ValidateUtils.isValidDate,
        },
    },
    updateTime: {
        presence:     false,
        type:     {
            type: ValidateUtils.isValidDate,
        },
    },
    author: {
        presence:     false,
        type:     {
            type: ValidateUtils.isValidId,
        },
    },
    views: {
        presence:     false,
        type:         'integer',
        numericality: {
            greaterThanOrEqualTo: 0,
        },
    },
    isPinned: {
        presence:     false,
        type:     {
            type: value => ValidateUtils.isValidBoolean( value ),
        },
    },
    isPublished: {
        presence:     false,
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
        presence: false,
        type:     'array',
    },
};

export default AnnouncementValidationConstraints;
