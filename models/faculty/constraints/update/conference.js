const ConferenceValidationConstraints = {
    hostYear: {
        presence:     false,
        type:         'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
};

export default ConferenceValidationConstraints;
