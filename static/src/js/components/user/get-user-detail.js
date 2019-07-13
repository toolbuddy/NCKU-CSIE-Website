import WebLanguageUtils from 'static/src/js/utils/language.js';
import { classAdd, classRemove, delay, } from 'static/src/js/utils/style.js';
import { host, staticHost, } from 'settings/server/config.js';
import departmentUtils from 'models/faculty/utils/department.js';
import researchGroupUtils from 'models/faculty/utils/research-group.js';
import UrlUtils from 'static/src/js/utils/url.js';
import ValidateUtils from 'models/common/utils/validate.js';
import dynamicInputBlock from 'static/src/pug/components/user/dynamic-input-block.pug';
import LanguageUtils from 'models/common/utils/language.js';
import editPage from 'static/src/pug/components/user/edit-page.pug';
import editPageText from 'static/src/pug/components/user/edit-page-text.pug';

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

        const profileQuerySelector = block => `.profile__${ block }`;
        const profileTextQuerySelector = block => `.profile__input-block--${ block } > .input-block__block > .block__content > .content__word`;
        const profileModifyQuerySelector = block => `.profile__input-block--${ block } > .input-block__block > .block__content > .content__modify`;
        this.flagTW = `${ host }/static/static/src/image/icon/tw.png`;
        this.flagUS = `${ host }/static/static/src/image/icon/us.png`;

        this.profile = {
            name: {
                classModifier: 'name',
                editPage:      [
                    {
                        type:     'text',
                        language: 'zh-TW',
                        content:  'name',
                    },
                    {
                        type:     'text',
                        language: 'en-US',
                        content:  'name',
                    },
                ],
            },
            officeAddress: {
                classModifier: 'office-location',
            },
            labName:    {
                classModifier:   'lab-name',
            },
            labAddress:  {
                classModifier:   'lab-location',
            },
            labTel:    {
                classModifier:    'lab-tel',
            },
            labWeb:     {
                classModifier: 'lab-web',
            },
            officeTel:  {
                classModifier:  'office-tel',
            },
            email:   {
                classModifier:   'email',
            },
            fax:     {
                classModifier:   'fax',
            },
            personalWeb:  {
                classModifier: 'personal-web',
            },
        };

        this.i18n = Object.freeze( {
            [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
                button: {
                    add:    'add',
                    remove: 'remove',
                    modify: 'modify',
                },
                topic: {
                    title:     'title',
                    specialty: 'specialty',
                },
            },
            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
                button: {
                    add:    '新增',
                    remove: '刪除',
                    modify: '編輯',
                },
                topic: {
                    title:     '職稱',
                    specialty: '專長領域',
                },
            },
        } );

        this.profileDOM = {
            titleBlock:     opt.profileDOM.querySelector( profileQuerySelector( 'title' ) ),
            specialtyBlock: opt.profileDOM.querySelector( profileQuerySelector( 'specialty' ), ),
        };

        this.educationDOM = opt.educationDOM;
        this.experienceDOM = opt.experienceDOM;

        Object.keys( this.profile ).map( ( key ) => {
            this.profile[ key ].DOM = {};
            this.profile[ key ].DOM.text = opt.profileDOM.querySelector( profileTextQuerySelector( this.profile[ key ].classModifier ) );
            this.profile[ key ].DOM.modifier = opt.profileDOM.querySelector( profileModifyQuerySelector( this.profile[ key ].classModifier ) );
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

        Object.keys( this.profile ).map( ( key ) => {
            this.profile[ key ].DOM.text.innerHTML = res.profile[ key ];
        } );

        this.renderTitleInputBlock( res.title );
        this.renderSpecialtyInputBlock( res.specialty );
        this.renderEducationInputBlock( res.education );
        this.renderExperienceInputBlock( res.experience );
    }

    renderTitleInputBlock ( res ) {
        try {
            this.profileDOM.titleBlock.innerHTML = '';
            res.forEach( ( res, index ) => {
                try {
                    const data = {
                        modifier: 'title',
                        id:        index,
                        index,
                        content:   res.title,
                        topic:     this.i18n[ this.config.languageId ].topic.title,
                        button:   {
                            remove: this.i18n[ this.config.languageId ].button.remove,
                            modify: this.i18n[ this.config.languageId ].button.modify,
                            add:    this.i18n[ this.config.languageId ].button.add,
                        },
                    };
                    this.profileDOM.titleBlock.innerHTML += dynamicInputBlock( {
                        data,
                    } );
                }
                catch ( err ) {
                    console.error( err );
                }
            } );
        }
        catch ( err ) {
            throw err;
        }
    }

    renderSpecialtyInputBlock ( res ) {
        try {
            this.profileDOM.specialtyBlock.innerHTML = '';
            res.forEach( ( res, index ) => {
                try {
                    const data = {
                        modifier: 'specialty',
                        id:        index,
                        index,
                        content:   res,
                        topic:     this.i18n[ this.config.languageId ].topic.specialty,
                        button:   {
                            remove: this.i18n[ this.config.languageId ].button.remove,
                            modify: this.i18n[ this.config.languageId ].button.modify,
                            add:    this.i18n[ this.config.languageId ].button.add,
                        },
                    };
                    this.profileDOM.specialtyBlock.innerHTML += dynamicInputBlock( {
                        data,
                    } );
                }
                catch ( err ) {
                    console.error( err );
                }
            } );
        }
        catch ( err ) {
            throw err;
        }
    }

    renderEducationInputBlock ( res ) {
        try {
            this.educationDOM.innerHTML = '';
            res.forEach( ( res, index ) => {
                try {
                    const data = {
                        modifier: 'education',
                        id:        index,
                        index,
                        content:   `${ res.school } ${ res.major } ${ res.degree }`,
                        topic:     '',
                        button:   {
                            remove: this.i18n[ this.config.languageId ].button.remove,
                            modify: this.i18n[ this.config.languageId ].button.modify,
                            add:    this.i18n[ this.config.languageId ].button.add,
                        },
                    };
                    this.educationDOM.innerHTML += dynamicInputBlock( {
                        data,
                    } );
                }
                catch ( err ) {
                    console.error( err );
                }
            } );
        }
        catch ( err ) {
            throw err;
        }
    }

    renderExperienceInputBlock ( res ) {
        try {
            this.experienceDOM.innerHTML = '';
            res.forEach( ( res, index ) => {
                try {
                    const data = {
                        modifier: 'experience',
                        id:        index,
                        index,
                        content:   `${ res.organization } ${ res.department } ${ res.title }`,
                        topic:     '',
                        button:   {
                            remove: this.i18n[ this.config.languageId ].button.remove,
                            modify: this.i18n[ this.config.languageId ].button.modify,
                            add:    this.i18n[ this.config.languageId ].button.add,
                        },
                    };
                    this.experienceDOM.innerHTML += dynamicInputBlock( {
                        data,
                    } );
                }
                catch ( err ) {
                    console.error( err );
                }
            } );
        }
        catch ( err ) {
            throw err;
        }
    }

    subscribeModifyEvent ( modifier, DOM ) {

    }

    async exec () {
        console.log( this.fetchData() );
        await this.setData();
    }
}
