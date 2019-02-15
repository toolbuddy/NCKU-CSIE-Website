import header from 'static/src/js/components/common/header/index.js';
import SingleDefaultTagFilter from 'static/src/js/components/announcement/single-default-tag-filter.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';

header( document.getElementById( 'header' ) );

const filter = new SingleDefaultTagFilter( {
    defaultTag:            [ 'recruitment', ],
    supportedTag:          [],
    filterDOM:             document.getElementById( 'filter' ),
    announcementPinnedDOM: document.getElementById( 'announcement--pinned' ),
    announcementNormalDOM: document.getElementById( 'announcement--normal' ),
    pagesDOM:              document.getElementById( 'pages' ),
    amount:                6,
    config:                {
        from:              new Date( '2019/01/01' ),
        to:                new Date( Date.now() ),
        page:              1,
        visiblePageNum:    2,
        currentLanguageId: WebLanguageUtils.currentLanguageId,
    },
} );
filter.getAll();
