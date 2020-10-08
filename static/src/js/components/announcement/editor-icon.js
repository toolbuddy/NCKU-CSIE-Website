import { host, } from 'settings/server/config.js';
import ValidateUtils from 'models/common/utils/validate.js';
import roleUtils from 'models/auth/utils/role.js';
import editorHTML from 'static/src/pug/components/announcement/editor.pug';
import { classAdd, classRemove, } from 'static/src/js/utils/style.js';

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
            userId:         -1,
            announcementId: opt.announcementId,
            languageId:     opt.currentLanguageId,
        };

        const deleteBriefingSelector = element => `.delete-preview > .delete-preview__briefing > .briefing__${ element }`;
        this.DOM = {
            editor: opt.editorDOM,
            delete: {
                block:  opt.deleteDOM.querySelector( '.delete-preview' ),
                button: {
                    cancel: opt.deleteDOM.querySelector( '.delete-preview > .delete-preview__button > .button__cancel' ),
                    check:  opt.deleteDOM.querySelector( '.delete-preview > .delete-preview__button > .button__check' ),
                },
                briefing: {
                    title:   opt.deleteDOM.querySelector( deleteBriefingSelector( 'title' ) ),
                    time:    opt.deleteDOM.querySelector( deleteBriefingSelector( 'time' ) ),
                },
            },
        };
    }

    async insertEditorDOM () {
        this.DOM.editor.innerHTML += editorHTML( {
            host,
            announcementId: this.config.announcementId,
            languageId:     this.config.languageId,
        } );
    }

    subscribeDeletePreview () {
        const deleteButton = this.DOM.editor.querySelector( '.editor__delete' );
        deleteButton.addEventListener( 'click', async ( e ) => {
            e.preventDefault();
            const res = await window.fetch( `${ host }/api/announcement/${ this.config.announcementId }?languageId=${ this.config.languageId }` );
            const data = await res.json();
            classAdd( this.DOM.delete.block, 'delete-preview--show' );
            this.DOM.delete.briefing.title.innerText = data.title;
            this.DOM.delete.briefing.time.innerText = new Date( data.updateTime ).toDateString();
        } );
        this.DOM.delete.button.cancel.addEventListener( 'click', ( e ) => {
            e.preventDefault();
            classRemove( this.DOM.delete.block, 'delete-preview--show' );
        } );
        this.DOM.delete.button.check.addEventListener( 'click', () => {
            this.sendDeleteRequest();
        } );
    }

    async sendDeleteRequest () {
        fetch( `${ host }/user/announcement`, {
            method: 'DELETE',
            body:   JSON.stringify( {
                announcementIds: [ this.config.announcementId, ],
            } ),
            headers: {
                'content-type': 'application/json',
            },
        } )
        .then( async () => {
            window.location.replace( `${ host }/announcement/all?languageId=${ this.config.languageId }` );
        } );
    }

    async exec () {
        fetch( `${ host }/user/id`, {
            credentials: 'include',
            method:      'get',
        } )
        .then( async res => res.json() )
        .then( async ( res ) => {
            const userData = res;
            const userRole = userData.role;
            const userId =   ( userRole === roleUtils.getIdByOption( 'staff' ) ) ? userData.roleId : -1;

            if ( userId !== -1 ) {
                await this.insertEditorDOM();
                this.subscribeDeletePreview();
            }
        } );
    }
}
