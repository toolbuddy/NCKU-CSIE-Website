import TagUtils from 'models/announcement/utils/tag.js';

const TagValidationConstraints = {
    typeId: {
        presence:     true,
        type:     {
            type: value => TagUtils.isSupportedId( value ),
        },
    },
};

export default TagValidationConstraints;
