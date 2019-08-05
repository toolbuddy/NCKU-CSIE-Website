import ValidateUtils from 'models/common/utils/validate.js';
import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import { host, } from 'settings/server/config.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';

class NavigationBar {
    constructor ( opt ) {
        if (
            !ValidateUtils.isDomElement( opt.navigationDOM ) ||
            !WebLanguageUtils.isSupportedLanguageId( opt.languageId )
        )
            throw new TypeError( 'invalid arguments' );

        this.DOM = {
            navigation: opt.navigationDOM,
            title:      opt.navigationDOM.querySelector( ' .navigation__title ' ),
            content:    opt.navigationDOM.querySelector( ' .navigation__content' ),
        };

        this.config = {
            languageId:       opt.languageId,
            isOpenNavigation: false,
        };

        const classModifier = {
            profile:     'profile',
            award:       'award',
            publication: 'publication',
            conference:  'conference',
        };

        this.DOM.link = {};
        Object.keys( classModifier ).forEach( ( element ) => {
            this.DOM.link[ element ] = opt.navigationDOM.querySelector( `.navigation__content > .content-${ classModifier[ element ] }` );
        } );
    }

    addButtonEventListener () {
        this.DOM.title.addEventListener( 'click', () => {
            if ( document.body.clientWidth < 1200 && !this.config.isOpenNavigation ) {
                classAdd( this.DOM.content, 'navigation__content--active' );
                this.config.isOpenNavigation = true;
            }
            else
                this.closeNavigation();
        } );

        Object.keys( this.DOM.link ).forEach( ( element ) => {
            this.DOM.link[ element ].addEventListener( 'click', () => {
                window.location = `${ host }/user/${ element }?languageId=${ this.config.languageId }`;
                this.closeNavigation();
            } );
        } );
    }

    closeNavigation () {
        classRemove( this.DOM.content, 'navigation__content--active' );
        this.config.isOpenNavigation = false;
    }

    async exec () {
        this.addButtonEventListener();
    }
}

export default NavigationBar;
