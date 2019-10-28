import LanguageUtils from 'models/common/utils/language.js';

const FileI18nValidationConstraints = {
    languageId: {
        presence: true,
        type:     {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    name: {
        presence: true,
        type:       'string',
        length:   {
            maximum: 2083,
        },
    },
    path: {
        presence: true,
        type:       'string',
        length:   {
            maximum: 2083,
        },
    },
};

export default FileI18nValidationConstraints;
