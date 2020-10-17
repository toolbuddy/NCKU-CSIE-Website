const StudentAwardValidationConstraints = {
    receivedYear: {
        presence:     false,
        type:         'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
};

module.exports = StudentAwardValidationConstraints;
