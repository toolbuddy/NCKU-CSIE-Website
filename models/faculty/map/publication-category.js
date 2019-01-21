import LanguageUtils from 'settings/language/utils.js';

const publicationCategoryMap = {};
Object.defineProperties( publicationCategoryMap, {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        'value': {
            'support': [
                'journal',
                'conference',
                'workshop',
            ],
            'default': 'journal',
        },
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        'value': {
            'support': [
                '期刊',
                '會議',
                '工作坊',
            ],
            'default': '期刊',
        },
    },
} );

export default publicationCategoryMap;
