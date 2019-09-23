import { host, } from 'settings/server/config.js';
import ValidateUtils from 'models/common/utils/validate.js';
import roleUtils from 'models/auth/utils/role.js';
import editorHTML from 'static/src/pug/components/announcement/editor.pug';

export default class EditorIcon {
    constructor ( opt ) {
        opt = opt || {};

        if ( typeof ( opt.editorDOM ) === 'undefined' ||
           !ValidateUtils.isDomElement( opt.editorDOM ) ||
           typeof ( opt.announcementId ) === 'undefined' ||
           !ValidateUtils.isValidId( opt.announcementId ) ||
           typeof ( opt.currentLanguageId ) === 'undefined' ||
           !ValidateUtils.isValidId( opt.currentLanguageId )
        )
            throw new TypeError( 'invalid arguments' );

        this.config = {
            announcementId: opt.announcementId,
            languageId:     opt.currentLanguageId,
        };

        this.DOM = {
            editor: opt.editorDOM,
        };
    }

    insertEditorDOM () {
        this.DOM.editor.innerHTML += editorHTML( {
            host,
            announcementId: this.config.announcementId,
            languageId:     this.config.languageId,
        } );
    }

    async fetchUserData () {
        try {
            const res = await fetch( `${ host }/user/id`, {
                credentials: 'include',
                method:      'post',
            } );

            if ( !res.ok )
                throw new Error( 'No faculty found' );

            return res.json();
        }
        catch ( err ) {
            throw err;
        }
    }

    async exec () {
        /***
         *   Fetch user data
         *   and check whether login and is staff
        */

        const userData = await this.fetchUserData();
        const userRole = userData.role;
        const userId =   ( userRole === roleUtils.getIdByOption( 'staff' ) ) ? userData.roleId : -1;

        if ( userId !== -1 )
            this.insertEditorDOM();
    }
}
