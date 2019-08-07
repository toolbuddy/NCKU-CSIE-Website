import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils from 'models/common/utils/validate.js';
import nationUtils from 'models/faculty/utils/nation.js';

const PatentValidationConstraints = {
    nation: {
        presence: true,
        type:     {
            type: value => nationUtils.isSupportedId( value ),
        },
    },
    certificationNumber: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 100,
        },
    },
    applicationDate: {
        presence: false,
        type:     {
            type: value => ValidateUtils.isValidDate( value ),
        },
    },
    issueDate: {
        presence: false,
        type:     {
            type: value => ValidateUtils.isValidDate( value ),
        },
    },
    expireDate: {
        presence: false,
        type:     {
            type: value => ValidateUtils.isValidDate( value ),
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

export default PatentValidationConstraints;
