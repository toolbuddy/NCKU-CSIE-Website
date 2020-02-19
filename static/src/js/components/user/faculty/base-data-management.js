import ValidateUtils from 'models/common/utils/validate.js';
import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import LanguageUtils from 'models/common/utils/language.js';

// Import roleUtils from 'models/auth/utils/role.js';
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
            languageId: opt.languageId,
            dbTable:    opt.dbTable,
        };

        const checkButtonQuerySelector = method => ` #form-${ opt.dbTable }-${ method } > .form-input__button > .button__check`;
        const cancelButtonQuerySelector = method => ` #form-${ opt.dbTable }-${ method } > .form-input__button > .button__cancel`;
        const errorMessageQuerySelector = method => ` #form-${ opt.dbTable }-${ method } > .form-input__content> .content__error-message`;

        this.DOM = {
            patch: {
                checkButton:  opt.bodyFormDOM.querySelector( checkButtonQuerySelector( 'patch' ) ),
                cancelButton: opt.bodyFormDOM.querySelector( cancelButtonQuerySelector( 'patch' ) ),
                errorMessage: opt.bodyFormDOM.querySelector( errorMessageQuerySelector( 'patch' ) ),
            },
            post: {
                checkButton:  opt.bodyFormDOM.querySelector( checkButtonQuerySelector( 'post' ) ),
                cancelButton: opt.bodyFormDOM.querySelector( cancelButtonQuerySelector( 'post' ) ),
                errorMessage: opt.bodyFormDOM.querySelector( errorMessageQuerySelector( 'post' ) ),
            },
            form: {
                patch: opt.bodyFormDOM.querySelector( `#form-${ opt.dbTable }-patch` ),
                post:   opt.bodyFormDOM.querySelector( `#form-${ opt.dbTable }-post` ),
                body:  opt.bodyFormDOM,
            },
            cards: {
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

    async setProfileId () {
        try {
            const res = await fetch( `${ host }/user/id`, {
                credentials: 'include',
                method:      'post',
            } );

            this.config.test = 1;
            if ( !res.ok )
                throw new Error( 'No faculty found' );
            return res.json();
        }
        catch ( err ) {
            console.error( err );
        }
    }

    subscribePostButton () {
        this.DOM.postButtons.forEach( ( element ) => {
            element.node.addEventListener( 'click', () => {
                classAdd( this.DOM.form.body, 'form--active' );
                classAdd( this.DOM.form.post, 'form-input--active' );
            } );
        } );
    }

    async subscribePatchButton () {
        this.DOM.patchButtons.forEach( async ( element ) => {
            element.node.addEventListener( 'click', async () => {
                Promise.all( LanguageUtils.supportedLanguageId.map( async ( languageId ) => {
                    try {
                        const res = await fetch( `${ host }/api/faculty/facultyWithId/${ this.config.profileId }?languageId=${ languageId }` );
                        if ( !res.ok )
                            throw new Error( 'No faculty found' );
                    }
                    catch ( err ) {
                        throw err;
                    }
                } ) );

                // .then( async ( data ) => {
                //     console.log( data );
                // } );
            } );
        } );
    }

    async exec () {
        this.renderLoading();

        // Const roleRes = await fetch( `${ host }/user/id`, {
        //     credentials: 'include',
        //     method:      'post',
        // } );
        await this.setProfileId();
        this.renderSuccess();
        this.subscribePostButton();
        this.subscribePatchButton(); 
    }
}
