const TagUtils = require('models/announcement/utils/tag.js');

const TagValidationConstraints = {
    tagId: {
        presence: true,
        type: {
            type: value => TagUtils.isSupportedId(value),
        },
    },
};

module.exports = TagValidationConstraints;
