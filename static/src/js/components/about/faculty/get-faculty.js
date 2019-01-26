/**
 * Data loading module for loading faculty data.
 *
 * @todo add loading fail handler
 * @todo disable faculty filter before data is completely loaded.
 */

import WebLanguageUtils from 'static/src/js/utils/language.js';
import { host, } from 'settings/server/config.js';
import DepartmentUtils from 'models/faculty/utils/department.js';
import UrlUtils from 'static/src/js/utils/url.js';
import card from 'static/src/pug/components/about/faculty/cards.pug';
import showFilters from 'static/src/pug/components/about/faculty/filters.pug';
import ResearchUtils from 'models/faculty/utils/research-group.js';
import filterEvent from 'static/src/js/components/about/faculty/filters/index.js';

const languageId = WebLanguageUtils.currentLanguageId;
const reqURL = `${ host }/api/faculty?languageId=${ languageId }`;

export default ( cards, filters, noResult ) => fetch( reqURL )
.then( res => {
    if (res.ok)
        return res.json();
    else
        throw new Error();
} )
.then( ( faculty ) => {
    faculty = faculty.map( ( profile ) => {
        profile.department = profile.department.map( departmentId => ( {
            departmentId,
            department: DepartmentUtils.getDepartmentById( {
                departmentId,
                languageId,
            } ),
        } ) );
        return profile;
    } );

    cards.innerHTML = card( {
        faculty,
        LANG: {
            id:            languageId,
            getLanguageId: WebLanguageUtils.getLanguageId,
        },
        UTILS: {
            url: UrlUtils.serverUrl( new UrlUtils( host, languageId ) ),
        },
    } );

    filters.innerHTML = showFilters( {
        department: DepartmentUtils.supportedDepartment( languageId ),
        researchGroup: ResearchUtils.supportedResearchGroup( languageId ),
    } );

    filterEvent(
        filters,
        cards,
        noResult,
    );
} )
.catch( () => {
    filters.innerHTML = 'error';
} );
