import { classAdd, classRemove, } from 'static/src/js/utils/class-name.js';
import DefaultTagFilter from 'static/src/js/components/announcement/default-tag.js';
import ValidateUtils from 'models/common/utils/validate.js';

export default class SingleDefaultTagFilter extends DefaultTagFilter {
    subscribeTimeEvent () {
        [
            'from',
            'to',
        ].forEach( ( timeFilter ) => {
            [
                'year',
                'month',
                'date',
            ].forEach( ( key ) => {
                this.DOM.filter[ timeFilter ][ key ].addEventListener( 'change', () => {
                    const year  = this.DOM.filter[ timeFilter ].year.value;
                    const month = this.DOM.filter[ timeFilter ].month.value;
                    const date  = this.DOM.filter[ timeFilter ].date.value;
                    this.state.page = this.config.page;
                    this.state[ timeFilter ] = new Date( `${ year }/${ month }/${ date }` );

                    if ( !ValidateUtils.isValidDate( this.state[ timeFilter ] ) ) {
                        this.DOM.announcement.pinned.briefings.innerHTML = '';
                        classAdd( this.DOM.announcement.pinned.loading, 'loading--hidden' );
                        classRemove( this.DOM.announcement.pinned.noResult, 'no-result--hidden' );
                        this.DOM.announcement.normal.briefings.innerHTML = '';
                        classAdd( this.DOM.announcement.normal.loading, 'loading--hidden' );
                        classRemove( this.DOM.announcement.normal.noResult, 'no-result--hidden' );
                        throw new TypeError( 'invalid arguments' );
                    }

                    if ( this.state.selectDefault ) {
                        this.state.tagParam = this.tagId.default;
                        this.getAll();
                    }
                    else {
                        this.state.tagParam = this.tagId.default.concat( this.state.tags );
                        this.getAll();
                    }
                } );
            } );
        } );
    }

    subscribeTagEvent () {
        const tagDOMArr = Array.from( this.DOM.filter.tags.querySelectorAll( '.tags__tag' ) );
        tagDOMArr.forEach( ( tagDOM ) => {
            const tagId = Number( tagDOM.getAttribute( 'data-tag-id' ) );

            /* Default tag event subscribe */

            if ( tagId === -1 ) {
                /* Default tag should be always active. */

                classAdd( tagDOM, 'tags__tag--active' );
                tagDOM.addEventListener( 'click', () => {
                    tagDOMArr.forEach( ( tagDOM ) => {
                        classRemove( tagDOM, 'tags__tag--active' );
                    } );
                    classAdd( tagDOM, 'tags__tag--active' );
                    this.state.selectDefault = true;
                    this.state.tags = [];
                    this.state.tags.push( tagId );
                    this.state.page = this.config.page;

                    this.state.tagParam = this.tagId.default;
                    this.getAll();
                } );
            }
            else {
                tagDOM.addEventListener( 'click', () => {
                    const index = this.state.tags.indexOf( tagId );
                    if ( index >= 0 ) {
                        this.state.tags.splice( index, 1 );
                        classRemove( tagDOM, 'tags__tag--active' );
                    }
                    else {
                        this.state.tags.push( tagId );
                        classAdd( tagDOM, 'tags__tag--active' );
                    }
                    this.state.selectDefault = false;
                    this.state.page = this.config.page;

                    this.state.tagParam = this.tagId.default.concat( this.state.tags );
                    this.getAll();
                } );
            }
        } );
    }
}
