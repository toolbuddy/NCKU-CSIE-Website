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
        type:       'string',
        length:   {
            maximum: 2083,
        },
    },
    personalWeb: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 2083,
        },
    },
    nation: {
        presence: false,
        type:     {
            type: value => nationUtils.isSupportedId( value ),
        },
    },
    photo: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 2083,
        },
    },
    officeTel: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 30,
        },
    },
    labTel: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 30,
        },
    },
    labWeb: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 2083,
        },
    },
    order: {
        presence: false,
        type:     'integer',
    },
};

export default ProfileValidationConstraints;
