import GetHeaderBase from 'static/src/js/components/common/headerBase.js';
import GetHeaderSmall from 'static/src/js/components/common/headerSmall.js';
import GetHeaderMedium from 'static/src/js/components/common/headerMedium.js';
import GetHeaderLarge from 'static/src/js/components/common/headerLarge.js';
import SingleDefaultTagFilter from 'static/src/js/components/announcement/single-default-tag-filter.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';

window.addEventListener( 'load', () => {
    const headerBase = new GetHeaderBase( {
        headerDOM:     document.querySelector( '.body__header.header.header--base' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
    const headerSmall = new GetHeaderSmall( {
        headerDOM:     document.querySelector( '.body__header.header.header--small' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
    const headerMedium = new GetHeaderMedium( {
        headerDOM:     document.querySelector( '.body__header.header.header--medium' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
    const headerLarge = new GetHeaderLarge( {
        headerDOM:     document.querySelector( '.body__header.header.header--large' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );

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
        scrollTopDOM:          document.getElementById( 'announcement--normal' ),
        amount:                6,
        from:                  new Date( '2019/01/01' ),
        to:                    new Date( Date.now() ),
        page:                  1,
        visiblePageNum:        2,
        currentLanguageId:     WebLanguageUtils.currentLanguageId,
    } );
    filter.getAll();
} );
