import LanguageUtils from 'models/common/utils/language.js';

const AnnouncementI18nValidationConstraints = {
    languageId: {
        presence: true,
        type:     {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    title: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 300,
        },
    },
    content: {
        presence: false,
        type:       'string',
    },
};

export default AnnouncementI18nValidationConstraints;
