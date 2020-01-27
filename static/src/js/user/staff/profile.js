import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import SetStaffProfile from 'static/src/js/components/user/set-staff-profile.js';
import SetStaffData from 'static/src/js/components/user/set-staff-data.js';
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

( async () => {
    try {
        const result = await fetchData();
        if ( result.redirect )
            window.location = result.redirect;

        if ( result.userId > -1 && result.role === roleUtils.getIdByOption( 'staff' ) ) {
            try {
                const setStaffProfile = new SetStaffProfile( {
                    profileDOM:       document.getElementById( 'profile' ),
                    languageId:       WebLanguageUtils.currentLanguageId,
                    profileId:        result.roleId,
                } );

                setStaffProfile.exec();
            }
            catch ( err ) {
                console.error( err );
            }

            try {
                const setTitleData = new SetStaffData( {
                    blockDOM:       document.getElementById( 'title' ),
                    addButtonDOM:     document.getElementById( 'add__button--title-block' ),
                    refreshDOM:      document.querySelector( '.content__information > .information__title-block > .title-block__refresh' ),
                    loadingDOM:       document.querySelector( '.content__information > .information__title-block > .title-block__loading' ),
                    languageId:       WebLanguageUtils.currentLanguageId,
                    dbTable:          'title',
                    profileId:        result.roleId,
                } );

                setTitleData.exec();
            }
            catch ( err ) {
                console.error( err );
            }

            try {
                const setBusinessData = new SetStaffData( {
                    blockDOM:       document.getElementById( 'business' ),
                    addButtonDOM:     document.getElementById( 'add__button--business-block' ),
                    refreshDOM:      document.querySelector( '.content__information > .information__business-block > .business-block__refresh' ),
                    loadingDOM:       document.querySelector( '.content__information > .information__business-block > .business-block__loading' ),
                    languageId:       WebLanguageUtils.currentLanguageId,
                    dbTable:          'business',
                    profileId:        result.roleId,
                } );

                setBusinessData.exec();
            }
            catch ( err ) {
                console.error( err );
            }
        }
    }
    catch ( err ) {
        console.error( err );
    }
} )();

