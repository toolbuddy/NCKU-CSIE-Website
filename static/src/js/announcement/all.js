import header from 'static/src/js/components/common/header/index.js';
import MultipleDefaultTagFilter from 'static/src/js/components/announcement/multiple-default-tag.js';

header( document.getElementById( 'header' ) );

const filter = new MultipleDefaultTagFilter({
    defaultTag: [
        'award',
        'college',
        'competition',
        'conference',
        'course',
        'exhibition',
        'faculty',
        'international',
        'internship',
        'master',
        'phd',
        'recruitment',
        'rule',
        'scholarship',
        'speech',
    ],
    supportedTag: [],
    filterDOM:             document.getElementById( 'filter' ),
    announcementPinnedDOM: document.getElementById( 'announcement--pinned' ),
    announcementNormalDOM: document.getElementById( 'announcement--normal' ),
    pagesDOM:              document.getElementById( 'pages' ),
    amount:                6,
});
