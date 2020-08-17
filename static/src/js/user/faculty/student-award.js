import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import NavigationBar from 'static/src/js/components/user/navigation-bar.js';
import StudentAwardColumnsUnits from 'models/faculty/utils/student-award-columns.js';
import StudentColumnsUnits from 'models/faculty/utils/student-columns.js';
import DefaultDataManagement from 'static/src/js/components/user/faculty/default-data-management.js';
import StudentDataManagement from 'static/src/js/components/user/faculty/student-data-management.js';

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
    const nevagationBar = new NavigationBar( {
        navigationDOM: document.getElementById( 'navigation' ),
        languageId:       WebLanguageUtils.currentLanguageId,
    } );

    nevagationBar.exec();
}
catch ( err ) {
    console.error( err );
}

try {
    const studentAwardDataManagement = new DefaultDataManagement( {
        bodyFormDOM:      document.getElementById( 'form' ),
        refreshDOM:       document.querySelector( '.content__student-award > .student-award__refresh' ),
        loadingDOM:       document.querySelector( '.content__student-award > .student-award__loading' ),
        cardsDOM:         document.getElementById( 'student-award__cards' ),
        patchButtonsDOM:  document.getElementsByClassName( 'student-award-card__patch' ),
        deleteButtonsDOM: document.getElementsByClassName( 'student-award-card__delete' ),
        postButtonsDOM:   document.getElementsByClassName( 'local-topic__post-button--student-award' ),
        languageId:       WebLanguageUtils.currentLanguageId,
        columnUnits:      StudentAwardColumnsUnits,
        table:            'student-award',
        dbTable:          'studentAward',
        idColumn:         'awardId',
        deletePreview:    data => `${ data.award }`,
    } );
    if ( !( studentAwardDataManagement instanceof DefaultDataManagement ) )
        throw new Error( 'award data management error' );
    studentAwardDataManagement.exec();
}
catch ( err ) {
    console.error( err );
}

try {
    const studentDataManagement = new StudentDataManagement( {
        bodyFormDOM:      document.getElementById( 'form' ),
        refreshDOM:       document.querySelector( '.content__student-award > .student-award__refresh' ),
        loadingDOM:       document.querySelector( '.content__student-award > .student-award__loading' ),
        cardsDOM:         document.getElementById( 'student-award__cards' ),
        patchButtonsDOM:  document.getElementsByClassName( 'student-card__patch' ),
        deleteButtonsDOM: document.getElementsByClassName( 'student-card__delete' ),
        postButtonsDOM:   document.getElementsByClassName( 'student__post-button' ),
        languageId:       WebLanguageUtils.currentLanguageId,
        columnUnits:      StudentColumnsUnits,
        table:            'student',
        dbTable:          'student',
        idColumn:         'studentId',
        deletePreview:    data => `${ data.name }`,
    } );
    if ( !( studentDataManagement instanceof StudentDataManagement ) )
        throw new Error( 'award data management error' );
    studentDataManagement.exec();
}
catch ( err ) {
    console.error( err );
}
