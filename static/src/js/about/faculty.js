import GetHeader from 'static/src/js/components/common/header.js';
import GetFactuly from 'static/src/js/components/about/faculty/get-faculty.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';

window.addEventListener( 'load', () => {
    const header = new GetHeader( {
        headerDOM: document.getElementById( 'header' ),
    } );

    const getFaculty = new GetFactuly( {
        facultyDOM: document.getElementById( 'faculty' ),
        languageId: WebLanguageUtils.currentLanguageId,
    } );

    getFaculty.exec();
} );
