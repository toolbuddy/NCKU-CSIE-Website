import ValidateUtils from 'models/common/utils/validate.js';
import tagUtils from 'models/announcement/utils/tag.js';
import LanguageUtils from 'models/common/utils/language.js';
import { host, } from 'settings/server/config.js';
import { classAdd, classRemove, delay, } from 'static/src/js/utils/style.js';
import FilePreview from 'static/src/pug/components/user/announcement/file-preview.pug';
import tinymce from 'tinymce';
import encodeurl from 'encodeurl';

// Plugins
import 'tinymce/themes/silver';

export default class AnnouncementEvent {
    constructor ( opt ) {
        opt = opt || {};

        if ( !ValidateUtils.isValidId( opt.id ) ||
            !ValidateUtils.isValidId( opt.languageId ) ||
            !ValidateUtils.isDomElement( opt.editBlockDOM ) )
            throw new TypeError( 'invalid arguments' );

        this.config = {
            id:                 opt.id,
            languageId:         opt.languageId,
            method:             opt.method,
            animationDelayTime: 500,
        };

        this.state = {
            languageId:  opt.languageId,
            files:       [],
            tags:        [],
            newFiles:    [],
            deleteFiles: [],
        };

        this.DOM = {
            tags: Array.from( opt.editBlockDOM.querySelectorAll( '.edit-block__tags.tags > .tags__tag' ) ).map( ( node ) => {
                const tagId = node.getAttribute( 'data-tag-id' );
                if ( tagId === null )
                    throw new Error( 'DOM attribute `data-tag-id` not found.' );
                if ( !( Number( tagId ) === tagUtils.tagAllId ) && !tagUtils.isSupportedId( Number( tagId ) ) )
                    throw new Error( 'Invalid DOM attribute `data-tag-id`.' );
                return {
                    node,
                    id:   Number( tagId ),
                };
            } ),
            languageButton: {
                [ LanguageUtils.getLanguageId( 'en-US' ) ]: opt.editBlockDOM.querySelector( '.edit-block__language > .language__button--en-US' ),
                [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: opt.editBlockDOM.querySelector( '.edit-block__language > .language__button--zh-TW' ),
            },
            editBlock:    opt.editBlockDOM,
            title:        opt.editBlockDOM.querySelector( '.edit-block__announcement > .announcement__title > .title__input' ),
            content:      opt.editBlockDOM.querySelector( '.edit-block__announcement > .announcement__content > .content__textarea' ),
            uploadFile:   opt.editBlockDOM.querySelector( '.edit-block__announcement > .announcement__attachment > .attachment__input' ),
            submit:       opt.editBlockDOM.querySelector( '.edit-block__announcement > .announcement__release > .release__check' ),
            filePreview:  opt.editBlockDOM.querySelector( '.edit-block__announcement > .announcement__attachment > .attachment__file' ),
            errorMessage: opt.editBlockDOM.querySelector( '.edit-block__announcement > .announcement__release > .release__error-message' ),
        };
    }

    queryApi ( languageId ) {
        return `${ host }/api/announcement/${ this.config.id }?languageId=${ languageId }`;
    }

    async fetchData ( languageId ) {
        try {
            if ( this.config.method === 'edit' ) {
                const res = await fetch( this.queryApi( languageId ) );

                if ( !res.ok )
                    throw new Error( 'No Announcement found' );

                return res.json();
            }

            return {
                title:   '',
                content: '',
                tags:    [],
                files:   [],
            };
        }
        catch ( err ) {
            throw err;
        }
    }

    subscribeEditor () {
        tinymce.init( {
            selector:  '#content__textarea',
            width:     '100%',
            statusbar: false,
            plugins:   'table lists',
            menubar:   'table',
            toolbar:   'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
        } );
        Object.keys( this.DOM.languageButton ).forEach( ( languageId ) => {
            this.DOM.languageButton[ languageId ].addEventListener( 'click', ( e ) => {
                e.preventDefault();

                /***
                 * Store content in another language
                 */

                this.data[ this.state.languageId ].title = this.DOM.title.value;
                this.data[ this.state.languageId ].content = tinymce.get( 'content__textarea' ).getContent();

                /***
                 * Change button css
                 */

                Object.keys( this.DOM.languageButton ).forEach( ( id ) => {
                    classRemove( this.DOM.languageButton[ id ], 'language__button--active' );
                } );
                classAdd( this.DOM.languageButton[ languageId ], 'language__button--active' );

                /***
                 * Set content in selected language
                 */

                this.state.languageId = languageId;
                this.DOM.title.value = this.data[ languageId ].title;
                tinymce.get( 'content__textarea' ).setContent( this.data[ languageId ].content );

                // This.DOM.content.value = this.data[ languageId ].content;
            } );
        } );
    }

    subscribeTagEvent () {
        this.DOM.tags.forEach( ( tag ) => {
            tag.node.addEventListener( 'click', ( e ) => {
                e.preventDefault();
                const index = this.state.tags.indexOf( tag.id );
                if ( index < 0 ) {
                    this.state.tags.push( tag.id );
                    classAdd( tag.node, 'tags__tag--active' );
                }
                else {
                    this.state.tags.splice( index, 1 );
                    classRemove( tag.node, 'tags__tag--active' );
                }
            } );
        } );
    }

    subscribeFileUploadButton () {
        this.DOM.uploadFile.addEventListener( 'change', ( e ) => {
            Array.from( e.target.files ).forEach( async ( file ) => {
                const id = this.state.newFiles.length * -1 - 1;
                this.state.newFiles.push( {
                    file,
                    fileId: id,
                } );
                this.state.files.push( {
                    name:   file.name,
                    fileId: id,
                } );
                await this.addFilePreviewBlock( file, id );
            } );
        } );
    }

    subscribeSubmitButton () {
        this.DOM.submit.addEventListener( 'click', ( e ) => {
            e.preventDefault();
            this.data[ this.state.languageId ].title = this.DOM.title.value;
            this.data[ this.state.languageId ].content = tinymce.get( 'content__textarea' ).getContent();

            // This.isDataValidate();

            if ( this.isDataValidate() ) {
                if ( this.config.method === 'add' )
                    this.uploadPostAnnouncement();
                else
                    this.uploadPatchAnnouncement();
            }
        } );
    }

    async addFilePreviewBlock ( file, id ) {
        new Promise( ( res ) => {
            this.DOM.filePreview.innerHTML += FilePreview( {
                host,
                name: file.name,
                id,
            } );
            res();
        } )
        .then( async () => {
            // Const deleteDOM = this.DOM.filePreview.querySelectorAll( `.file__file-preview > .file-preview__delete` );
            const deleteDOM = this.DOM.filePreview.querySelector( `.file__file-preview > .file-preview__delete--${ id }` );

            /***
            *   Add delete button event listener
            */

            // Array.from( deleteDOM ).forEach( ( DOM ) => {
            //     DOM.addEventListener( 'click', () => {
            //         console.log( 'delete' );
            //         const tempId = Number( DOM.getAttribute( 'file-id' ) );
            //         const temp = this.state.files.find( element => element.fileId === tempId );
            //         const index = this.state.files.indexOf( temp );
            //         this.state.files.splice( index, 1 );
            //         this.state.deleteFiles.push( tempId );
            //         DOM.parentNode.remove();
            //     } );
            // } );

            deleteDOM.addEventListener( 'click', () => {
                console.log( 'delete' );
                const tempId = Number( deleteDOM.getAttribute( 'file-id' ) );
                const temp = this.state.files.find( element => element.fileId === tempId );
                const index = this.state.files.indexOf( temp );
                this.state.files.splice( index, 1 );
                this.state.deleteFiles.push( tempId );
                deleteDOM.parentNode.remove();
            } );

            /***
            *   Add loader event listener
            */

            if ( id < 0 ) {
                const loaderDOM = this.DOM.filePreview.querySelector( `.file__file-preview > .file-preview__loader--${ id }` );
                classAdd( loaderDOM, 'file-preview__loader--active' );

                await delay( this.config.animationDelayTime );

                const reader = new FileReader();
                reader.readAsDataURL( file );
                reader.onload = () => {
                    classRemove( loaderDOM, 'file-preview__loader--active' );
                };
            }
        } );
    }

    isDataValidate () {
        let errorMessage = '';

        /***
         * Validate data and set error message
         */

        if ( this.state.tags.length <= 0 )
            errorMessage = '請至少選擇一個標籤';
        if (
            !ValidateUtils.isValidString( this.data[ LanguageUtils.getLanguageId( 'zh-TW' ) ].title ) ||
            this.data[ LanguageUtils.getLanguageId( 'zh-TW' ) ].title.length <= 0
        )
            errorMessage = '中文標題為必填欄位';
        if (
            !ValidateUtils.isValidString( this.data[ LanguageUtils.getLanguageId( 'zh-TW' ) ].content ) ||
            this.data[ LanguageUtils.getLanguageId( 'zh-TW' ) ].content.length <= 0
        )
            errorMessage = '中文內容為必填欄位';
        if (
            !ValidateUtils.isValidString( this.data[ LanguageUtils.getLanguageId( 'en-US' ) ].title ) ||
            this.data[ LanguageUtils.getLanguageId( 'en-US' ) ].title.length <= 0
        )
            errorMessage = '英文標題為必填欄位';
        if (
            !ValidateUtils.isValidString( this.data[ LanguageUtils.getLanguageId( 'en-US' ) ].content ) ||
            this.data[ LanguageUtils.getLanguageId( 'en-US' ) ].content.length <= 0
        )
            errorMessage = '英文內容為必填欄位';

        if ( errorMessage !== '' ) {
            this.setErrorMessage( errorMessage );
            return false;
        }

        this.setErrorMessage( '' );
        return true;
    }

    setErrorMessage ( errorMessage ) {
        this.DOM.errorMessage.textContent = errorMessage;
    }

    uploadPostAnnouncement () {
        const form = this.DOM.editBlock;
        const isPublished = form.elements[ 'publish-time' ].value;
        let tagString = '';
        this.state.tags.forEach( ( tag ) => {
            tagString += `${ tag } `;
        } );
        const files = {};
        this.state.files.forEach( ( file ) => {
            files[ file.fileId ] = file.name;
        } );

        fetch( `${ host }/announcement/add`, {
            method:   'POST',
            body:   JSON.stringify( {
                'method':           'post',
                isPublished,
                'author':           1,
                'isPinned':         0,
                'imageUrl':         null,
                'views':            0,
                'i18n':     {
                    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
                        title:   this.data[ LanguageUtils.getLanguageId( 'en-US' ) ].title,
                        content: encodeurl( this.data[ LanguageUtils.getLanguageId( 'en-US' ) ].content.replace( /&nbsp;/gi, ' ' ) ),
                    },
                    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
                        title:   this.data[ LanguageUtils.getLanguageId( 'zh-TW' ) ].title,
                        content: encodeurl( this.data[ LanguageUtils.getLanguageId( 'zh-TW' ) ].content.replace( /&nbsp;/gi, ' ' ) ),
                    },
                },
                'tags':     tagString,
                'fileI18n': {},
            } ),
        } )
        .then( () => {
            location.href = `${ host }/announcement/all?languageId=${ this.config.languageId }`;
        } );
    }

    uploadPatchAnnouncement () {
        console.log( 'patch' );
        const form = this.DOM.editBlock;
        const isPublished = form.elements[ 'publish-time' ].value;
        let tagString = '';
        this.state.tags.forEach( ( tag ) => {
            tagString += `${ tag } `;
        } );
        const files = {};
        this.state.files.forEach( ( file ) => {
            files[ file.fileId ] = file.name;
        } );

        fetch( `${ host }/announcement/add`, {
            method:   'POST',
            body:   JSON.stringify( {
                'method':           'patch',
                isPublished,
                'announcementId':   this.config.id,
                'author':           1,
                'isPinned':         0,
                'imageUrl':         null,
                'views':            0,
                'i18n':           {
                    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
                        title:   this.data[ LanguageUtils.getLanguageId( 'en-US' ) ].title,
                        content: encodeurl( this.data[ LanguageUtils.getLanguageId( 'en-US' ) ].content.replace( /&nbsp;/gi, ' ' ) ),
                    },
                    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
                        title:   this.data[ LanguageUtils.getLanguageId( 'zh-TW' ) ].title,
                        content: encodeurl( this.data[ LanguageUtils.getLanguageId( 'zh-TW' ) ].content.replace( /&nbsp;/gi, ' ' ) ),
                    },
                },
                'tags':           tagString,
                'fileI18n':       {},
            } ),
        } )
        .then( () => {
            location.href = `${ host }/announcement/all?languageId=${ this.config.languageId }`;
        } );
    }

    exec () {
        Promise.all( LanguageUtils.supportedLanguageId.map( id => this.fetchData( id ) ) )
        .then( async ( data ) => {
            console.log( data );
            this.data = data;
            if ( data !== null ) {
                this.state.tags = data[ this.config.languageId ].tags;
                this.state.files = data[ this.config.languageId ].files;
            }
        } )
        .then( () => {
            this.subscribeTagEvent();
            this.subscribeEditor();
            this.subscribeFileUploadButton();
            this.subscribeSubmitButton();
            this.DOM.filePreview.innerHTML = '';
            this.state.files.forEach( async ( file ) => {
                await this.addFilePreviewBlock( file, file.fileId );
            } );
        } );
    }
}
