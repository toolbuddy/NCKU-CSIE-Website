import header from 'static/src/js/components/common/header/index.js';
import MultipleDefaultTagFilter from 'static/src/js/components/announcement/multiple-default-tag.js';


header( document.getElementById( 'header' ) );

const filter = new MultipleDefaultTagFilter( {
    defaultTag: [
        'competition',
        'conference',
        'exhibition',
        'speech',
    ],
    supportedTag: [],
    filterDOM:             document.getElementById( 'filter' ),
    announcementPinnedDOM: document.getElementById( 'announcement--pinned' ),
    announcementNormalDOM: document.getElementById( 'announcement--normal' ),
    pagesDOM:              document.getElementById( 'pages' ),
    amount:                6,
} );
filter.getAll();
