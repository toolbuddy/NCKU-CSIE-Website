// This format for database
export function dateFormating ( date ) {
    return date.toISOString().substring( 0, date.toISOString().indexOf( 'T' ) );
}

// This format for style
export function timeFormating ( time ) {
    return `${ time.substring( 0, time.indexOf( 'T' ) ) } | ${ time.substring( time.indexOf( 'T' ) + 1, time.indexOf( '.' ) ) }`;
}
