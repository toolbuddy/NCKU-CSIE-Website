/**
 * Data loading module for loading faculty data.
 *
 * @todo add loading fail handler
 * @todo disable faculty filter before data is completely loaded.
 */

import card from 'static/src/pug/components/about/faculty/cards.pug';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import { host, } from 'settings/server/config.js';
import DepartmentUtils from 'models/faculty/utils/department.js';
import ResearchGroupUtils from 'models/faculty/utils/research-group.js';
import UrlUtils from 'static/src/js/utils/url.js';

const languageId = WebLanguageUtils.currentLanguageId;
const reqURL = `${ host }/api/faculty?languageId=${ languageId }`;

export default target => fetch( reqURL )
.then( res => res.json() )
.then( ( faculty ) => {
    faculty = faculty.map( ( profile ) => {
        profile.department = profile.department.map( departmentId => DepartmentUtils.getDepartmentById( {
            departmentId,
            languageId,
        } ) );
        profile.researchGroup = profile.researchGroup.map( researchGroupId => ResearchGroupUtils.getResearchGroupById( { researchGroupId, languageId, } ) );
        return profile;
    } );

    target.innerHTML = card( {
        faculty,
        LANG: {
            id:            languageId,
            getLanguageId: WebLanguageUtils.getLanguageId,
        },
        UTILS: {
            url: UrlUtils.serverUrl( new UrlUtils( host, languageId ) ),
        },
    } );
} );
