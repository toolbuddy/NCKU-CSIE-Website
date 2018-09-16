export function isValidDate ( date ) {
    return date instanceof Date && !Number.isNaN( date );
}

export function isValidPage ( page ) {
    return !Number.isNaN( Number( page ) ) && Number.isInteger( Number( page ) ) && Number( page ) > 0;
}

const validTags = Array.from(
    document.getElementById( 'filter__tags' ).getElementsByClassName( 'tags__tag' )
).map( tag => /tags__tag--([a-zA-Z0-9]+)/.exec( tag.id )[ 1 ] );
if ( validTags.indexOf( 'all' ) !== -1 )
    validTags.splice( validTags.indexOf( 'all' ), 1 );

export function isValidTags ( tags ) {
    return ( tags.filter( tag => validTags.indexOf( tag ) < 0 ).length === 0 ) && tags.length;
}

const validLanguages = [ 'zh-TW',
    'en-US', ];

export function isValidLanguage ( language ) {
    return validLanguages.includes( language );
}
