import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import { host, } from 'settings/server/config.js';
import DropdownControl from 'static/src/js/components/user/dropdown';
import BlockControl from 'static/src/js/components/user/block-control';

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
}
catch ( err ) {
    console.error( err );
}

try {
    const userNation = new DropdownControl(
        document.querySelectorAll( '.nation-dropdown__content' )
    );
    if ( !( userNation instanceof DropdownControl ) )
        throw new Error( 'DropdownControl not founs' );
}
catch ( err ) {
    console.error( err );
}

try {
    const degreeDropdown = new DropdownControl(
        document.querySelectorAll( ' .dropdown__content' )
    );
    if ( !( degreeDropdown instanceof DropdownControl ) )
        throw new Error( 'degreeDropdown not founs' );
}
catch ( err ) {
    console.error( err );
}

try {
    const titleBlockControl = new BlockControl(
        document.getElementById( 'title__input-button--add' ),
        false,
    );
    if ( !( titleBlockControl instanceof BlockControl ) )
        throw new Error( 'titleBlockControl not founs' );
}
catch ( err ) {
    console.error( err );
}

try {
    const speciltyBlockControl = new BlockControl(
        document.getElementById( 'specilty__input-button--add' ),
        false,
    );
    if ( !( speciltyBlockControl instanceof BlockControl ) )
        throw new Error( 'speciltyBlockControl not founs' );
}
catch ( err ) {
    console.error( err );
}

try {
    const educationBlockControl = new BlockControl(
        document.getElementById( 'education__input-button--add' ),
        true,
    );
    if ( !( educationBlockControl instanceof BlockControl ) )
        throw new Error( 'educationBlockControl not founs' );
}
catch ( err ) {
    console.error( err );
}

try {
    const experienceBlockControl = new BlockControl(
        document.getElementById( 'experience__input-button--add' ),
        true,
    );
    if ( !( experienceBlockControl instanceof BlockControl ) )
        throw new Error( 'experienceBlockControl not founds' );
}
catch ( err ) {
    console.error( err );
}

console.log( 'get profile data:' );

( async () => {
    const queryString = [
        `profileId=${ 1 }`,
        `languageId=${ WebLanguageUtils.currentLanguageId }`,
    ].join( '&' );

    let res = null;
    res = await window.fetch( `${ host }/api/staff/miniProfile?${ queryString }` );
    if ( !res.ok )
        throw new Error( 'failed to get all normal announcement' );
    const data = await res.json();
    console.log( data );
} )();

