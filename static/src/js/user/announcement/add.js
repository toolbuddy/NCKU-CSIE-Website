/**
 * CSS of the file
 */
/* eslint no-unused-vars: off */
import header from 'static/src/js/components/common/header/index.js';
import { Announcement, } from 'static/src/js/components/user/announcement/Announcement.js';
import editorEvent from 'static/src/js/components/user/announcement/index.js';

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

header( document.getElementById( 'header' ) );
