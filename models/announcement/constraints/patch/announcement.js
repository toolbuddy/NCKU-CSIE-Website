const ValidateUtils = require('models/common/utils/validate.js');

const AnnouncementValidationConstraints = {
    announcementId: {
        presence: true,
        type: {
            type: ValidateUtils.isValidId,
        },
    },
    isPinned: {
        presence: false,
        type: {
            type: value => ValidateUtils.isValidBoolean(value),
        },
    },
};

module.exports = AnnouncementValidationConstraints;
