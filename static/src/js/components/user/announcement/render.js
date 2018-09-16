export function fillData ( data, language ) {
    document.getElementById( 'input__title' ).value = data[ language ].title;
    document.getElementById( 'input__content' ).value = data[ language ].content;
    data.tags.forEach( ( tag ) => {
        document.getElementById( `input__tag--${ tag }` ).checked = true;
    } );
}
