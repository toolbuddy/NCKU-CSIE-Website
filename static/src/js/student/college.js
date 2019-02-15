import header from 'static/src/js/components/common/header/index.js';
import SingleDefaultTagFilter from 'static/src/js/components/announcement/single-default-tag-filter.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';

header( document.getElementById( 'header' ) );

const filter = new SingleDefaultTagFilter( {
    defaultTag:   [ 'college', ],
    supportedTag: [
        'speech',
        'conference',
        'exhibition',
        'competition',
        'award',
        'internship',
        'scholarship',
        'international',
        'rule',
    ],
    filterDOM:             document.getElementById( 'filter' ),
    announcementPinnedDOM: document.getElementById( 'announcement--pinned' ),
    announcementNormalDOM: document.getElementById( 'announcement--normal' ),
    pagesDOM:              document.getElementById( 'pages' ),
    amount:                6,
    from:                  new Date( '2019/01/01' ),
    to:                    new Date( Date.now() ),
    page:                  1,
    visiblePageNum:        2,
    currentLanguageId:     WebLanguageUtils.currentLanguageId,
    scrollTop:             document.getElementById( 'content' ).offsetTop,
} );
filter.getAll();
