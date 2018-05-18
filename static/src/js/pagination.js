window.addEventListener( 'load', function addPages () {
    const totalData = 100;
    const pageData = 5;   // how many data in one page
    const singlePage = 10;   // show x pages in pagination
    const totalPage = Math.ceil( totalData / pageData );
    const nowPage = 6;   // you are now in this page
    const pagination = document.getElementById( 'pagination' );

    function createLaquoPage ( text, link, classType ) {
        const newLink = document.createElement( 'a' );

        // newLink.innerHTML = text;
        const linkText = document.createTextNode( text );
        newLink.appendChild( linkText );
        newLink.href = link;
        newLink.classList.add( 'pagination__page' );
        newLink.classList.add( 'pagination__page__laquo' );
        const headPage = 1, previousPage = 2, nextPage = 3, endPage = 4;
        switch( classType ) {
        case headPage: newLink.classList.add( 'pagination__page__laquo__head' ); break;
        case previousPage: newLink.classList.add( 'pagination__page__laquo__previous' ); break;
        case nextPage: newLink.classList.add( 'pagination__page__laquo__next' ); break;
        case endPage: newLink.classList.add( 'pagination__page__laquo__end' ); break;
        }
        pagination.appendChild( newLink );
    }

    function createPage ( text, link ) {
        const newLink = document.createElement( 'a' );

        // newLink.innerHTML = text;
        const linkText = document.createTextNode( text );
        newLink.appendChild( linkText );
        newLink.href = link;
        newLink.classList.add( 'pagination__page' );
        pagination.appendChild( newLink );
    }

    function createPageActive ( text, link ) {
        const newLink = document.createElement( 'a' );

        // newLink.innerHTML = text;
        const linkText = document.createTextNode( text );
        newLink.appendChild( linkText );
        newLink.href = link;
        newLink.classList.add( 'pagination__page' );
        newLink.classList.add( 'pagination__page--active' );
        pagination.appendChild( newLink );
    }

    if( totalPage > singlePage ) {    // then show x pages

        // laquo -> add link to first page
        createLaquoPage ( 'Head', '#', 1 );
        createLaquoPage ( 'Previous', '#', 2 );

        const half = 2, next = 1;
        const center = Math.ceil( singlePage / half );   // to judge if u are in the very begin pages or in the end pages
        let beginPages = 0, endPages = 0;   // beginPages=num of pages before and include u. endPages=num of pages after u
        if( nowPage < center ) {    // in the begin pages
            beginPages = nowPage;
            endPages = singlePage - nowPage;
        }else if( nowPage > totalPage - center + next ) {   // in the end pages
            endPages = totalPage - nowPage;
            beginPages = singlePage - endPages;
            console.log( beginPages, endPages );
        }else{
            beginPages = center;
            endPages = singlePage - center;
        }

        for( let i = 1; i <= beginPages; ++i ) {    // create pages in part beginPages (include nowPage)
            let pageNum = nowPage - beginPages + i;
            if( pageNum === nowPage )
                createPageActive ( pageNum, '#' );
            else
                createPage ( pageNum, '#' );

        }

        for( let i = 1; i <= endPages; ++i ) {  // in part endPages
            let pageNum = nowPage + i;
            createPage ( pageNum, '#' );
        }

        // raquo -> add link to last page
        createLaquoPage ( 'Next', '#', 3 );
        createLaquoPage ( 'End', '#', 4 );

    }else {    // then show all the pages
        createLaquoPage ( 'Previous', '#', 1 );
        for( let i = 1; i <= totalPage; ++i )
            if( i === nowPage )
                createPageActive ( i, '#' );
            else
                createPage ( i, '#' );


        createLaquoPage ( 'Next', '#', 3 );
    }

    window.removeEventListener( 'load', addPages );
} );
