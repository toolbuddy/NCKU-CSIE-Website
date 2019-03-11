import { Announcement, } from 'static/src/js/components/user/announcement/Announcement.js';
import editorEvent from 'static/src/js/components/user/announcement/index.js';
import { GetHeaderMin, GetHeaderSmall, GetHeaderMedium, GetHeaderLarge, } from 'static/src/js/components/common/header.js';

window.addEventListener( 'load', () => {
    const headerMin = new GetHeaderMin( {
        headerDOM:     document.querySelector( '.body__header.header.header--min' ),
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

    let id = /edit\/(\d+)/.exec( window.location.pathname );

    if ( id === null )
        id = 0;
    else
        id = id[ 1 ];

    ( async () => {
        // Get announcement
        const announcement = new Announcement( id );
        await announcement.getBody();

        // Fill announcement body into editor
        const editors = document.getElementsByClassName( 'editor__editor' );
        Array.from( editors ).forEach( ( editor ) => {
            const language = /editor__editor--([a-zA-Z0-9-]+)/.exec( editor.className )[ 1 ];
            editor.getElementsByClassName( 'editor__input--title' )[ 0 ].value = announcement[ language ].title;
            editor.getElementsByClassName( 'editor__input--content' )[ 0 ].value = announcement[ language ].content;
        } );

        // TODO: add existed files to file tray

        // Initialize active buttons
        announcement.tags.forEach( ( tag ) => {
            document.getElementsByClassName( `tags__tag--${ tag }` )[ 0 ].classList.add( 'tags__tag--active' );
        } );

        // Initialize components
        editorEvent( {
            actionOptions:         document.getElementsByName( 'action' ),
            announcement,
            editorLanguageButtons: document.getElementsByClassName( 'editor__language' ),
            editors,
            submitButton:          document.getElementById( 'editor__input--submit' ),
            tagButtons:            document.getElementsByClassName( 'tags__tag' ),
            timeSelector:          document.getElementsByClassName( 'input__time' )[ 0 ],
        } );
    } )();
} );
