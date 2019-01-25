import deepFreeze from 'deep-freeze';
import LanguageUtils from 'models/common/utils/language.js';

const projectCategoryMap = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        'support': [
            'General Projects',
            'National Science Council Projects',
        ],
        'default': 'General Projects',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        'support': [
            '一般建教案',
            '國科會計劃',
        ],
        'default': '一般建教案',
    },
};

deepFreeze( projectCategoryMap );

export default projectCategoryMap;
