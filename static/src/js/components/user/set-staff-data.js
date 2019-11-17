import EditPage from 'static/src/js/components/user/edit-page.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import { host, } from 'settings/server/config.js';
import ValidateUtils from 'models/common/utils/validate.js';
import dynamicInputBlock from 'static/src/pug/components/user/dynamic-input-block.pug';
import LanguageUtils from 'models/common/utils/language.js';
import dataI18n from 'static/src/js/components/user/static-data/data-i18n.js';
import dataEditPageConfig from 'static/src/js/components/user/static-data/data-edit-page-config.js';
import validationInfo from 'static/src/js/components/user/static-data/validation-info.js';
import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import validate from 'validate.js';

export default class SetStaffData {
    constructor ( opt ) {
        opt = opt || {};

        /***
         * Data validation
         * require data:
         * blockDOM:     DOM of information block
         * addButtonDOM: DOM of add button to add information
         * loadingDOM:   DOM of loading logo
         * languageId:   Id  of languageId
         * profileId:    Id  of profileId
         * dbTable:      String of the table name of database
         */

        if (
            !ValidateUtils.isDomElement( opt.blockDOM ) ||
            !ValidateUtils.isDomElement( opt.refreshDOM ) ||
            !ValidateUtils.isDomElement( opt.loadingDOM ) ||
            !ValidateUtils.isDomElement( opt.addButtonDOM ) ||
            !WebLanguageUtils.isSupportedLanguageId( opt.languageId ) ||
            !ValidateUtils.isValidId( opt.profileId ) ||
            !ValidateUtils.isValidString( opt.dbTable )
        )
            throw new TypeError( 'invalid arguments' );

        this.config = {
            languageId: opt.languageId,
            profileId:  opt.profileId,
            dbTable:    opt.dbTable,
        };

        this.DOM = {
            block:     opt.blockDOM,
            addButton: opt.addButtonDOM,
            refresh:   opt.refreshDOM,
            loading:   opt.loadingDOM,
        };
    }

    /***
     * Show loading logo
     */

    renderLoading () {
        classAdd( this.DOM.refresh, 'refresh--hidden' );
        classRemove( this.DOM.loading, 'loading--hidden' );
    }

    /***
     * Show data information ( show the blocks )
     */

    renderLoadingSucceed () {
        classAdd( this.DOM.loading, 'loading--hidden' );
        classAdd( this.DOM.refresh, 'refresh--hidden' );
    }

    /***
     * Show refresh logo
     */

    renderLoadingFailed () {
        classAdd( this.DOM.loading, 'loading--hidden' );
        classRemove( this.DOM.refresh, 'refresh--hidden' );
    }

    queryApi ( languageId ) {
        return `${ host }/api/staff/staffWithId/${ this.config.profileId }?languageId=${ languageId }`;
    }

    async fetchData ( languageId ) {
        try {
            const res = await fetch( this.queryApi( languageId ) );
            if ( !res.ok )
                throw new Error( 'No faculty found' );

            return res.json();
        }
        catch ( err ) {
            throw err;
        }
    }

    /****
     * Render Information Block
     */

    async renderBlock ( opt ) {
        try {
            this.DOM.block.innerHTML += dynamicInputBlock( {
                opt,
                host,
                dbTable:     this.config.dbTable,
                languageId:  this.config.languageId,
                LANG:        LanguageUtils,
                dataI18n:    dataI18n.staff[ this.config.dbTable ],
            } );
        }
        catch ( err ) {
            console.error( err );
        }
    }

    /***
     * Put information in database to the block
     */

    async setBlock ( dbData ) {
        try {
            this.DOM.block.innerHTML = '';
            const data = dbData;

            /***
             * Render data in oder
             */

            console.log( data[ this.config.languageId ][ `${ this.config.dbTable }I18n` ] );

            data[ this.config.languageId ][ `${ this.config.dbTable }I18n` ].forEach( async ( dataItem, index ) => {
                /***
                 * Item use to initia
                 */

                const content = [];
                const subtitle = [];
                const deleteDescription = [];
                const dbTableId = dataItem[ `${ this.config.dbTable }Id` ];
                switch ( this.config.dbTable ) {
                    case 'title':
                        content.push( dataItem.title );
                        deleteDescription.push( dataItem.title );
                        await this.renderBlock( {
                            id:       dbTableId,
                            content,
                            subtitle,
                        } );

                        break;

                    case 'business':
                        content.push( dataItem.business );
                        deleteDescription.push( dataItem.business );
                        await this.renderBlock( {
                            id:       dbTableId,
                            content,
                            subtitle,
                        } );
                        break;

                    default:
                        console.error( 'no validate table' );
                }

                const updateSelector = `.input-block__block > .block__content > .content__modify--${ this.config.dbTable }-${ dbTableId }`;
                const deleteSelector = `.input-block__block > .block__content > .content__remove--${ this.config.dbTable }-${ dbTableId }`;
                this.setUpdateButtonEvent( {
                    buttonDOM: this.DOM.block.querySelector( updateSelector ),
                    res:       LanguageUtils.supportedLanguageId.map( id => data[ id ][ `${ this.config.dbTable }I18n` ][ index ] ),
                    id:        dbTableId,
                    dbTable:   this.config.dbTable,
                } );
                this.setDeleteButtonEvent( {
                    buttonDOM: this.DOM.block.querySelector( deleteSelector ),
                    id:        dbTableId,
                    content:   deleteDescription,
                    dbTable:   this.config.dbTable,
                } );
            } );
        }
        catch ( err ) {
            throw err;
        }
    }

