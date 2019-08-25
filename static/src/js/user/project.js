import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import NavigationBar from 'static/src/js/components/user/navigation-bar.js';
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
        console.error( err );
    }
}

( async () => {
    try {
        const result = await fetchData();
        if ( result.userId > -1 && result.role === roleUtils.getIdByOption( 'faculty' ) ) {
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
                const setProjectData = new SetData( {
                    blockDOM:       document.getElementById( 'project' ),
                    addButtonDOM:     document.getElementById( 'add__button--project-block' ),
                    noResultDOM:      document.querySelector( '.content__main > .main__project-block > .project-block__no-result' ),
                    loadingDOM:       document.querySelector( '.content__main > .main__project-block > .project-block__loading' ),
                    languageId:       WebLanguageUtils.currentLanguageId,
                    dbTable:          'project',
                    profileId:        result.roleId,
                } );

                setProjectData.exec();
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
