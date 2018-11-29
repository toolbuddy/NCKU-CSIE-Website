/**
 * CSS of the file
 */
/* eslint no-unused-vars: off */
import header from 'static/src/js/components/common/header/index.js';
import { Announcement, } from 'static/src/js/components/user/announcement/Announcement.js';
import editorEvent from 'static/src/js/components/user/announcement/index.js';

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

header( document.getElementById( 'header' ) );
