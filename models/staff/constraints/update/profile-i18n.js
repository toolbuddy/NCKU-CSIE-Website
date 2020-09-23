import LanguageUtils from 'models/common/utils/language.js';

const ProfileI18nValidationConstraints = {
    language: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    name: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 100,
        },
    },
    officeAddress: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 100,
        },
    },
};

export default ProfileI18nValidationConstraints;
