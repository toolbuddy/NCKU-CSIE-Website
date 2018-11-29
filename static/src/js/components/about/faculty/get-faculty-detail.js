import detail from 'static/src/pug/components/about/faculty/details.pug';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import serverSetting from 'settings/server/config.js';

let facultyId = /about\/faculty\/(\d+)/.exec( window.location.pathname );

if ( facultyId === null )
    facultyId = 1;
else
    facultyId = facultyId[ 1 ];

const reqURL = `${ serverSetting.browerSyncHost }/api/faculty/${ facultyId }?language=${ WebLanguageUtils.currentLanguage }`;

export default ( target, teacherName ) => fetch( reqURL )
.then( res => res.json() )
.then( ( data ) => {
    /* eslint no-console: 0 */
    console.log( data );
    teacherName.innerHTML = data.profile.name;
    target.innerHTML = target.innerHTML + detail( data );
} );
