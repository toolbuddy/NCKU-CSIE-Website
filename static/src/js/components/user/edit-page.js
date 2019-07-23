import editPageHTML from 'static/src/pug/components/user/edit-page.pug';
import editPageContentHTML from 'static/src/pug/components/user/edit-page-content.pug';
import LanguageUtils from 'models/common/utils/language.js';


/**
 * @param {object} opt 
 * @return {Promise}
 */

export default class editPage {
    constructor ( opt ) {
        // { object }res-> dbTable 開始
        // { DOM }parentDOM-> 要放在哪裡
        // { object }confing( id, languageId,  )
        // { editPageConfig[] }config
    }   
}

export function editPageTypeObj( type, info ) {
    const typeObj = {
        text: {
            type: 'text',
            dbTableItem: info.dbTableItem,
            i18n: info.i18n,
        },
        time: {
            type: 'time',
        },
        localTopic: {
            type: 'local-topic',
            dbTableItem: info.dbTableItem,
        },
        dropdown: {
            type: 'dropdown',
            dbTableItem: info.dbTableItem,
            dropdownItem: info.dropdownItem,
        },
    },

    return typeObj( typeObj[ type ] );
}

