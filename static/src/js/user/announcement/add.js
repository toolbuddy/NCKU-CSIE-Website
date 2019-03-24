import { Announcement, } from 'static/src/js/components/user/announcement/Announcement.js';
import editorEvent from 'static/src/js/components/user/announcement/index.js';
import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderSmall from 'static/src/js/components/common/header-small.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';

try {
    const headerBase = new GetHeaderBase( {
        headerDOM:     document.querySelector( '.body__header.header.header--base' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
}
catch ( err ) {
    console.error( err );
}
try {
    const headerSmall = new GetHeaderSmall( {
        headerDOM:     document.querySelector( '.body__header.header.header--small' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
}
catch ( err ) {
    console.error( err );
}
try {
    const headerMedium = new GetHeaderMedium( {
        headerDOM:     document.querySelector( '.body__header.header.header--medium' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
}
catch ( err ) {
    console.error( err );
}
try {
    const headerLarge = new GetHeaderLarge( {
        headerDOM:     document.querySelector( '.body__header.header.header--large' ),
    } );
}
catch ( err ) {
    console.error( err );
}
try {
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
}
catch ( err ) {
    console.error( err );
}
