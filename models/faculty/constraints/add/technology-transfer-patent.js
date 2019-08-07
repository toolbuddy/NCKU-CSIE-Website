import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils from 'models/common/utils/validate.js';

const TechnologyTransferPatentValidationConstraints = {
    technologyTransferId: {
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

export default TechnologyTransferPatentValidationConstraints;
