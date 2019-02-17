/**
 * @file Faculty data fetch and filter module.
 * @author ProFatXuanAll <ProFatXuanAll@gmail.com>
 * @version 1.0.0
 * @since 1.0.0
 */

import WebLanguageUtils from 'static/src/js/utils/language.js';
import { classAdd, classRemove, } from 'static/src/js/utils/class-name.js';
import { host, } from 'settings/server/config.js';
import DepartmentUtils from 'models/faculty/utils/department.js';
import ResearchGroupUtils from 'models/faculty/utils/research-group.js';
import UrlUtils from 'static/src/js/utils/url.js';
import cardHTML from 'static/src/pug/components/about/faculty/cards.pug';
import ValidateUtils from 'models/common/utils/validate.js';

export default class GetFaculty {
    /**
     * @param {object} opt
     * @param {HTMLElement} opt.facultyDOM
     * @param {number} opt.languageId
     */

    constructor ( opt ) {
        opt = opt || {};

        if (
            !opt.facultyDOM ||
            !ValidateUtils.isDomElement( opt.facultyDOM ) ||
            !WebLanguageUtils.isSupportedLanguageId( opt.languageId )
        )
            throw new TypeError( 'invalid arguments' );

        const facultyQuerySelector = block => `.faculty__${ block }.${ block }`;
        const filterQuerySelector = element => `${ facultyQuerySelector( 'filter' ) } > .filter__${ element }.${ element } > .${ element }__tag`;

        this.DOM = {
            filter: {
                department: Array
                .from( opt.facultyDOM.querySelectorAll( filterQuerySelector( 'department' ) ) )
                .map( node => ( {
                    node,
                    id: node.getAttribute( 'data-department-id' ),
                } ) ),
                researchGroup: Array
                .from( opt.facultyDOM.querySelectorAll( filterQuerySelector( 'research-group' ) ) )
                .map( node => ( {
                    node,
                    id: node.getAttribute( 'data-research-group-id' ),
                } ) ),
            },
            noResult: opt.facultyDOM.querySelector( facultyQuerySelector( 'no-result' ) ),
            loading:  opt.facultyDOM.querySelector( facultyQuerySelector( 'loading' ) ),
            cards:    opt.facultyDOM.querySelector( facultyQuerySelector( 'cards' ) ),
        };

        if (
            !this.DOM.filter.department.length ||
            !this.DOM.filter.department.every( ( element ) => {
                if ( element.id !== null )
                    element.id = Number( element.id );
                return DepartmentUtils.isSupportedDepartmentId( element.id ) && ValidateUtils.isDomElement( element.node );
            } ) ||
            !this.DOM.filter.researchGroup.length ||
            !this.DOM.filter.researchGroup.every( ( element ) => {
                if ( element.id !== null )
                    element.id = Number( element.id );
                return ResearchGroupUtils.isSupportedResearchGroupId( element.id ) && ValidateUtils.isDomElement( element.node );
            } ) ||
            !ValidateUtils.isDomElement( this.DOM.noResult ) ||
            !ValidateUtils.isDomElement( this.DOM.loading ) ||
            !ValidateUtils.isDomElement( this.DOM.cards )
        )
            throw new Error( 'DOM not found.' );

        this.state = {
            languageId:    opt.languageId,
            department:    [],
            researchGroup: [],
        };

        return this;
    }

    /**
     * @returns {string}
     */

    get queryApi () {
        return `${ host }/api/faculty?languageId=${ this.state.languageId }`;
    }

    /**
     * @param {object[]} data
     */

    render ( data ) {
        this.DOM.cards.innerHTML = cardHTML( {
            data,
            LANG: {
                id:            this.state.languageId,
                getLanguageId: WebLanguageUtils.getLanguageId,
            },
            UTILS: {
                url: UrlUtils.serverUrl( new UrlUtils( host, this.state.languageId ) ),
                DepartmentUtils,
            },
        } );

        this.DOM.cards = Array
        .from( this.DOM.cards.querySelectorAll( '.cards > .cards__card' ) )
        .map( ( node ) => {
            const department = [
                ...new Set( ( node.getAttribute( 'data-department-ids' ) || '-1' )
                .split( ',' )
                .map( Number )
                .filter( DepartmentUtils.isSupportedDepartmentId ) ),
            ];

            const researchGroup = [
                ...new Set( ( node.getAttribute( 'data-research-group-ids' ) || '-1' )
                .split( ',' )
                .map( Number )
                .filter( ResearchGroupUtils.isSupportedResearchGroupId ) ),
            ];

            return {
                node,
                department,
                researchGroup,
            };
        } );
    }

    /**
     * @param {number} ms
     * @return {Promise}
     */

    static delay ( ms ) {
        return new Promise( res => setTimeout( res, ms ) );
    }

    subscribeFilterEvent () {
        [
            { jsName: 'department', dataName: 'department', },
            { jsName: 'researchGroup', dataName: 'research-group', },
        ].forEach( ( which ) => {
            this.DOM.filter[ which.jsName ].forEach( ( filterObj ) => {
                filterObj.node.addEventListener( 'click', () => {
                    try {
                        classAdd( this.DOM.noResult, 'no-result--hidden' );
                        classRemove( this.DOM.loading, 'loading--hidden' );
                        const index = this.state[ which.jsName ].indexOf( filterObj.id );

                        /**
                         * `.${ filter.which }__tag` not click before.
                         */

                        if ( index < 0 ) {
                            classAdd( filterObj.node, `${ which.dataName }__tag--active` );
                            this.state[ which.jsName ].push( filterObj.id );
                        }
                        else {
                            classRemove( filterObj.node, `${ which.dataName }__tag--active` );
                            this.state[ which.jsName ].splice( index, 1 );
                        }
                        if ( this.DOM.cards.filter( ( cardObj ) => {
                            if (
                                cardObj.department
                                .filter( departmentId => this.state.department.indexOf( departmentId ) >= 0 )
                                .length === this.state.department.length &&
                                cardObj.researchGroup
                                .filter( researchGroupId => this.state.researchGroup.indexOf( researchGroupId ) >= 0 )
                                .length === this.state.researchGroup.length
                            ) {
                                classRemove( cardObj.node, 'card--hide' );
                                this.constructor.delay( 100 ).then( () => {
                                    classRemove( cardObj.node, 'card--fade-out' );
                                } );
                                return true;
                            }

                            classAdd( cardObj.node, 'card--fade-out' );
                            this.constructor.delay( 500 ).then( () => {
                                classAdd( cardObj.node, 'card--hide' );
                            } );
                            return false;
                        } ).length === 0 )
                            classRemove( this.DOM.noResult, 'no-result--hidden' );
                        classAdd( this.DOM.loading, 'loading--hidden' );
                    }
                    catch ( err ) {
                        classAdd( this.DOM.loading, 'loading--hidden' );
                        classRemove( this.DOM.noResult, 'no-result--hidden' );
                        console.error( err );
                    }
                } );
            } );
        } );
    }

    async exec () {
        try {
            this.DOM.cards.innerHTML = '';
            classAdd( this.DOM.noResult, 'no-result--hidden' );

            const res = await fetch( this.queryApi );

            if ( !res.ok )
                throw new Error( 'No faculty found' );

            const data = await res.json();
            this.render( data );
            this.subscribeFilterEvent();
            classAdd( this.DOM.loading, 'loading--hidden' );
        }
        catch ( err ) {
            classAdd( this.DOM.loading, 'loading--hidden' );
            classRemove( this.DOM.noResult, 'no-result--hidden' );
            console.error( err );
        }
    }
}
