const AddedFileValidationConstraints = {
    name: {
        presence: true,
        type:     'string',
        length:   {
            maximum: 2083,
        },
    },
    content: {
        presence: true,
    },
};

export default AddedFileValidationConstraints;
