// This format for database
export function dateFormating ( date ) {
    return date.toISOString().substring( 0, date.toISOString().indexOf( 'T' ) );
}

// This format for style
export function timeFormating ( time ) {
    return `${ time.substring( 0, time.indexOf( 'T' ) ) } | ${ time.substring( time.indexOf( 'T' ) + 1, time.indexOf( '.' ) ) }`;
}

// This format for set date input default value
export function dateFormatNow ( now ) {
    const parts =  now.toLocaleDateString().split( '/' ).map( part => part.padStart( 2, '0' ) );
    return `${ parts[ 2 ] }-${ parts[ 0 ] }-${ parts[ 1 ] }`;
}
