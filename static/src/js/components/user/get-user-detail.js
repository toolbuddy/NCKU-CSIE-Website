import WebLanguageUtils from 'static/src/js/utils/language.js';
import { classAdd, classRemove, delay, } from 'static/src/js/utils/style.js';
import { host, staticHost, } from 'settings/server/config.js';
import departmentUtils from 'models/faculty/utils/department.js';
import researchGroupUtils from 'models/faculty/utils/research-group.js';
import UrlUtils from 'static/src/js/utils/url.js';
import cardHTML from 'static/src/pug/components/about/faculty/cards.pug';
import ValidateUtils from 'models/common/utils/validate.js';
import dynamicInputBlock from 'static/src/pug/components/user/dynamic-input-block.pug';

export default class GetUserDetail {
    constructor ( opt ) {
        opt = opt || {};

        if (
            !opt.profileDOM ||
            !ValidateUtils.isDomElement( opt.profileDOM ) ||
            !WebLanguageUtils.isSupportedLanguageId( opt.languageId )
        )
            throw new TypeError( 'invalid arguments' );

        this.config = {
            profileId:  opt.profileId,
            languageId: opt.languageId,
        };

        const profileQuerySelector = block => `.profile__input-block--${ block }`;
        const profileTextQuerySelector = block => `.profile__input-block--${ block } > .input-block__block > .block__content > .content__word`;
        const profileModifyQuerySelector = block => `.profile__input-block--${ block } > .input-block__block > .block__content > .content__modify`;

        const profile = {
            name:          'name',
            officeAddress: 'office-location',
            labName:       'lab-name',
            labAddress:    'lab-location',
            labTel:        'lab-tel',
            labWeb:        'lab-web',
            officeTel:     'office-tel',
            email:         'email',
            fax:           'fax',
            personalWeb:   'personal-web',
        };

        this.profileDOM = {
            profile: {},
            tag:     {},
        };

        Object.keys( profile ).map( ( key ) => {
            this.profileDOM.profile[ key ] = {};
            this.profileDOM.profile[ key ].text = opt.profileDOM.querySelector( profileTextQuerySelector( profile[ key ] ) );
            this.profileDOM.profile[ key ].modify = opt.profileDOM.querySelector( profileModifyQuerySelector( profile[ key ] ) );
        } );
    }

    get queryApi () {
        return `${ host }/api/faculty/${ this.config.profileId }?profileId=${ this.config.profileId }&languageId=${ this.config.languageId }`;
    }

    async fetchData () {
        try {
            const res = await fetch( this.queryApi );

            if ( !res.ok )
                throw new Error( 'No faculty found' );

            return res.json();
        }
        catch ( err ) {
            throw err;
        }
    }

    async setData () {
        const res = await this.fetchData();

        Object.keys( this.profileDOM.profile ).map( ( key ) => {
            this.profileDOM.profile[ key ].text.innerHTML = res.profile[ key ];
        } );
    }

    async exec () {
        console.log( this.fetchData() );
        console.log( this.profileDOM );
        await this.setData();
    }
}
