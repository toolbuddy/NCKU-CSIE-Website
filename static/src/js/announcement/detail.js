import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import EditorIcon from 'static/src/js/components/announcement/editor-icon.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';

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

try {
    let announcementId = /announcement\/(\d+)/.exec( window.location.pathname );
    if ( announcementId === null )
        announcementId = 0;
    else
        announcementId = Number( announcementId[ 1 ] );

    const editorIcon = new EditorIcon( {
        editorDOM:         document.getElementById( 'announcement__editor' ),
        announcementId,
        currentLanguageId:     WebLanguageUtils.currentLanguageId,
    } );
    if ( !( editorIcon instanceof EditorIcon ) )
        throw new Error( 'editorIcon not found' );
    editorIcon.exec();
}
catch ( err ) {
    console.error( err );
}
