import LanguageUtils from 'models/common/utils/language.js';

const PublicationI18nValidationConstraints = {
    language: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    title: {
        presence: true,
        type:       'string',
        length:   {
            maximum: 500,
        },
    },
    authors: {
        presence: true,
        type:       'string',
        length:   {
            maximum: 500,
        },
    },
};

export default PublicationI18nValidationConstraints;
