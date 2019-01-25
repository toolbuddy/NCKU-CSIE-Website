import deepFreeze from 'deep-freeze';
import LanguageUtils from 'models/common/utils/language.js';

const publicationCategoryMap = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        'support': [
            'journal',
            'conference',
            'workshop',
        ],
        'default': 'journal',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        'support': [
            '期刊',
            '會議',
            '工作坊',
        ],
        'default': '期刊',
    },
};

deepFreeze( publicationCategoryMap );

export default publicationCategoryMap;
