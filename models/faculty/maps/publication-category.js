import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

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
