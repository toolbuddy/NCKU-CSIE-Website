import { Announcement, } from 'static/src/js/components/user/announcement/Announcement.js';
import editorEvent from 'static/src/js/components/user/announcement/index.js';
import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import AnnouncementEvent from 'static/src/js/components/user/announcement/announcement-event.js';
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
    let id = /edit\/(\d+)/.exec( window.location.pathname );

    if ( id === null )
        id = 0;
    else
        id = id[ 1 ];


    console.log( id );
    const announcementEvent = new AnnouncementEvent( {
        id:             Number( id ),
        languageId:     WebLanguageUtils.currentLanguageId,
        editBlockDOM: document.getElementById( 'edit-block' ),
    } );
    announcementEvent.exec();
}
catch ( err ) {
    console.error( err );
}


// Try {
//     let id = /edit\/(\d+)/.exec( window.location.pathname );

//     if ( id === null )
//         id = 0;
//     else
//         id = id[ 1 ];

//     console.log( id );

//     ( async () => {
//         // Get announcement
//         const announcement = new Announcement( id );
//         await announcement.getBody();

//         // Fill announcement body into editor
//         const editors = document.getElementsByClassName( 'editor__editor' );
//         Array.from( editors ).forEach( ( editor ) => {
//             const language = /editor__editor--([a-zA-Z0-9-]+)/.exec( editor.className )[ 1 ];
//             editor.getElementsByClassName( 'editor__input--title' )[ 0 ].value = announcement[ language ].title;
//             editor.getElementsByClassName( 'editor__input--content' )[ 0 ].value = announcement[ language ].content;
//         } );

//         // TODO: add existed files to file tray

//         // Initialize active buttons
//         announcement.tags.forEach( ( tag ) => {
//             document.getElementsByClassName( `tags__tag--${ tag }` )[ 0 ].classList.add( 'tags__tag--active' );
//         } );

//         // Initialize components
//         editorEvent( {
//             actionOptions:         document.getElementsByName( 'action' ),
//             announcement,
//             editorLanguageButtons: document.getElementsByClassName( 'editor__language' ),
//             editors,
//             submitButton:          document.getElementById( 'editor__input--submit' ),
//             tagButtons:            document.getElementsByClassName( 'tags__tag' ),
//             timeSelector:          document.getElementsByClassName( 'input__time' )[ 0 ],
//         } );
//     } )();
// }
// catch ( err ) {
//     console.error( err );
// }
