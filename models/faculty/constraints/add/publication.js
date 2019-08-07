import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils from 'models/common/utils/validate.js';
import publicationCategoryUtils from 'models/faculty/utils/publication-category.js';

const PublicationValidationConstraints = {
    issueYear: {
        presence:     false,
        type:         'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
    issueMonth: {
        presence:     false,
        type:         'integer',
        numericality: {
            greaterThan:       0,
            lessThanOrEqualTo: 12,
        },
    },
    category: {
        presence: true,
        type:     {
            type: value => publicationCategoryUtils.isSupportedId( value ),
        },
    },
    international: {
        presence: true,
        type:     {
            type: value => ValidateUtils.isValidBoolean( value ),
        },
    },
    refereed: {
        presence: true,
        type:     {
            type: value => ValidateUtils.isValidBoolean( value ),
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

export default PublicationValidationConstraints;
