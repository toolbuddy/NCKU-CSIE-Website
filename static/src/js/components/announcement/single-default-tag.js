import TagUtils from 'models/announcement/utils/tag.js';
import tagsHTML from 'static/src/pug/components/announcement/tags.pug';
import { classAdd, classRemove, } from 'static/src/js/utils/class-name.js';
import DefaultTagFilter from 'static/src/js/components/announcement/default-tag.js';
import ValidateUtils from 'models/common/utils/validate.js';

export default class SingleDefaultTagFilter extends DefaultTagFilter{
    constructTagHTML(){
        let tags = [{
            color: TagUtils.getTagColorById(this.tagId.default[0]),
            tagId: -1,
            tag: TagUtils.getTagById({
                tagId: this.tagId.default[0],
                languageId: this.state.languageId,
            }),
        }];
        this.tagId.supported.forEach(tagId => {
            tags.push({
                color: TagUtils.getTagColorById( tagId ),
                tagId,
                tag:   TagUtils.getTagById( { tagId, languageId: this.state.languageId, } ),
            });
        });
        this.DOM.filter.tags.innerHTML = tagsHTML( {
            tags,
        } );
    }
    
    subscribeTimeEvent(){
        [
            'year',
            'month',
            'date',
        ].forEach( ( key ) => {
            this.DOM.filter.from[ key ].addEventListener( 'change', () => {
                const year  = this.DOM.filter.from.year.value;
                const month = this.DOM.filter.from.month.value;
                const date  = this.DOM.filter.from.date.value;
                this.state.page = this.config.page;
                this.state.from = new Date( `${ year }/${ month }/${ date }` );

                if(!ValidateUtils.isValidDate(this.state.from) || !Number.isNaN(this.state.from))
                    throw new TypeError('invalid arguments');
                
                if (this.state.selectAll){
                    this.getPage(this.tagId.default).then(()=>{
                        this.getPinnedAnnouncement(this.tagId.default);
                    }).then(()=>{
                        this.getNormalAnnouncement(this.tagId.default);
                    });
                }else{
                    this.getPage(this.tagId.default.concat(this.state.tags)).then(() => {
                        this.getPinnedAnnouncement(this.tagId.default.concat(this.state.tags));
                    }).then(() => {
                        this.getNormalAnnouncement(this.tagId.default.concat(this.state.tags));
                    });
                }
            } );
        } );

        [
            'year',
            'month',
            'date',
        ].forEach( ( key ) => {
            this.DOM.filter.to[ key ].addEventListener( 'change', () => {
                const year  = this.DOM.filter.to.year.value;
                const month = this.DOM.filter.to.month.value;
                const date  = this.DOM.filter.to.date.value;
                this.state.page = this.config.page;
                this.state.to = new Date( `${ year }/${ month }/${ date }` );

                if(!ValidateUtils.isValidDate(this.state.to) || !Number.isNaN(this.state.to))
                    throw new TypeError('invalid arguments');

                if (this.state.selectAll){
                    this.getPage(this.tagId.default).then(()=>{
                        this.getPinnedAnnouncement(this.tagId.default);
                    }).then(()=>{
                        this.getNormalAnnouncement(this.tagId.default);
                    });
                }else{
                    this.getPage(this.tagId.default.concat(this.state.tags)).then(() => {
                        this.getPinnedAnnouncement(this.tagId.default.concat(this.state.tags));
                    }).then(() => {
                        this.getNormalAnnouncement(this.tagId.default.concat(this.state.tags));
                    });
                }
            } );
        } );
    }

    subscribeTagEvent(){
        const tagDOMArr = Array.from( this.DOM.filter.tags.querySelectorAll( '.tags__tag' ) );
        tagDOMArr.forEach( ( tagDOM ) => {
            const tagId = Number( tagDOM.getAttribute( 'data-tag-id' ) );

            /* Default tag event subscribe */
            if(tagId === -1){
                /* Default tag should be always active. */
                classAdd( tagDOM, 'tags__tag--active' );
                tagDOM.addEventListener( 'click', () => {
                    tagDOMArr.forEach( ( tagDOM ) => {
                        classRemove( tagDOM, 'tags__tag--active' );
                    } );
                    classAdd( tagDOM, 'tags__tag--active' );
                    this.state.selectAll = true;
                    this.state.tags = [];
                    this.state.tags.push(tagId);
                    this.state.page = this.config.page;
                    this.getPage(this.tagId.default).then(()=>{
                        this.getPinnedAnnouncement(this.tagId.default);
                    }).then(()=>{
                        this.getNormalAnnouncement(this.tagId.default);
                    });
                } );
            }else{
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
                    this.state.selectAll = false;
                    this.state.page = this.config.page;
                    this.getPage(this.tagId.default.concat(this.state.tags)).then(() => {
                        this.getPinnedAnnouncement(this.tagId.default.concat(this.state.tags));
                    }).then(() => {
                        this.getNormalAnnouncement(this.tagId.default.concat(this.state.tags));
                    });
                } );
            }
        } );
    }
}
