import LanguageUtils from 'models/common/utils/language.js';

const AnnouncementI18nValidationConstraints = {
    languageId: {
        presence: true,
        type:     {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    title: {
        presence: true,
        type:     'string',
        length:   {
            maximum: 300,
        },
    },
    content: {
        presence: true,
        type:     'string',
    },
};

export default AnnouncementI18nValidationConstraints;
