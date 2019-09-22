import SingleDefaultTagFilter from 'static/src/js/components/announcement/single-default-tag-filter.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import roleUtils from 'models/auth/utils/role.js';
import { host, } from 'settings/server/config.js';

try {
    const headerBase = new GetHeaderBase( {
        headerDOM:     document.querySelector( '.body__header.header.header--base' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
    if ( !( headerBase instanceof GetHeaderBase ) )
        throw new Error( '.header.header--base not found.' );
}
catch ( err ) {
    console.error( err );
}
try {
    const headerMedium = new GetHeaderMedium( {
        headerDOM:     document.querySelector( '.body__header.header.header--medium' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
    if ( !( headerMedium instanceof GetHeaderMedium ) )
        throw new Error( '.header.header--medium not found.' );
}
catch ( err ) {
    console.error( err );
}
try {
    const headerLarge = new GetHeaderLarge( {
        headerDOM:     document.querySelector( '.body__header.header.header--large' ),
    } );
    if ( !( headerLarge instanceof GetHeaderLarge ) )
        throw new Error( '.header.header--medium not found.' );
    headerLarge.renderLogin();
}
catch ( err ) {
    console.error( err );
}

async function fetchData () {
    try {
        const res = await fetch( `${ host }/user/id`, {
            credentials: 'include',
            method:      'post',
        } );

        if ( !res.ok )
            throw new Error( 'No faculty found' );

        return res.json();
    }
    catch ( err ) {
        throw err;
    }
}

( async () => {
    try {
        const result = await fetchData();
        const userRole = result.role;
        const userId =   ( userRole === roleUtils.getIdByOption( 'staff' ) ) ? result.roleId : -1;

        console.log( result );
        try {
            const filter = new SingleDefaultTagFilter( {
                defaultTag:            [ 'recruitment', ],
                supportedTag:          [],
                filterDOM:             document.getElementById( 'filter' ),
                announcementPinnedDOM: document.getElementById( 'announcement--pinned' ),
                announcementNormalDOM: document.getElementById( 'announcement--normal' ),
                pagesDOM:              document.getElementById( 'pages' ),
                scrollTopDOM:          document.getElementById( 'announcement--normal' ),
                amount:                15,
                from:                  new Date( '2018/01/01' ),
                to:                    new Date( Date.now() ),
                page:                  1,
                visiblePageNum:        2,
                userId,
                currentLanguageId:     WebLanguageUtils.currentLanguageId,
            } );
            filter.getAll();
        }
        catch ( err ) {
            console.error( err );
        }
    }
    catch ( err ) {
        console.error( err );
    }
} )();
