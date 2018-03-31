window.addEventListener( "load", function addPages () {
    const totalData = 100;
    const pageData = 5;   // how many data in one page
    const singlePage = 10;   // show x pages in pagination
    const totalPage = Math.ceil(totalData/pageData);
    const nowPage = 6;   // you are now in this page
    const pagination = document.getElementById( "pagination" );

    function createPage ( text, link) {
        const newLink = document.createElement( "a" );
        newLink.innerHTML = text;
        newLink.href = link;
        pagination.appendChild( newLink );
    }

    function createPageActive ( text, link) {
        const newLink = document.createElement( "a" );
        newLink.innerHTML = text;
        newLink.href = link;
        newLink.classList.add('active');
        pagination.appendChild( newLink );
    }

    if( totalPage > singlePage ){    //then show x pages

        // laquo -> add link to first page
        createPage ( "«", "#");

        const center = Math.ceil( singlePage/2 );   // to judge if u are in the very begin pages or in the end pages
        let beginPages = 0, endPages = 0;   // beginPages=num of pages before and include u. endPages=num of pages after u
        if( nowPage < center ){    // in the begin pages
            beginPages = nowPage;
            endPages = singlePage-nowPage;
        }else if( nowPage > totalPage - center + 1 ){   // in the end pages
            endPages = totalPage - nowPage;
            beginPages = singlePage - endPages;
            console.log( beginPages, endPages );
        }else{
            beginPages = center;
            endPages = singlePage-center;
        }

        for( let i = 1; i <= beginPages; ++i ){    // create pages in part beginPages (include nowPage)
            let page_num = nowPage - beginPages + i;
            if( page_num === nowPage ){
                createPageActive ( page_num, "#");
            }else{
                createPage ( page_num, "#");
            }
        }

        for( let i = 1; i <= endPages; ++i ){  // in part endPages
            let page_num = nowPage + i;
            createPage ( page_num, "#");
        }

        // raquo -> add link to last page
        createPage ( "»", "#" ,false );

    }else{    // then show all the pages
        for( let i = 1; i <= totalPage; ++i ){
            apage.innerHTML = i;
            if( i === nowPage ){
                createPageActive ( page_num, "#");
            }else{
                createPage ( page_num, "#");
            }
        }
    }

    window.removeEventListener( "load", addPages );
} );