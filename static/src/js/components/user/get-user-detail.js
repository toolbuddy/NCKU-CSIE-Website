import WebLanguageUtils from 'static/src/js/utils/language.js';
import { classAdd, classRemove, delay, } from 'static/src/js/utils/style.js';
import { host, staticHost, } from 'settings/server/config.js';
import departmentUtils from 'models/faculty/utils/department.js';
import researchGroupUtils from 'models/faculty/utils/research-group.js';
import UrlUtils from 'static/src/js/utils/url.js';
import ValidateUtils from 'models/common/utils/validate.js';
import dynamicInputBlock from 'static/src/pug/components/user/dynamic-input-block.pug';
import LanguageUtils from 'models/common/utils/language.js';
import editPageHTML from 'static/src/pug/components/user/edit-page.pug';
import editPageTextHTML from 'static/src/pug/components/user/edit-page-text.pug';
import degreeUtils from 'models/faculty/utils/degree.js';

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
        this.modifyButtonQuerySelector = ( block, id ) => `.input-block__block > .block__content > .content__modify--${ block }-${ id }`;
        this.flagTW = `${ host }/static/static/src/image/icon/tw.png`;
        this.flagUS = `${ host }/static/static/src/image/icon/us.png`;

        this.flag = {
            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: `${ host }/static/src/image/icon/tw.png`,
            [ LanguageUtils.getLanguageId( 'en-US' ) ]: `${ host }/static/src/image/icon/tw.png`,
        };

        this.editPageText = ( i18n, content ) => {
            if ( i18n ) {
                return {
                    type:       'text',
                    languageId: LanguageUtils.supportedLanguageId,
                    content,
                    flag:       true,
                };
            }
            return {
                type:       'text',
                languageId: [ this.config.languageId, ],
                content,
                flag:       false,
            };
        };

        this.profile = {
            name: {
                classModifier: 'name',
                editPage:      this.editPageText( true, 'name' ),
            },
            officeAddress: {
                classModifier: 'office-location',
                editPage:      this.editPageText( true, 'officeAddress' ),
            },
            labName:    {
                classModifier:   'lab-name',
                editPage:      this.editPageText( true, 'labName' ),
            },
            labAddress:  {
                classModifier:   'lab-location',
                editPage:      this.editPageText( true, 'labAddress' ),
            },
            labTel:    {
                classModifier:    'lab-tel',
                editPage:      this.editPageText( false, 'labTel' ),
            },
            labWeb:     {
                classModifier: 'lab-web',
                editPage:      this.editPageText( false, 'labWeb' ),
            },
            officeTel:  {
                classModifier:  'office-tel',
                editPage:      this.editPageText( false, 'labTel' ),
            },
            email:   {
                classModifier:   'email',
                editPage:      this.editPageText( false, 'email' ),
            },
            fax:     {
                classModifier:   'fax',
                editPage:      this.editPageText( false, 'fax' ),
            },
            personalWeb:  {
                classModifier: 'personal-web',
                editPage:      this.editPageText( false, 'personalWeb' ),
            },
        };

        this.editPage = {
            title: [
                this.editPageText( true, 'title' ),
            ],
        };

        this.i18n = Object.freeze( {
            [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
                button: {
                    add:    'add',
                    remove: 'remove',
                    modify: 'modify',
                    cancel: 'cancel',
                    check:  'check',
                },
                topic: {
                    name:          'name',
                    title:         'title',
                    specialty:     'specialty',
                    officeAddress: 'office address',
                    officeTel:     'office tel',
                    labName:       'lab name',
                    labAddress:    'lab address',
                    labTel:        'lab tel',
                    labWeb:        'lab web',
                    email:         'email',
                    personalWeb:   'personal web',
                    fax:           'fax',
                },
                modify: 'modify your ',
            },
            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
                button: {
                    add:    '新增',
                    remove: '刪除',
                    modify: '編輯',
                    cancel: '取消',
                    check:  '確認',
                },
                topic: {
                    name:          '姓名',
                    title:         '職稱',
                    specialty:     '專長領域',
                    officeAddress: '辦公室位置',
                    officeTel:     '辦公室電話',
                    labName:       '實驗室名稱',
                    labAddress:    '實驗室位置',
                    labTel:        '實驗室電話',
                    labWeb:        '實驗室網站',
                    email:         'email',
                    personalWeb:   '個人網站',
                    fax:           '傳真',
                },
                modify: '變更您的',
            },
        } );

        this.profileDOM = {
            titleBlock:     opt.profileDOM.querySelector( profileQuerySelector( 'title' ) ),
            specialtyBlock: opt.profileDOM.querySelector( profileQuerySelector( 'specialty' ), ),
        };

        this.educationDOM = opt.educationDOM;
        this.experienceDOM = opt.experienceDOM;
        this.editPageDOM = opt.editPageDOM;

        Object.keys( this.profile ).map( ( key ) => {
            this.profile[ key ].DOM = {};
            this.profile[ key ].DOM.text = opt.profileDOM.querySelector( profileTextQuerySelector( this.profile[ key ].classModifier ) );
            this.profile[ key ].DOM.modifier = opt.profileDOM.querySelector( profileModifyQuerySelector( this.profile[ key ].classModifier ) );
        } );
    }

    async setEditPageWindow ( key ) {
        classRemove( this.editPageDOM, 'content__edit-page--hidden' );
        this.editPageDOM.innerHTML = '';
        this.editPageDOM.innerHTML += editPageHTML( {
            cancel: this.i18n[ this.config.languageId ].button.cancel,
            check:  this.i18n[ this.config.languageId ].button.check,
            topic:  `${ this.i18n[ this.config.languageId ].modify }${ this.i18n[ this.config.languageId ].topic[ key ] }`,
        } );
        return;
    }

    closeEditPageWindow () {
        classAdd( this.editPageDOM, 'content__edit-page--hidden' );
    }

    setEditPageWindowContent ( modifier, id, index, content, topic, DOM ) {
        try {
            const data = {
                modifier,
                id,
                index,
                content,
                topic,
                button:   {
                    remove: this.i18n[ this.config.languageId ].button.remove,
                    modify: this.i18n[ this.config.languageId ].button.modify,
                    add:    this.i18n[ this.config.languageId ].button.add,
                },
            };
            DOM.innerHTML += dynamicInputBlock( {
                data,
            } );
        }
        catch ( err ) {
            console.error( err );
        }
    }

    async setEditPageInput ( modifier, id ) { // Modifier: 'title', id: 'titleId'
        const data = {
            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: await this.fetchData( LanguageUtils.getLanguageId( 'zh-TW' ) ),
            [ LanguageUtils.getLanguageId( 'en-US' ) ]: await this.fetchData( LanguageUtils.getLanguageId( 'en-US' ) ),
        };

        data[ this.config.languageId ][ modifier ].forEach( ( element, index ) => {
            const modifyButtonDOM = this.profileDOM.titleBlock.querySelector( this.modifyButtonQuerySelector( modifier, element[ id ] ) );

            modifyButtonDOM.addEventListener( 'click', async () => {
                await this.setEditPageWindow( modifier );
                const editPage = {
                    content: this.editPageDOM.querySelector( '.edit-page__window > .window__from > .from__content' ),
                    check:   this.editPageDOM.querySelector( '.edit-page__window > .window__from > .from__button > .button__item--check' ),
                    cancel:  this.editPageDOM.querySelector( '.edit-page__window > .window__from > .from__button > .button__item--cancel' ),
                };
                const content = {
                    title:     languageId => data[ languageId ].title[ index ].title,
                    specialty: languageId => data[ languageId ].specialty[ index ].specialty,
                };

                this.editPage[ modifier ].forEach( ( item ) => {
                    item.languageId.forEach( ( languageId ) => {
                        editPage.content.innerHTML += editPageTextHTML( {
                            flag:       ( this.editPage[ modifier ].flag ) ? this.flag[ languageId ] : null,
                            content:    content[ modifier ]( languageId ),
                            name:    `${ modifier }_${ languageId }_${ element[ id ] }`,
                        } );
                    } );
                } );
                editPage.cancel.addEventListener( 'click', () => {
                    this.closeEditPageWindow();
                } );
                editPage.check.addEventListener( 'click', () => {
                    this.closeEditPageWindow();
                } );
            } );
        } );
    }

    queryApi ( lang ) {
        console.log( `${ host }/api/faculty/facultyWithId/${ this.config.profileId }?languageId=${ lang }` );
        return `${ host }/api/faculty/facultyWithId/${ this.config.profileId }?languageId=${ lang }`;
    }

    async fetchData ( lang ) {
        try {
            const res = await fetch( this.queryApi( lang ) );

            if ( !res.ok )
                throw new Error( 'No faculty found' );

            return res.json();
        }
        catch ( err ) {
            throw err;
        }
    }

    async setData () {
        const res = await this.fetchData( this.config.languageId );

        Object.keys( this.profile ).map( ( key ) => {
            this.profile[ key ].DOM.text.innerHTML = res.profile[ key ];
            this.profile[ key ].DOM.modifier.addEventListener( 'click', async () => {
                await this.setEditPageWindow( key );

                const data = {
                    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: await this.fetchData( LanguageUtils.getLanguageId( 'zh-TW' ) ),
                    [ LanguageUtils.getLanguageId( 'en-US' ) ]: await this.fetchData( LanguageUtils.getLanguageId( 'en-US' ) ),
                };

                const editPageContent = this.editPageDOM.querySelector( '.edit-page__window > .window__from > .from__content' );
                const editPageCheck = this.editPageDOM.querySelector( '.edit-page__window > .window__from > .from__button > .button__item--check' );
                const editPageCancel = this.editPageDOM.querySelector( '.edit-page__window > .window__from > .from__button > .button__item--cancel' );
                this.profile[ key ].editPage.languageId.forEach( ( languageId ) => {
                    editPageContent.innerHTML += editPageTextHTML( {
                        flag:       ( this.profile[ key ].editPage.flag ) ? this.flag[ languageId ] : null,
                        content:    data[ languageId ].profile[ key ],
                        name:    `profile_${ key }_${ languageId }`,
                    } );
                } );
                editPageCancel.addEventListener( 'click', () => {
                    this.closeEditPageWindow();
                } );
                editPageCheck.addEventListener( 'click', () => {
                    this.closeEditPageWindow();
                } );
            } );
        } );

        await this.renderTitleInputBlock( res.title );
        this.renderSpecialtyInputBlock( res.specialty );
        this.renderEducationInputBlock( res.education );
        this.renderExperienceInputBlock( res.experience );

        await this.setEditPageInput( 'title', 'titleId' );
    }

    async renderTitleInputBlock ( res ) {
        try {
            this.profileDOM.titleBlock.innerHTML = '';
            res.forEach( ( res, index ) => {
                const topic = this.i18n[ this.config.languageId ].topic.title;
                const DOM = this.profileDOM.titleBlock;
                this.setEditPageWindowContent( 'title', res.titleId, index, res.title, topic, DOM );
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
                const topic = this.i18n[ this.config.languageId ].topic.specialty;
                const DOM = this.profileDOM.specialtyBlock;
                this.setEditPageWindowContent( 'specialty', index, index, res.specialty, topic, DOM );
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
                const content = `${ res.school } ${ res.major } ${ degreeUtils.i18n[ this.config.languageId ][ degreeUtils.map[ res.degree ] ] }`;
                this.setEditPageWindowContent( 'education', res.educationId, index, content, '', this.educationDOM );
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
                const content = `${ res.organization } ${ res.department } ${ res.title }`;
                this.setEditPageWindowContent( 'experience', res.experienceId, index, content, '', this.experienceDOM );
            } );
        }
        catch ( err ) {
            throw err;
        }
    }

    async exec () {
        console.log( this.fetchData( this.config.languageId ) );
        await this.setData();
    }
}
