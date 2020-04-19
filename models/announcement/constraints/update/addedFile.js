const AddedFileValidationConstraints = {
    name: {
        presence: true,
        type:     'string',
        length:   {
            maximum: 2083,
        },
    },
    content: {
        type:     'string',
        presence: true,
    },
};

export default AddedFileValidationConstraints;
