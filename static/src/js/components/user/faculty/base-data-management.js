import ValidateUtils from 'models/common/utils/validate.js';
import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import LanguageUtils from 'models/common/utils/language.js';
import { host, } from 'settings/server/config.js';

export default class BaseDataManagement {
    constructor ( opt ) {
        opt = opt || {};

        if (
            !ValidateUtils.isDomElement( opt.bodyFormDOM ) ||
            !ValidateUtils.isDomElement( opt.refreshDOM ) ||
            !ValidateUtils.isDomElement( opt.loadingDOM ) ||
            !ValidateUtils.isDomElement( opt.cardsDOM ) ||
            !WebLanguageUtils.isSupportedLanguageId( opt.languageId ) ||
            !ValidateUtils.isValidString( opt.dbTable )
        )
            throw new TypeError( 'invalid arguments' );

        this.config = {
            languageId:   opt.languageId,
            dbTable:      opt.dbTable,
            idColumnName: opt.idColumnName,
        };

        this.status = {
            dataId: -1,
        };

        const checkButtonQuerySelector = method => ` #form-${ opt.dbTable }-${ method } > .form-input__button > .button__check`;
        const cancelButtonQuerySelector = method => ` #form-${ opt.dbTable }-${ method } > .form-input__button > .button__cancel`;
        const errorMessageQuerySelector = method => ` #form-${ opt.dbTable }-${ method } > .form-input__content > .content__error-message`;
        const inputQuerySelector = method => `input[ method = ${ method }]`;
        const formQuerySelector = method => `#form-${ opt.dbTable }-${ method }`;

        this.DOM = {
            patch: {
                checkButton:  opt.bodyFormDOM.querySelector( checkButtonQuerySelector( 'patch' ) ),
                cancelButton: opt.bodyFormDOM.querySelector( cancelButtonQuerySelector( 'patch' ) ),
                errorMessage: opt.bodyFormDOM.querySelector( errorMessageQuerySelector( 'patch' ) ),
                input:        opt.bodyFormDOM.querySelectorAll( inputQuerySelector( 'patch' ) ),
                form:         opt.bodyFormDOM.querySelector( formQuerySelector( 'patch' ) ),
            },
            post: {
                checkButton:  opt.bodyFormDOM.querySelector( checkButtonQuerySelector( 'post' ) ),
                cancelButton: opt.bodyFormDOM.querySelector( cancelButtonQuerySelector( 'post' ) ),
                errorMessage: opt.bodyFormDOM.querySelector( errorMessageQuerySelector( 'post' ) ),
                input:        opt.bodyFormDOM.querySelectorAll( inputQuerySelector( 'post' ) ),
                form:         opt.bodyFormDOM.querySelector( formQuerySelector( 'post' ) ),
            },
            formBackground: opt.bodyFormDOM,
            cards:          {
                cards: opt.cardsDOM,
            },
            postButtons:   Array.from( opt.postButtonsDOM ).map( ( node ) => {
                const buttonId = node.getAttribute( 'data-id' );
                if ( buttonId === null )
                    throw new Error( 'DOM attribute `data-id` not found.' );
                return {
                    node,
                    id:   Number( buttonId ),
                };
            } ),
            patchButtons: Array.from( opt.patchButtonsDOM ).map( ( node ) => {
                const buttonId = node.getAttribute( 'data-id' );
                if ( buttonId === null )
                    throw new Error( 'DOM attribute `data-id` not found.' );
                return {
                    node,
                    id:   Number( buttonId ),
                };
            } ),
            refresh: opt.refreshDOM,
            loading: opt.loadingDOM,
        };

        /**
         * @abstract
         * Subscribe click event for DOM elements ` #form-${ opt.dbTable }-post > .form-input__button > .button__check`.
         */

        this.subscribePostCheckButton();

        /**
         * @abstract
         * Subscribe click event for DOM elements ` #form-${ opt.dbTable }-patch > .form-input__button > .button__check`.
         */

        this.subscribePatchCheckButton();
    }

    renderLoading () {
        classAdd( this.DOM.refresh, 'refresh--hidden' );
        classRemove( this.DOM.loading, 'loading--hidden' );
        classAdd( this.DOM.cards.cards, 'cards--hidden' );
    }

    renderSuccess () {
        classAdd( this.DOM.refresh, 'refresh--hidden' );
        classAdd( this.DOM.loading, 'loading--hidden' );
        classRemove( this.DOM.cards.cards, 'cards--hidden' );
    }

    subscribeCancelButton () {
        const methods = [ 'post',
            'patch', ];
        methods.forEach( ( method ) => {
            this.DOM[ method ].cancelButton.addEventListener( 'click', ( element ) => {
                element.preventDefault();
                this.hideForm();
            } );
        } );
    }

    subscribePostButton () {
        this.showPostForm();
    }

    queryApi ( languageId ) {
        return `${ host }/api/faculty/facultyWithId/${ this.config.profileId }?languageId=${ languageId }`;
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

    subscribePatchButton ( element ) {
        Promise.all( LanguageUtils.supportedLanguageId.map( languageId => this.fetchData( languageId ) ) )
        .then( ( data ) => {
            this.status.dataId = element.target.getAttribute( 'data-id' );

            const tableData = data.map( ( i18nData ) => {
                const dict = {};
                i18nData[ this.config.dbTable ].forEach( ( row ) => {
                    dict[ row[ this.config.idColumnName ] ] = row;
                } );
                return dict;
            } );

            return tableData;
        } )
        .then( ( data ) => {
            const dataId = element.target.getAttribute( 'data-id' );
            this.setPatchFormValue( LanguageUtils.supportedLanguageId.map( languageId => data[ languageId ][ dataId ] ) );
            this.showPatchForm();
        } );
    }

    setPatchFormValue ( data ) {
        Array.from( this.DOM.patch.input ).forEach( ( element ) => {
            const columnName = element.getAttribute( 'column-name' );
            const languageId = element.getAttribute( 'languageId' );
            element.value = data[ languageId ][ columnName ];
        } );
    }

    showPatchForm () {
        classAdd( this.DOM.formBackground, 'form--active' );
        classAdd( this.DOM.patch.form, 'form-input--active' );
    }

    showPostForm () {
        classAdd( this.DOM.formBackground, 'form--active' );
        classAdd( this.DOM.post.form, 'form-input--active' );
    }

    hideForm () {
        classRemove( this.DOM.formBackground, 'form--active' );
        classRemove( this.DOM.patch.form, 'form-input--active' );
        classRemove( this.DOM.post.form, 'form-input--active' );
    }

    async exec () {
        this.renderLoading();

        fetch( `${ host }/user/id`, {
            credentials: 'include',
            method:      'post',
        } )
        .then( res => res.json() )
        .then( ( res ) => {
            this.config.profileId = res.roleId;
        } )
        .then( () => {
            this.renderSuccess();
            this.subscribeCancelButton();
            this.DOM.patchButtons.forEach( ( element ) => {
                element.node.addEventListener( 'click', ( node ) => {
                    this.subscribePatchButton( node );
                } );
            } );
            this.DOM.postButtons.forEach( ( element ) => {
                element.node.addEventListener( 'click', () => {
                    this.subscribePostButton();
                } );
            } );
        } );
    }
}
