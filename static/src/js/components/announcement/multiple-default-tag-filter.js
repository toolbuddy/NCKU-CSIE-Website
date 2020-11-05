import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import DefaultTagFilter from 'static/src/js/components/announcement/default-tag-filter.js';
import tagUtils from 'models/announcement/utils/tag';

export default class MultipleDefaultTagFilter extends DefaultTagFilter {
    subscribeTagEvent () {
        this.DOM.filter.tags.forEach( ( tagObj ) => {
            /**
             * Default tag event subscribe.
             */

            if ( tagObj.id === tagUtils.tagAllId ) {
                /**
                 * Default tag should be always active.
                 */

                // classAdd( tagObj.node, 'tags__tag--active' );
                tagObj.node.addEventListener( 'click', () => {
                    try {
                        if ( this.isLocked() )
                            return;
                        this.acquireLock();

                        this.DOM.filter.tags.forEach( ( tagObj ) => {
                            classRemove( tagObj.node, 'tags__tag--active' );
                        } );

                        classAdd( tagObj.node, 'tags__tag--active' );

                        this.state.page = this.config.page;
                        this.state.tags = [];

                        this.pushState();
                        this.getAll();
                    }
                    catch ( err ) {
                        console.error( err );
                    }
                } );
            }
            else {
                tagObj.node.addEventListener( 'click', () => {
                    try {
                        if ( this.isLocked() )
                            return;
                        this.acquireLock();

                        const index = this.state.tags.indexOf( tagObj.id );

                        if ( index >= 0 ) {
                            this.state.tags.splice( index, 1 );
                            classRemove( tagObj.node, 'tags__tag--active' );
                        }
                        else {
                            this.state.tags.push( tagObj.id );
                            classAdd( tagObj.node, 'tags__tag--active' );
                        }

                        if ( this.state.tags.length === 0 ) {
                            this.DOM.filter.tags.forEach( ( tmpTagObj ) => {
                                if ( tmpTagObj.id === tagUtils.tagAllId )
                                    classAdd( tmpTagObj.node, 'tags__tag--active' );
                            } );
                        }
                        else {
                            this.DOM.filter.tags.forEach( ( tmpTagObj ) => {
                                if ( tmpTagObj.id === tagUtils.tagAllId )
                                    classRemove( tmpTagObj.node, 'tags__tag--active' );
                            } );
                        }

                        this.state.page = this.config.page;

                        if ( this.state.tags.length === 0 )
                            this.state.tags = [];

                        this.pushState();
                        this.getAll();
                    }
                    catch ( err ) {
                        console.error( err );
                    }
                } );
            }
        } );
    }
}
