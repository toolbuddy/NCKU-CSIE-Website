const ProfileValidationConstraints = {
    email: {
        presence: false,
        type:     'string',
        length:   {
            maximum: 2083,
        },
        email:    true,
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
        format: {
            pattern: '(([0-9]+))*([0-9]+-)*[0-9]+(,[0-9]+)?',
        },
    },
    order: {
        presence: false,
        type:     'integer',
    },
    i18n: {
        presence: false,
        type:     'array',
    },
};

export default ProfileValidationConstraints;
