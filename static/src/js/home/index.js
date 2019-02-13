import header from 'static/src/js/components/common/header/index.js';
import briefingHTML from 'static/src/pug/components/announcement/briefing.pug';

// Import briefingHotHTML from 'static/src/pug/components/home/briefing-hot.pug';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import TagUtils from 'models/announcement/utils/tag.js';
import UrlUtils from 'static/src/js/utils/url.js';
import { host, } from 'settings/server/config.js';
import ValidateUtils from 'models/common/utils/validate.js';

header( document.getElementById( 'header' ) );

const announcement = document.getElementById( 'announcement' ).querySelector( '.announcement__briefings.briefings' );

async function allAnnouncement () {
    const queryString = [
        `amount=${ 3 }`,
        `languageId=${ WebLanguageUtils.currentLanguageId }`,
        `from=${ Number( new Date( '2019/01/01' ) ) }`,
        `page=${ 1 }`,
        `to=${ Date.now() }`,
        ...TagUtils.supportedTagId.map( tagId => `tags=${ tagId }` ),
    ].join( '&' );

    function formatUpdateTime ( time ) {
        if ( !( ValidateUtils.isValidDate( time ) ) )
            throw new TypeError( 'Invalid time.' );

        return [
            [
                `${ time.getFullYear() }`,
                `${ time.getMonth() < 9 ? `0${ String( time.getMonth() + 1 ) }` : String( time.getMonth() + 1 ) }`,
                `${ time.getDate() < 10 ? `0${ String( time.getDate() ) }` : String( time.getDate() ) }`,
            ].join( '-' ),
            [
                `${ time.getHours() < 10 ? `0${ String( time.getHours() ) }` : String( time.getHours() ) }`,
                `${ time.getMinutes() < 10 ? `0${ String( time.getMinutes() ) }` : String( time.getMinutes() ) }`,
                `${ time.getSeconds() < 10 ? `0${ String( time.getSeconds() ) }` : String( time.getSeconds() ) }`,
            ].join( ':' ),
        ].join( ' | ' );
    }

    fetch( `${ host }/api/announcement/all-announcement?${ queryString }` )
    .then( ( res ) => {
        if ( res.ok )
            return res.json();
        throw new Error( 'No announcement found' );
    } )
    .then( ( data ) => {
        data.map( ( briefing ) => {
            briefing.tags = briefing.tags.map( tagId => ( {
                color: TagUtils.getTagColorById( tagId ),
                tag:   TagUtils.getTagById( {
                    tagId,
                    languageId: WebLanguageUtils.currentLanguageId,
                } ),
            } ) );
            briefing.updateTime = formatUpdateTime( new Date( briefing.updateTime ) );
            return briefing;
        } )
        .forEach( ( briefing ) => {
            announcement.innerHTML += briefingHTML( {
                briefing,
                UTILS: {
                    url: UrlUtils.serverUrl( new UrlUtils( host, WebLanguageUtils.currentLanguageId ) ),
                },
            } );
        } );
    } )
    .catch( ( err ) => {
        console.error( err );
    } );
}

allAnnouncement();
