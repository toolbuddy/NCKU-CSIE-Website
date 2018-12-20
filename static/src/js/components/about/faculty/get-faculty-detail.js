import detail from 'static/src/pug/components/about/faculty/details.pug';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import { host, } from 'settings/server/config.js';

let facultyId = /about\/faculty\/(\d+)/.exec( window.location.pathname );

if ( facultyId === null )
    facultyId = 1;
else
    facultyId = facultyId[ 1 ];

const reqURL = `${ host }/api/faculty/${ facultyId }?language=${ WebLanguageUtils.currentLanguage }`;

export default target => fetch( reqURL )
.then( res => res.json() )
.then( ( data ) => {
<<<<<<< HEAD
=======
    /* eslint no-console: 0 */
    console.log( data );
>>>>>>> b3666109267378fc0667e4b337114d5c0afb0ef8
    target.innerHTML = detail( data );
} );
