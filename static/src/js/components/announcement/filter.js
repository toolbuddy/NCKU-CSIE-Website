// Construct filter's UI
( () => {
    let flip  = 0;
    const filterButton = document.getElementById( 'filter__button' );
    const buttonIcon = document.getElementById( 'button__icon' );
    const filterTags = document.getElementById( 'filter__tags' );
    const filterTime = document.getElementById( 'filter__time' );
    filterButton.onclick = () => {
        flip = ( flip + 1 ) % 2;
        if ( flip ) {
            filterTags.classList.remove( 'tags--hidden' );
            filterTime.classList.remove( 'time--hidden' );
            buttonIcon.classList.add( 'button__icon--active' );
        }
        else {
            filterTags.classList.add( 'tags--hidden' );
            filterTime.classList.add( 'time--hidden' );
            buttonIcon.classList.remove( 'button__icon--active' );
        }
    };
} )();

// Construct filter tags' UI
export default function filterTags ( defaultTag = null ) {
    const filterTags = document.getElementById( 'filter__tags' ).childNodes;
    const tagsTagAll = document.getElementById( 'tags__tag--all' );
    if ( filterTags.length === 1 )
        document.getElementById( `tags__tag--${ defaultTag }` ).classList.add( 'tags__tag--active' );
    else {
        filterTags.forEach( ( tag ) => {
            tag.onclick = () => {
                if ( tag.classList.contains( 'tags__tag--active' ) )
                    tag.classList.remove( 'tags__tag--active' );

                else if ( tag.classList.contains( 'tags__tag--all' ) ) {
                    tag.classList.add( 'tags__tag--active' );
                    filterTags.forEach( ( tag ) => {
                        if ( !tag.classList.contains( 'tags__tag--all' ) )
                            tag.classList.remove( 'tags__tag--active' );
                    } );
                }
                else {
                    tagsTagAll.classList.remove( 'tags__tag--active' );
                    tag.classList.add( 'tags__tag--active' );
                }
            };
        } );

        if ( defaultTag )
            document.getElementById( `tags__tag--${ defaultTag }` ).classList.add( 'tags__tag--active' );
    }
}
