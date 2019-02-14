import { classAdd, classRemove, } from 'static/src/js/utils/class-name.js';
import DefaultTagFilter from 'static/src/js/components/announcement/default-tag-filter.js';
import ValidateUtils from 'models/common/utils/validate.js';
import TagUtils from 'models/announcement/utils/tag';

export default class MultipleDefaultTagFilter extends DefaultTagFilter {
    subscribeTimeEvent () {
        [
            'from',
            'to',
        ].forEach( ( timeFilter ) => {
            [
                'year',
                'month',
                'date',
            ].forEach( ( timePart ) => {
                this.DOM.filter[ timeFilter ][ timePart ].addEventListener( 'change', () => {
                    try {
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

                        this.pushState();
                        this.getAll();
                    }
                    catch ( err ) {
                        console.error( err );
                    }
                } );
            } );
        } );
    }

    subscribeTagEvent () {
        this.DOM.filter.tags.forEach( ( tagObj ) => {
            /**
             * Default tag event subscribe.
             */

            if ( tagObj.id === TagUtils.tagAllId ) {
                /**
                 * Default tag should be always active.
                 */

                classAdd( tagObj.node, 'tags__tag--active' );
                tagObj.node.addEventListener( 'click', () => {
                    this.DOM.filter.tags.forEach( ( tagObj ) => {
                        classRemove( tagObj.node, 'tags__tag--active' );
                    } );
                    classAdd( tagObj.node, 'tags__tag--active' );
                    this.state.page = this.config.page;
                    this.state.tagParam = [];
                    this.pushState();
                    this.getAll();
                } );
            }
            else {
                tagObj.node.addEventListener( 'click', () => {
                    const index = this.state.tagParam.indexOf( tagObj.id );
                    if ( index >= 0 ) {
                        this.state.tagParam.splice( index, 1 );
                        classRemove( tagObj.node, 'tags__tag--active' );
                    }
                    else {
                        this.state.tagParam.push( tagObj.id );
                        classAdd( tagObj.node, 'tags__tag--active' );
                    }
                    this.state.page = this.config.page;

                    if ( this.state.tagParam.length === 0 )
                        this.state.tagParam = [];

                    this.pushState();
                    this.getAll();
                } );
            }
        } );
    }
}
