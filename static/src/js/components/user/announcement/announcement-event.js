import ValidateUtils from 'models/common/utils/validate.js';
import tagUtils from 'models/announcement/utils/tag.js';
import LanguageUtils from 'models/common/utils/language.js';
import { host, } from 'settings/server/config.js';
import { classAdd, classRemove, delay, } from 'static/src/js/utils/style.js';
import FilePreview from 'static/src/pug/components/user/announcement/file-preview.pug';
import tinymce from 'tinymce';

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
            id:         opt.id,
            languageId: opt.languageId,
            method:     opt.method,
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
            title:       opt.editBlockDOM.querySelector( '.edit-block__announcement > .announcement__title > .title__input' ),
            content:     opt.editBlockDOM.querySelector( '.edit-block__announcement > .announcement__content > .content__textarea' ),
            uploadFile:  opt.editBlockDOM.querySelector( '.edit-block__announcement > .announcement__attachment > .attachment__input' ),
            filePreview: opt.editBlockDOM.querySelector( '.edit-block__announcement > .announcement__attachment > .attachment__file' ),
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
            };
        }
        catch ( err ) {
            throw err;
        }
    }

    subscribeEditor () {
        tinymce.init( {
            selector: '#content__textarea',
        } );
        Object.keys( this.DOM.languageButton ).forEach( ( languageId ) => {
            this.DOM.languageButton[ languageId ].addEventListener( 'click', () => {
                this.data[ this.state.languageId ].title = this.DOM.title.value;
                this.data[ this.state.languageId ].content = this.DOM.content.value;
                Object.keys( this.DOM.languageButton ).forEach( ( id ) => {
                    classRemove( this.DOM.languageButton[ id ], 'language__button--active' );
                } );
                classAdd( this.DOM.languageButton[ languageId ], 'language__button--active' );
                this.state.languageId = languageId;
                this.DOM.title.value = this.data[ languageId ].title;
                this.DOM.content.value = this.data[ languageId ].content;
            } );
        } );
    }

    subscribeTagEvent () {
        this.DOM.tags.forEach( ( tag ) => {
            tag.node.addEventListener( 'click', () => {
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

    async addFilePreviewBlock ( file, id ) {
        new Promise( ( res ) => {
            this.DOM.filePreview.innerHTML += FilePreview( {
                host,
                name: file.name,
                id,
            } );
            res();
        } )
        .then( () => {
            const deleteDOM = this.DOM.filePreview.querySelector( `.file__file-preview > .file-preview__delete--${ id }` );

            /***
            *   Add delete button event listener
            */

            deleteDOM.addEventListener( 'click', () => {
                const temp = this.state.files.find( element => element.fileId === id );
                const index = this.state.files.indexOf( temp );
                this.state.files.splice( index, 1 );
                this.state.deleteFiles.push( id );
                deleteDOM.parentNode.remove();
            } );

            /***
            *   Add loader event listener
            */

            if ( id < 0 ) {
                const loaderDOM = this.DOM.filePreview.querySelector( `.file__file-preview > .file-preview__loader--${ id }` );
                console.log( file );

                // // Const reader = new FileReader();
                // classAdd( loaderDOM, 'file-preview__loader--active' );
                // this.DOM.uploadFile.addEventListener( 'onload', () => {
                //     classRemove( loaderDOM, 'file-preview__loader--active' );
                // } );
            }
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
            this.DOM.filePreview.innerHTML = '';
            this.state.files.forEach( async ( file ) => {
                await this.addFilePreviewBlock( file, file.fileId );
            } );
        } );
    }
}
