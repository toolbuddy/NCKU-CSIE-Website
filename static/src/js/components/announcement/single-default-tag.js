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
            ].forEach( ( timePart ) => {
                this.DOM.filter[ timeFilter ][ timePart ].addEventListener( 'change', () => {
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
        this.DOM.filter.tags.forEach( ( tagDOM ) => {
            /* Default tag event subscribe */

            if ( tagDOM.id === this.tagId.default[ 0 ] ) {
                /* Default tag should be always active. */

                classAdd( tagDOM.node, 'tags__tag--active' );
                tagDOM.node.addEventListener( 'click', () => {
                    this.DOM.filter.tags.forEach( ( tagDOM ) => {
                        classRemove( tagDOM.node, 'tags__tag--active' );
                    } );

                    classAdd( tagDOM.node, 'tags__tag--active' );

                    this.state.selectDefault = true;
                    this.state.tags = [ tagDOM.id, ];
                    this.state.page = this.config.page;
                    this.state.tagParam = this.tagId.default;

                    this.getAll();
                } );
            }
            else {
                tagDOM.node.addEventListener( 'click', () => {
                    const index = this.state.tags.indexOf( tagDOM.id );
                    if ( index >= 0 ) {
                        this.state.tags.splice( index, 1 );
                        classRemove( tagDOM.node, 'tags__tag--active' );
                    }
                    else {
                        this.state.tags.push( tagDOM.id );
                        classAdd( tagDOM.node, 'tags__tag--active' );
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