    closeEditPageWindow () {
        document.body.removeChild( document.getElementById( 'edit-page' ) );
    }

    /***
     * Deal with update data
     * update database
     */

    uploadUpdateData ( dbTableItemId, dbTable ) {
        const editPageDOM = document.getElementById( 'edit-page' );
        const input = editPageDOM.getElementsByTagName( 'input' );

        // Every data not need i18n
        const item = {};

        // Every data need i18n
        const i18n = {
            [ LanguageUtils.getLanguageId( 'en-US' ) ]: {},
            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {},
        };
        Array.from( input ).forEach( ( element ) => {
            if ( element.getAttribute( 'i18n' ) !== null )
                i18n[ element.getAttribute( 'languageId' ) ][ element.getAttribute( 'dbTableItem' ) ] = element.value;
            else if ( element.type === 'checkbox' )
                item[ element.getAttribute( 'dbTableItem' ) ] = ( element.checked ) ? 1 : 0;
            else
                item[ element.getAttribute( 'dbTableItem' ) ] = element.value;
        } );

        // Fetch( `${ host }/user/profile`, {
        //     method:   'POST',
        //     body:   JSON.stringify( {
        //         'profileId':    this.config.profileId,
        //         'method':       'update',
        //         dbTable,
        //         dbTableItemId,
        //         item,
        //         i18n,
        //     } ),
        // } )
        // .then( async () => {
        //     this.exec();
        //     this.emptyBlock();
        //     this.closeEditPageWindow();
        // } ).catch( ( err ) => {
        //     this.closeEditPageWindow();
        //     this.emptyBlock();
        //     this.renderLoadingFailed();
        //     console.error( err );
        // } );
    }

    uploadAddData ( dbTable, dbTableId ) {
        const editPageDOM = document.getElementById( 'edit-page' );
        const input = editPageDOM.getElementsByTagName( 'input' );
        const item = {};
        const i18n = {
            [ LanguageUtils.getLanguageId( 'en-US' ) ]: {},
            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {},
        };
        Array.from( input ).forEach( ( element ) => {
            if ( element.getAttribute( 'i18n' ) !== null )
                i18n[ element.getAttribute( 'languageId' ) ][ element.getAttribute( 'dbTableItem' ) ] = element.value;
            else if ( element.type === 'checkbox' )
                item[ element.getAttribute( 'dbTableItem' ) ] = ( element.checked ) ? 1 : 0;
            else
                item[ element.getAttribute( 'dbTableItem' ) ] = element.value;
        } );

        // Fetch( `${ host }/user/profile`, {
        //     method:   'POST',
        //     body:   JSON.stringify( {
        //         profileId:    this.config.profileId,
        //         dbTableId,
        //         method:       'add',
        //         dbTable,
        //         item,
        //         i18n,
        //     } ),
        // } )
        // .then( async () => {
        //     this.exec();
        //     this.emptyBlock();
        //     this.closeEditPageWindow();
        // } ).catch( ( err ) => {
        //     this.closeEditPageWindow();
        //     this.emptyBlock();
        //     this.renderLoadingFailed();
        //     console.error( err );
        // } );
    }

    uploadDeleteData ( dbTableItemId, dbTable ) {
        // Fetch( `${ host }/user/profile`, {
        //     method:   'POST',
        //     body:   JSON.stringify( {
        //         profileId:     this.config.profileId,
        //         method:        'delete',
        //         dbTable,
        //         dbTableItemId,
        //     } ),
        // } )
        // .then( async () => {
        //     this.exec();
        //     this.emptyBlock();
        //     this.closeEditPageWindow();
        // } ).catch( ( err ) => {
        //     this.closeEditPageWindow();
        //     this.emptyBlock();
        //     this.renderLoadingFailed();
        //     console.error( err );
        // } );
    }

    /****
     * Submit Data Validation
     */

    checkSubmitData ( dbTable ) {
        let isValid = true;
        const errorSelector =   '.edit-page__window > .window__form > .form__content > .content__error > .error__message';
        const editPageDOM = document.getElementById( 'edit-page' );
        const errorDOM = editPageDOM.querySelector( errorSelector );
        const input = editPageDOM.getElementsByTagName( 'input' );

        const constraints = validationInfo[ dbTable ];

        Array.from( input ).forEach( ( element ) => {
            if ( constraints[ element.name ].presence.allowEmpty === false || element.value !== '' ) {
                const errors = validate.single( element.value, constraints[ element.name ] );
                if ( errors ) {
                    this.setErrorMessage( element, errors[ 0 ], errorDOM );
                    isValid = false;
                }
            }
        } );

        return isValid;
    }

