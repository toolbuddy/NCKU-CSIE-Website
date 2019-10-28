import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils from 'models/common/utils/validate.js';

const FileI18nValidationConstraints = {
    fileId: {
        presence: true,
        type:     {
            type: ValidateUtils.isValidId,
        },
    },
    languageId: {
        presence: true,
        type:     {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    name: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 2083,
        },
    },
    path: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 2083,
        },
    },
};

export default FileI18nValidationConstraints;
