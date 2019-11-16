import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import NavigationBar from 'static/src/js/components/user/navigation-bar.js';
import SetProfileData from 'static/src/js/components/user/set-profile-data.js';
import { SetData, } from 'static/src/js/components/user/set-data.js';
import { host, } from 'settings/server/config.js';
import roleUtils from 'models/auth/utils/role.js';

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

async function fetchData () {
    try {
        const res = await fetch( `${ host }/user/id`, {
            credentials: 'include',
            method:      'post',
        } );

        if ( !res.ok )
            throw new Error( 'No faculty found' );

        return res.json();
    }
    catch ( err ) {
        throw err;
    }
}

// ( async () => {
//     try {
//         const result = await fetchData();
//         if ( result.redirect )
//             window.location = result.redirect;

//         if ( result.userId > -1 && result.role === roleUtils.getIdByOption( 'faculty' ) ) {
//             try {
//                 const nevagationBar = new NavigationBar( {
//                     navigationDOM: document.getElementById( 'navigation' ),
//                     languageId:       WebLanguageUtils.currentLanguageId,
//                 } );

//                 nevagationBar.exec();
//             }
//             catch ( err ) {
//                 console.error( err );
//             }

//             try {
//                 const setProfileData = new SetProfileData( {
//                     profileDOM:       document.getElementById( 'profile' ),
//                     languageId:       WebLanguageUtils.currentLanguageId,
//                     profileId:        result.roleId,
//                 } );

//                 setProfileData.exec();
//             }
//             catch ( err ) {
//                 console.error( err );
//             }

//             try {
//                 const setEducationData = new SetData( {
//                     blockDOM:       document.getElementById( 'education' ),
//                     addButtonDOM:     document.getElementById( 'add__button--education-block' ),
//                     refreshDOM:      document.querySelector( '.content__information > .information__education-block > .education-block__refresh' ),
//                     loadingDOM:       document.querySelector( '.content__information > .information__education-block > .education-block__loading' ),
//                     languageId:       WebLanguageUtils.currentLanguageId,
//                     dbTable:          'education',
//                     profileId:        result.roleId,
//                 } );

//                 setEducationData.exec();
//             }
//             catch ( err ) {
//                 console.error( err );
//             }
//             try {
//                 const setExperienceData = new SetData( {
//                     blockDOM:       document.getElementById( 'experience' ),
//                     addButtonDOM:     document.getElementById( 'add__button--experience-block' ),
//                     refreshDOM:      document.querySelector( '.content__information > .information__experience-block > .experience-block__refresh' ),
//                     loadingDOM:       document.querySelector( '.content__information > .information__experience-block > .experience-block__loading' ),
//                     languageId:       WebLanguageUtils.currentLanguageId,
//                     dbTable:          'experience',
//                     profileId:        result.roleId,
//                 } );
//                 if ( !( setExperienceData instanceof SetData ) )
//                     throw new Error( 'setExperienceData inVaild' );

//                 setExperienceData.exec();
//             }
//             catch ( err ) {
//                 console.error( err );
//             }

//             try {
//                 const setTitleData = new SetData( {
//                     blockDOM:         document.getElementById( 'title' ),
//                     addButtonDOM:     document.getElementById( 'add__button--title' ),
//                     refreshDOM:      document.querySelector( '.content__information > .information__profile > .title__refresh' ),
//                     loadingDOM:       document.querySelector( '.content__information > .information__profile > .title__loading' ),
//                     languageId:       WebLanguageUtils.currentLanguageId,
//                     dbTable:          'title',
//                     profileId:        result.roleId,
//                 } );
//                 if ( !( setTitleData instanceof SetData ) )
//                     throw new Error( 'setTitleData inVaild' );

//                 setTitleData.exec();
//             }
//             catch ( err ) {
//                 console.error( err );
//             }

//             try {
//                 const setSpecialtyData = new SetData( {
//                     blockDOM:         document.getElementById( 'specialty' ),
//                     addButtonDOM:     document.getElementById( 'add__button--specialty' ),
//                     refreshDOM:      document.querySelector( '.content__information > .information__profile > .speciaty__refresh' ),
//                     loadingDOM:       document.querySelector( '.content__information > .information__profile > .speciaty__loading' ),
//                     languageId:       WebLanguageUtils.currentLanguageId,
//                     dbTable:          'specialty',
//                     profileId:        result.roleId,
//                 } );
//                 if ( !( setSpecialtyData instanceof SetData ) )
//                     throw new Error( 'setSpecialtyData inVaild' );

//                 setSpecialtyData.exec();
//             }
//             catch ( err ) {
//                 console.error( err );
//             }
//         }
//     }
//     catch ( err ) {
//         console.error( err );
//     }
// } )();

