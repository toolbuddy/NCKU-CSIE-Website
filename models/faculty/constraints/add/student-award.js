import LanguageUtils from 'models/common/utils/language.js';

const StudentAwardValidationConstraints = {
    receivedYear: {
        presence:     true,
        type:         'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
    i18n: {
        presence: {
            allowEmpty: false,
        },
        type:     'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
};

export default StudentAwardValidationConstraints;
