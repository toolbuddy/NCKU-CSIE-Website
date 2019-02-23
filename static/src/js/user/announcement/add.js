import GetHeader from 'static/src/js/components/common/header.js';
import { Announcement, } from 'static/src/js/components/user/announcement/Announcement.js';
import editorEvent from 'static/src/js/components/user/announcement/index.js';

window.addEventListener( 'load', () => {
    const header = new GetHeader( {
        headerDOM: document.getElementById( 'header' ),
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
