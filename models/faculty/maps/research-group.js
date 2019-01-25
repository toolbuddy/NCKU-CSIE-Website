import deepFreeze from 'deep-freeze';
import LanguageUtils from 'models/common/utils/language.js';

const researchGroupMap = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        'support': [
            'E-life Digital Technology and Software Technology',
            'Computation, Communication and Network',
            'Data and Knowledge Engineering',
            'Multimedia',
            'Architecture and Embedded System',
            'Biomedical Engineering',
            'Manufacturing Engineering',
        ],
        'default': 'E-life Digital Technology and Software Technology',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        'support': [
            '數位生活科技與軟體技術',
            '計算通訊與網路',
            '資料與知識工程',
            '多媒體',
            '架構與嵌入式系統',
            '生醫工程',
            '製造工程',
        ],
        'default': '數位生活科技與軟體技術',
    },
};

deepFreeze( researchGroupMap );

export default researchGroupMap;
