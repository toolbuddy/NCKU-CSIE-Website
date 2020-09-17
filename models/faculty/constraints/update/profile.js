import nationUtils from 'models/faculty/utils/nation.js';

const ProfileValidationConstraints = {
    fax: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 20,
        },
    },
    email: {
        presence: false,
        type:     'string',
        length:   {
            maximum: 2083,
        },
        email:    true,
    },
    personalWeb: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 2083,
        },
        url:      true,
    },
    nation: {
        presence: false,
        type:     {
            type: value => nationUtils.isSupportedId( value ),
        },
    },
    photo: {
        presence: false,

        // TODO: type should be blob
    },
    officeTel: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 30,
        },
        format: {
            pattern: '(([0-9]+))*([0-9]+-)*[0-9]+(,[0-9]+)?',
        },
    },
    labTel: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 30,
        },
        format: {
            pattern: '(([0-9]+))*([0-9]+-)*[0-9]+(,[0-9]+)?',
        },
    },
    labWeb: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 2083,
        },
        url:      true,
    },
    order: {
        presence: false,
        type:     'integer',
    },
};

export default ProfileValidationConstraints;
