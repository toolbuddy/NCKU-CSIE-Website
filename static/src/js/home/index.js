import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderSmall from 'static/src/js/components/common/header-small.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import tagUtils from 'models/announcement/utils/tag.js';
import { GetAllAnnouncement, GetHotAnnouncement, } from 'static/src/js/components/home/get-announcement.js';
import GetTvAnnouncements from 'static/src/js/components/home/get-tv-announcements.js';

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
    const headerSmall = new GetHeaderSmall( {
        headerDOM:     document.querySelector( '.body__header.header.header--small' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
    if ( !( headerSmall instanceof GetHeaderSmall ) )
        throw new Error( '.header.header--small not found.' );
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
    const getTvAnnouncements = new GetTvAnnouncements( {
        amount:     6,
        tvDOM:      document.getElementById( 'tv' ),
        languageId: WebLanguageUtils.currentLanguageId,
        tags:       tagUtils.supportedOptions,
    } );

    getTvAnnouncements.exec();
}
catch ( err ) {
    console.error( err );
}
try {
    const getAllAnnouncement = new GetAllAnnouncement( {
        amount:          3,
        announcementDOM: document.getElementById( 'announcement' ),
        from:            new Date( '2019/01/01' ),
        languageId:      WebLanguageUtils.currentLanguageId,
        tags:            tagUtils.supportedOptions,
        to:              new Date( Date.now() ),
        page:            1,
    } );

    getAllAnnouncement.exec();
}
catch ( err ) {
    console.error( err );
}
try {
    const getHotAnnouncement = new GetHotAnnouncement( {
        amount:          3,
        announcementDOM: document.getElementById( 'hot-announcement' ),
        from:            new Date( '2019/01/01' ),
        languageId:      WebLanguageUtils.currentLanguageId,
        tags:            tagUtils.supportedOptions,
        to:              new Date( Date.now() ),
        page:            1,
    } );

    getHotAnnouncement.exec();
}
catch ( err ) {
    console.error( err );
}
