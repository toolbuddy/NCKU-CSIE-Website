import LanguageUtils from 'settings/language/utils.js';

const projectCategoryMap = {};
Object.defineProperties( projectCategoryMap, {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        'value': {
            'support': [
                'General Projects',
                'National Science Council Projects',
            ],
            'default': 'General Projects',
        },
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        'value': {
            'support': [
                '一般建教案',
                '國科會計劃',
            ],
            'default': '一般建教案',
        },
    },
} );

export default projectCategoryMap;
