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

    ( async () => {
        // Get announcement
        const announcement = new Announcement();
        announcement.author = 'kinoe';
        await announcement.create();

        // Initialize components
        editorEvent( {
            actionOptions:         document.getElementsByName( 'action' ),
            announcement,
            editorLanguageButtons: document.getElementsByClassName( 'editor__language' ),
            editors:               document.getElementsByClassName( 'editor__editor' ),
            submitButton:          document.getElementById( 'editor__input--submit' ),
            tagButtons:            document.getElementsByClassName( 'tags__tag' ),
            timeSelector:          document.getElementsByClassName( 'input__time' )[ 0 ],
        } );
    } )();
} );
