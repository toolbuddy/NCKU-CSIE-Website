/**
 * @file Faculty data fetch and filter module.
 * @author ProFatXuanAll <ProFatXuanAll@gmail.com>
 * @version 1.0.0
 * @since 1.0.0
 */

import WebLanguageUtils from 'static/src/js/utils/language.js';
import { classAdd, classRemove, delay, } from 'static/src/js/utils/class-name.js';
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
            DOM:           {
                show: [],
                hide: [],
            },
        };

        /**
         * ONLY USE `this.execLock` and `this.eventLock` WITH FOLLOWING FUNCTIONS:
         * - `this.constructor.acquireLock()`
         * - `this.constructor.releaseLock()`
         * - `this.constructor.isLocked()`
         */

        this.eventLock = false;

        return this;
    }

    static acquireLock ( lock ) {
        if ( lock )
            return;
        lock = true;
    }

    static releaseLock ( lock ) {
        if ( lock )
            lock = false;
    }

    /**
     * @returns {boolean}
     */

    static isLocked ( lock ) {
        return lock;
    }

    /**
     * @returns {string}
     */

    get queryApi () {
        return `${ host }/api/faculty?languageId=${ this.state.languageId }`;
    }

    async fetchData () {
        try {
            const res = await fetch( this.queryApi );

            if ( !res.ok )
                throw new Error( 'No faculty found' );

            return res.json();
        }
        catch ( err ) {
            throw err;
        }
    }

    renderLoading () {
        classAdd( this.DOM.noResult, 'no-result--hidden' );
        classRemove( this.DOM.loading, 'loading--hidden' );
    }

    renderLoadingSucceed () {
        classAdd( this.DOM.loading, 'loading--hidden' );
        classAdd( this.DOM.noResult, 'no-result--hidden' );
    }

    renderLoadingFailed () {
        classAdd( this.DOM.loading, 'loading--hidden' );
        classRemove( this.DOM.noResult, 'no-result--hidden' );
    }

    /**
     * @param {object[]} data
     */

    renderCard ( data ) {
        try {
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

            this.state.DOM.show = Array
            .from( this.DOM.cards.querySelectorAll( '.cards > .cards__card' ) )
            .map( ( node ) => {
                const department = [ ...new Set(
                    String( node.getAttribute( 'data-department-ids' ) || NaN )
                    .split( ',' )
                    .map( Number )
                    .filter( DepartmentUtils.isSupportedDepartmentId )
                ), ];

                const researchGroup = [ ...new Set(
                    String( node.getAttribute( 'data-research-group-ids' ) || NaN )
                    .split( ',' )
                    .map( Number )
                    .filter( ResearchGroupUtils.isSupportedResearchGroupId )
                ), ];

                return {
                    node,
                    department,
                    researchGroup,
                };
            } );
        }
        catch ( err ) {
            throw err;
        }
    }

    subscribeFilterEvent () {
        [
            { jsName: 'department', dataName: 'department', },
            { jsName: 'researchGroup', dataName: 'research-group', },
        ].forEach( which => this.DOM.filter[ which.jsName ].forEach( ( filterObj ) => {
            filterObj.node.addEventListener( 'click', async () => {
                if ( this.constructor.isLocked( this.eventLock ) )
                    return;

                try {
                    this.constructor.acquireLock( this.eventLock );

                    this.renderLoading();

                    const index = this.state[ which.jsName ].indexOf( filterObj.id );

                    /**
                     * `.${ filter.which }__tag` is not clicked before.
                     */

                    if ( index < 0 ) {
                        classAdd( filterObj.node, `${ which.dataName }__tag--active` );
                        this.state[ which.jsName ].push( filterObj.id );
                        this.state.DOM.show = this.state.DOM.show.filter( ( cardObj ) => {
                            if ( cardObj[ which.jsName ].indexOf( filterObj.id ) < 0 ) {
                                this.state.DOM.hide.push( cardObj );
                                classAdd( cardObj.node, 'card--fade-out' );
                                delay( 500 ).then( () => {
                                    classAdd( cardObj.node, 'card--hide' );
                                } );
                                return false;
                            }
                            return true;
                        } );
                    }

                    /**
                     * `.${ filter.which }__tag` is clicked before.
                     */

                    else {
                        classRemove( filterObj.node, `${ which.dataName }__tag--active` );
                        this.state[ which.jsName ].splice( index, 1 );
                        this.state.DOM.hide = this.state.DOM.hide.filter( ( cardObj ) => {
                            if (
                                this.state.department.some( departmentId => cardObj.department.indexOf( departmentId ) < 0 ) ||
                                this.state.researchGroup.some( researchGroupId => cardObj.researchGroup.indexOf( researchGroupId ) < 0 )
                            )
                                return true;

                            this.state.DOM.show.push( cardObj );
                            classRemove( cardObj.node, 'card--hide' );
                            delay( 100 ).then( () => {
                                classRemove( cardObj.node, 'card--fade-out' );
                            } );
                            return false;
                        } );
                    }

                    await delay( 600 );
                    if ( this.state.DOM.show.length )
                        this.renderLoadingSucceed();

                    else
                        this.renderLoadingFailed();
                }
                catch ( err ) {
                    this.renderLoadingFailed();
                    console.error( err );
                }
                finally {
                    this.constructor.releaseLock( this.eventLock );
                }
            } );
        } ) );
    }

    async exec () {
        try {
            this.renderLoading();
            this.renderCard( await this.fetchData() );
            this.subscribeFilterEvent();
            this.renderLoadingSucceed();
        }
        catch ( err ) {
            this.renderLoadingFailed();
            console.error( err );
        }
    }
}
