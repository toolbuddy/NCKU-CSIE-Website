import { GetHeaderMin, GetHeaderSmall, GetHeaderMedium, GetHeaderLarge, } from 'static/src/js/components/common/header.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import TagUtils from 'models/announcement/utils/tag.js';
import { GetAllAnnouncement, GetHotAnnouncement, } from 'static/src/js/components/home/get-announcement.js';

window.addEventListener( 'load', () => {
    const headerMin = new GetHeaderMin( {
        headerDOM:     document.querySelector( '.body__header.header.header--min' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
    const headerSmall = new GetHeaderSmall( {
        headerDOM:     document.querySelector( '.body__header.header.header--small' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
    const headerMedium = new GetHeaderMedium( {
        headerDOM:     document.querySelector( '.body__header.header.header--medium' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
    const headerLarge = new GetHeaderLarge( {
        headerDOM:     document.querySelector( '.body__header.header.header--large' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );

    const getAllAnnouncement = new GetAllAnnouncement( {
        amount:          3,
        announcementDOM: document.getElementById( 'announcement' ),
        from:            new Date( '2019/01/01' ),
        languageId:      WebLanguageUtils.currentLanguageId,
        tags:            TagUtils.supportedTag( WebLanguageUtils.getLanguageId( 'en-US' ) ),
        to:              new Date( Date.now() ),
        page:            1,
    } );

    getAllAnnouncement.exec();

    const getHotAnnouncement = new GetHotAnnouncement( {
        amount:          3,
        announcementDOM: document.getElementById( 'hot-announcement' ),
        from:            new Date( '2019/01/01' ),
        languageId:      WebLanguageUtils.currentLanguageId,
        tags:            TagUtils.supportedTag( WebLanguageUtils.getLanguageId( 'en-US' ) ),
        to:              new Date( Date.now() ),
        page:            1,
    } );

    getHotAnnouncement.exec();
} );
