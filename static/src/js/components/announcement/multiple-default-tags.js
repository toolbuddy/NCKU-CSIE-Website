import briefing from 'pugComponent/announcement/briefing.pug';
import qS from 'jsComponent/announcement/query-string.js';
import { dateFormating, timeFormating, }  from 'jsUtil/format.js';
import { registEvent, pageButtonOnClick, } from 'jsComponent/announcement/event-listener.js';

let defaultTags = [];

function buildPageButtons ( pageNumber ) {
    const pageButtonsContainer = document.getElementById( 'pageButtons' );

    pageButtonsContainer.innerHTML = '';
    for ( let i = 1; i <= pageNumber; ++i )
        pageButtonsContainer.innerHTML += `<button type="button" class="pageButton">${ i }</button>`;
    Array.from( document.getElementsByClassName( 'pageButton' ) ).forEach( ( pageButton ) => {
        /* eslint no-use-before-define: 'off' */
        pageButton.addEventListener( 'click', pageButtonOnClick( getAllAnnouncements, getAnnouncementsByTags ) );
    } );
}

function buildBriefings ( pinnedAnnouncements, announcements ) {
    const announcementBriefingTop = document.getElementById( 'announcement__brefings--top' );
    const announcementBriefing = document.getElementById( 'announcement__brefings' );

    announcementBriefingTop.innerHTML = '';
    announcementBriefing.innerHTML = '';
    pinnedAnnouncements.forEach( ( announcement ) => {
        announcementBriefingTop.innerHTML += briefing( {
            id:      announcement.id,
            title:   announcement.title,
            time:    timeFormating( announcement.updateTime ),
            content: announcement.content,
            tags:    announcement.tags.map( tag => tag.name ),
        } );
    } );
    announcements.forEach( ( announcement ) => {
        announcementBriefing.innerHTML += briefing( {
            id:      announcement.id,
            title:   announcement.title,
            time:    timeFormating( announcement.updateTime ),
            content: announcement.content,
            tags:    announcement.tags.map( tag => tag.name ),
        } );
    } );
}

export async function getAllAnnouncements ( {
    startTime = qS.getStartTime(),
    endTime = qS.getEndTime(),
    page = qS.getPage(),
    language = 'zh-TW',
} = { } ) {
    // Need injection protection
    const queryString = new URLSearchParams();

    // Append tags
    defaultTags.forEach( tag => queryString.append( 'tags', tag ) );

    // Append time
    queryString.append( 'startTime', dateFormating( startTime ) );
    queryString.append( 'endTime', dateFormating( endTime ) );

    // Append page
    queryString.append( 'page', page );

    // Append language
    queryString.append( 'language', language );

    const pinnedURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/all-pinned?${ queryString.toString() }`;
    const announcementURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/all-announcement?${ queryString.toString() }`;
    const pinnedAnnouncements = await fetch( pinnedURL ).then( res => res.json() );
    const announcements = await fetch( announcementURL ).then( res => res.json() );

    buildBriefings( pinnedAnnouncements, announcements );
}

export async function getAnnouncementsByTags ( {
    tags = qS.getTags( defaultTags ),
    startTime = qS.getStartTime(),
    endTime = qS.getEndTime(),
    page = qS.getPage(),
    language = 'zh-TW',
} = { } ) {
    // Need injection protection
    const queryString = new URLSearchParams();

    // Append tags
    tags.forEach( tag => queryString.append( 'tags', tag ) );

    // Append time
    queryString.append( 'startTime', dateFormating( startTime ) );
    queryString.append( 'endTime', dateFormating( endTime ) );

    // Append page
    queryString.append( 'page', page );

    // Append language
    queryString.append( 'language', language );

    const pinnedURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/tags-pinned?${ queryString.toString() }`;
    const announcementURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/tags-announcement?${ queryString.toString() }`;
    const pinnedAnnouncements = await fetch( pinnedURL ).then( res => res.json() );
    const announcements = await fetch( announcementURL ).then( res => res.json() );

    buildBriefings( pinnedAnnouncements, announcements );
}

export async function getAllPageNumber ( { startTime = qS.getStartTime(), endTime = qS.getEndTime(), } = { } ) {
    // Need injection protection
    const queryString = new URLSearchParams();

    // Append tags
    defaultTags.forEach( tag => queryString.append( 'tags', tag ) );

    // Append time
    queryString.append( 'startTime', dateFormating( startTime ) );
    queryString.append( 'endTime', dateFormating( endTime ) );

    const reqURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/all-pages?${ queryString.toString() }`;
    const pageNumber = await fetch( reqURL ).then( res => res.json() ).then( data => data.pageNumber );

    buildPageButtons( pageNumber );
}

export async function getPageNumberByTags ( { tags = qS.getTags( defaultTags ), startTime = qS.getStartTime(), endTime = qS.getEndTime(), } = { } ) {
    // Need injection protection
    const queryString = new URLSearchParams();

    // Append tags
    tags.forEach( tag => queryString.append( 'tags', tag ) );

    // Append time
    queryString.append( 'startTime', dateFormating( startTime ) );
    queryString.append( 'endTime', dateFormating( endTime ) );

    const reqURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/tags-pages?${ queryString.toString() }`;
    const pageNumber = await fetch( reqURL ).then( res => res.json() ).then( data => data.pageNumber );

    buildPageButtons( pageNumber );
}

export function init ( tags ) {
    defaultTags = tags;
    getAllPageNumber();
    getAllAnnouncements();
    registEvent( getAllAnnouncements, getAnnouncementsByTags, getAllPageNumber, getPageNumberByTags );
}