    setErrorMessage ( inputDOM, errorMessage, errorDOM ) {
        inputDOM.focus();
        errorDOM.textContent = errorMessage;
    }

    setAddButtonEvent ( opt ) {
        opt.addButtonDOM.addEventListener( 'click', async () => {
            const editPage = new EditPage( {
                editPageConfig: dataEditPageConfig.staff[ opt.dbTable ],
                dataI18n:       dataI18n.staff[ opt.dbTable ],
                editPageDOM:    this.DOM.editPage,
                dbTable:        opt.dbTable,
                languageId:     this.config.languageId,
                buttonMethod:   'add',
            } );
            await editPage.renderEditPage();

            const selector = {
                cancel: '.edit-page__window > .window__form > .form__button > .button__item--cancel',
                check:  '.edit-page__window > .window__form > .form__button > .button__item--check',
            };
            const editPageDOM = document.getElementById( 'edit-page' );
            const cancelDOM = editPageDOM.querySelector( selector.cancel );
            const checkDOM = editPageDOM.querySelector( selector.check );

            cancelDOM.addEventListener( 'click', ( e ) => {
                e.preventDefault();
                this.closeEditPageWindow();
            } );
            checkDOM.addEventListener( 'click', ( e ) => {
                e.preventDefault();
                const isValid = this.checkSubmitData( opt.dbTable );
                if ( isValid )
                    this.uploadAddData( opt.dbTable, opt.dbTableId );
            } );
        } );
    }

    /***
     * Set information update button event
     * When click update button,
     * open an edit-page.
     */

    setUpdateButtonEvent ( info ) {
        info.buttonDOM.addEventListener( 'click', async () => {
            const editPage = new EditPage( {
                editPageConfig: dataEditPageConfig.staff[ info.dbTable ],
                dataI18n:       dataI18n.staff[ info.dbTable ],
                editPageDOM:    this.DOM.editPage,
                dbTable:        info.dbTable,
                languageId:     this.config.languageId,
                dbData:         info.res,
                buttonMethod:   'update',
            } );
            await editPage.renderEditPage();

            const selector = {
                cancel: '.edit-page__window > .window__form > .form__button > .button__item--cancel',
                check:  '.edit-page__window > .window__form > .form__button > .button__item--check',
            };
            const editPageDOM = document.getElementById( 'edit-page' );
            const cancelDOM = editPageDOM.querySelector( selector.cancel );
            const checkDOM = editPageDOM.querySelector( selector.check );

            cancelDOM.addEventListener( 'click', ( e ) => {
                e.preventDefault();
                this.closeEditPageWindow();
            } );
            checkDOM.addEventListener( 'click', ( e ) => {
                e.preventDefault();

                const isValid = this.checkSubmitData( info.dbTable );
                if ( isValid )
                    this.uploadUpdateData( info.id, info.dbTable );
            } );
        } );
    }

    setDeleteButtonEvent ( info ) {
        info.buttonDOM.addEventListener( 'click', async () => {
            const editPage = new EditPage( {
                dataI18n:       dataI18n.staff[ info.dbTable ],
                editPageConfig: dataEditPageConfig.staff[ info.dbTable ],
                editPageDOM:    this.DOM.editPage,
                dbTable:        info.dbTable,
                languageId:     this.config.languageId,
                id:             info.id,
                content:        info.content,
                buttonMethod:   'delete',
            } );
            await editPage.renderEditPage();

            const selector = {
                cancel: '.edit-page__window > .window__form > .form__button > .button__item--cancel',
                check:  '.edit-page__window > .window__form > .form__button > .button__item--check',
            };
            const editPageDOM = document.getElementById( 'edit-page' );
            const cancelDOM = editPageDOM.querySelector( selector.cancel );
            const checkDOM = editPageDOM.querySelector( selector.check );

            cancelDOM.addEventListener( 'click', ( e ) => {
                e.preventDefault();
                this.closeEditPageWindow();
            } );
            checkDOM.addEventListener( 'click', ( e ) => {
                e.preventDefault();
                this.uploadDeleteData( info.id, info.dbTable );
            } );
        } );
    }

    emptyBlock () {
        this.DOM.block.innerHTML = '';
    }

    async exec () {
        this.renderLoading();
        Promise.all( LanguageUtils.supportedLanguageId.map( id => this.fetchData( id ) ) )
        .then( async ( data ) => {
            // Whether there is no data of certain table in database
            if ( validate.isEmpty( data[ this.config.languageId ][ `${ this.config.dbTable }I18n` ] ) )
                this.emptyBlock();
            else
                this.setBlock( data );
            this.setAddButtonEvent( {
                dbTable:      this.config.dbTable,
                dbTableId:    -1,
                addButtonDOM: this.DOM.addButton,
            } );
        } )
        .then( () => {
            this.renderLoadingSucceed();
        } )
        .catch( () => {
            this.renderLoadingFailed();
        } );
    }
}
