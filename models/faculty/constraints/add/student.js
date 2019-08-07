import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils from 'models/common/utils/validate.js';
import degreeUtils from 'models/faculty/utils/degree.js';

const StudentValidationConstraints = {
    degree: {
        presence:     true,
        type:     {
            type: value => degreeUtils.isSupportedId( value ),
        },
    },
    studentAwardId: {
        presence:     true,
        type:     {
            type: value => ValidateUtils.isValidId( value ),
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

export default StudentValidationConstraints;
