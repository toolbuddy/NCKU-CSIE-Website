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

        // TODO: type should be blob
    },
    officeTel: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 30,
        },
        format: {
            pattern: '(0[0-9]+-)?[0-9]+(,[0-9]+)*',
        },
    },
    order: {
        presence: false,
        type:     'integer',
    },
};

export default ProfileValidationConstraints;
