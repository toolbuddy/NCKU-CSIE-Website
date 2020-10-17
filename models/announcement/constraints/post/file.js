const FileValidationConstraints = {
    name: {
        presence: true,
        type:     'string',
        length:   {
            maximum: 2083,
        },
    },
    content: {
        presence: true,

        // TODO: type should be blob
    },
};

module.exports = FileValidationConstraints;
