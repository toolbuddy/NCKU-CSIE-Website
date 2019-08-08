import EditPage from 'static/src/js/components/user/edit-page.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import { host, } from 'settings/server/config.js';
import ValidateUtils from 'models/common/utils/validate.js';
import dynamicInputBlock from 'static/src/pug/components/user/dynamic-input-block.pug';
import LanguageUtils from 'models/common/utils/language.js';
import degreeUtils from 'models/faculty/utils/degree.js';
import dataI18n from 'static/src/js/components/user/static-data/data-i18n.js';
import dataEditPageConfig from 'static/src/js/components/user/static-data/data-edit-page-config.js';
import validationInfo from 'static/src/js/components/user/static-data/validation-info.js';
import publicationCategoryUtils from 'models/faculty/utils/publication-category.js';
import validate from 'validate.js';

class SetData {
    constructor ( opt ) {
        opt = opt || {};

        if (
            !ValidateUtils.isDomElement( opt.blockDOM ) ||
            !ValidateUtils.isDomElement( opt.addButtonDOM ) ||
            !WebLanguageUtils.isSupportedLanguageId( opt.languageId )
        )
            throw new TypeError( 'invalid arguments' );

        this.config = {
            languageId: opt.languageId,
            profileId:  opt.profileId,
            dbTable:    opt.dbTable,
        };

        this.i18n = dataI18n[ opt.dbTable ];

        this.DOM = {
            block:     opt.blockDOM,
            addButton: opt.addButtonDOM,
        };

        this.selector = {
            check:  '.edit-page__window > .window__form > .form__button > .button__item--check',
            cancel: '.edit-page__window > .window__form > .form__button > .button__item--cancel',
            error:  '.edit-page__window > .window__form > .form__content > .content__error > .error__message',
        };

        this.updateButtonQuerySelector = ( block, id ) => `.input-block__block > .block__content > .content__modify--${ block }-${ id }`;
        this.deleteButtonQuerySelector = ( block, id ) => `.input-block__block > .block__content > .content__remove--${ block }-${ id }`;

        this.editPageConfig = dataEditPageConfig[ opt.dbTable ];
    }

    queryApi ( lang ) {
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

    async renderBlock ( opt ) {
        try {
            const data = {
                opt,
                removeSrc: `${ host }/static/image/icon/delete.png`,
                editSrc:   `${ host }/static/image/icon/edit.png`,
            };
            this.DOM.block.innerHTML += dynamicInputBlock( {
                data,
            } );
        }
        catch ( err ) {
            console.error( err );
        }
    }

    async sortData ( data ) {
        if ( this.config.dbTable === 'award' ) {
            LanguageUtils.supportedLanguageId.forEach( ( languageId ) => {
                data[ languageId ].award.sort( ( awardA, awardB ) => {
                    if (
                        awardA.receivedYear !== null &&
                      awardB.receivedYear !== null &&
                      awardA.receivedYear !== awardB.receivedYear
                    )
                        return awardB.receivedYear - awardA.receivedYear;
                    else if (
                        awardA.receivedMonth !== null &&
                      awardB.receivedMonth !== null &&
                      awardA.receivedMonth !== awardB.receivedMonth
                    )
                        return awardB.receivedMonth - awardA.receivedMonth;
                    else if (
                        awardA.receivedDay !== null &&
                      awardB.receivedDay !== null &&
                      awardA.receivedDay !== awardB.receivedDay
                    )
                        return awardB.receivedDay - awardA.receivedDay;
                    return 0;
                } );
            } );
        }
        if ( this.config.dbTable === 'conference' ) {
            LanguageUtils.supportedLanguageId.forEach( ( languageId ) => {
                data[ languageId ].conference.sort( ( conferenceA, conferenceB ) => {
                    if (
                        conferenceA.hostYear !== null &&
                        conferenceB.hostYear !== null &&
                        conferenceA.hostYear !== conferenceB.hostYear
                    )
                        return conferenceB.hostYear - conferenceA.hostYear;
                    return 0;
                } );
            } );
        }
        if ( this.config.dbTable === 'publication' ) {
            LanguageUtils.supportedLanguageId.forEach( ( languageId ) => {
                data[ languageId ].publication.sort( ( publicationA, publicationB ) => {
                    if (
                        publicationA.refereed !== null &&
                        publicationB.refereed !== null &&
                        publicationA.refereed !== publicationB.refereed )
                        return ( publicationA.refereed ) ? -1 : 1;
                    else if (
                        publicationA.international !== null &&
                        publicationB.international !== null &&
                        publicationA.international !== publicationB.international )
                        return ( publicationA.international ) ? -1 : 1;
                    else if (
                        publicationA.category !== null &&
                        publicationB.category !== null &&
                        publicationA.category !== publicationB.category )
                        return publicationB.category - publicationA.category;
                    else if (
                        publicationA.issueYear !== null &&
                        publicationB.issueYear !== null &&
                        publicationA.issueYear !== publicationB.issueYear )
                        return publicationB.issueYear - publicationA.issueYear;
                    return 0;
                } );
            } );
        }
        return data;
    }

    async setBlock ( dbData ) {
        try {
            this.DOM.block.innerHTML = '';
            const data = await this.sortData( dbData );
            let currentYear = new Date().getFullYear();
            let tempRefereed = true;
            let tempCategory = 0;
            data[ this.config.languageId ][ this.config.dbTable ].forEach( async ( res, index ) => {
                let content = '';
                let subtitle = null;
                const dbTableId = res[ `${ this.config.dbTable }Id` ];
                switch ( this.config.dbTable ) {
                    case 'education':
                        [ res.school,
                            res.major,
                            degreeUtils.i18n[ this.config.languageId ][ degreeUtils.map[ res.degree ] ], ].forEach( ( element ) => {
                            if ( ValidateUtils.isValidString( element ) )
                                content += `${ element } `;
                        } );
                        break;
                    case 'experience':
                        [ 'organization',
                            'department',
                            'title', ].forEach( ( element ) => {
                            if ( ValidateUtils.isValidString( res[ element ] ) )
                                content += `${ res[ element ] } `;
                        } );
                        break;
                    case 'award':
                        content = res.award;
                        if ( res.receivedYear !== currentYear || index === 0 ) {
                            subtitle = res.receivedYear;
                            currentYear = res.receivedYear;
                        }
                        break;
                    case 'conference':
                        content = res.conference;
                        if ( res.hostYear !== currentYear || index === 0 ) {
                            subtitle = res.hostYear;
                            currentYear = res.hostYear;
                        }
                        break;
                    case 'title':
                        content = res.title;
                        break;
                    case 'specialty':
                        content = res.specialty;
                        break;
                    case 'publication':
                        content = res.title;
                        if ( res.refereed !== tempRefereed || res.category !== tempCategory || index === 0 ) {
                            const category = publicationCategoryUtils.i18n[ this.config.languageId ][ publicationCategoryUtils.map[ res.category ] ];
                            tempRefereed = res.refereed;
                            tempCategory = res.category;
                            subtitle = '';
                            if ( res.refereed )
                                subtitle += 'Refereed';
                            if ( res.international )
                                subtitle += '國際';
                            subtitle += category;
                        }
                        break;
                    case 'patent':
                        content = res.patent;
                        break;
                    case 'project':
                        content = res.name;
                        break;
                    default:
                        content = '';
                }
                await this.renderBlock( {
                    modifier: this.config.dbTable,
                    id:       dbTableId,
                    content,
                    subtitle,
                    res:      LanguageUtils.supportedLanguageId.map( id => data[ id ][ this.config.dbTable ][ index ] ),
                } );
                await this.setUpdateButtonEvent( {
                    buttonDOM: this.DOM.block.querySelector( this.updateButtonQuerySelector( this.config.dbTable, dbTableId ) ),
                    res:       LanguageUtils.supportedLanguageId.map( id => data[ id ][ this.config.dbTable ][ index ] ),
                    id:        dbTableId,
                } );
                await this.setDeleteButtonEvent( {
                    buttonDOM: this.DOM.block.querySelector( this.deleteButtonQuerySelector( this.config.dbTable, dbTableId ) ),
                    id:        dbTableId,
                    content,
                } );
            } );
        }
        catch ( err ) {
            throw err;
        }
    }

    closeEditPageWindow () {
        document.body.removeChild( document.getElementById( 'edit-page' ) );
    }

    uploadUpdateData ( dbTableItemId ) {
        this.checkSubmitData();
        const editPageDOM = document.getElementById( 'edit-page' );
        const input = editPageDOM.getElementsByTagName( 'input' );
        const item = {};
        const i18n = {
            [ LanguageUtils.getLanguageId( 'en-US' ) ]: {},
            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {},
        };
        Array.from( input ).forEach( ( element ) => {
            if ( element.getAttribute( 'i18n' ) !== null )
                i18n[ element.getAttribute( 'languageId' ) ][ element.getAttribute( 'dbTableItem' ) ] = element.value;
            else if ( element.type === 'checkbox' )
                item[ element.getAttribute( 'dbTableItem' ) ] = ( element.checked ) ? 1 : 0;
            else
                item[ element.getAttribute( 'dbTableItem' ) ] = element.value;
        } );

        fetch( `${ host }/user/profile`, {
            method:   'POST',
            body:   JSON.stringify( {
                'profileId':    this.config.profileId,
                'method':       'update',
                'dbTable':      this.config.dbTable,
                dbTableItemId,
                item,
                i18n,
            } ),
        } )
        .then( async () => {
            this.exec();
            this.closeEditPageWindow();
        } ).catch( ( err ) => {
            this.closeEditPageWindow();
            console.error( err );
        } );
    }

    uploadAddData () {
        const editPageDOM = document.getElementById( 'edit-page' );
        const input = editPageDOM.getElementsByTagName( 'input' );
        const item = {};
        const i18n = {
            [ LanguageUtils.getLanguageId( 'en-US' ) ]: {},
            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {},
        };
        Array.from( input ).forEach( ( element ) => {
            if ( element.getAttribute( 'i18n' ) !== null )
                i18n[ element.getAttribute( 'languageId' ) ][ element.getAttribute( 'dbTableItem' ) ] = element.value;
            else if ( element.type === 'checkbox' )
                item[ element.getAttribute( 'dbTableItem' ) ] = ( element.checked ) ? 1 : 0;
            else
                item[ element.getAttribute( 'dbTableItem' ) ] = element.value;
        } );

        fetch( `${ host }/user/profile`, {
            method:   'POST',
            body:   JSON.stringify( {
                profileId:    this.config.profileId,
                method:       'add',
                dbTable:      this.config.dbTable,
                item,
                i18n,
            } ),
        } )
        .then( async () => {
            this.exec();
            this.closeEditPageWindow();
        } ).catch( ( err ) => {
            this.closeEditPageWindow();
            console.error( err );
        } );
    }

    uploadDeleteData ( dbTableItemId ) {
        fetch( `${ host }/user/profile`, {
            method:   'POST',
            body:   JSON.stringify( {
                profileId:     this.config.profileId,
                method:        'delete',
                dbTable:       this.config.dbTable,
                dbTableItemId,
            } ),
        } )
        .then( async () => {
            this.exec();
            this.closeEditPageWindow();
        } ).catch( ( err ) => {
            this.closeEditPageWindow();
            console.error( err );
        } );
    }

    checkSubmitData () {
        let isValid = true;
        const editPageDOM = document.getElementById( 'edit-page' );
        const errorDOM = editPageDOM.querySelector( this.selector.error );
        const input = editPageDOM.getElementsByTagName( 'input' );

        const constraints = validationInfo[ this.config.dbTable ];

        Array.from( input ).forEach( ( element ) => {
            if ( constraints[ element.name ].presence.allowEmpty === false || element.value !== '' ) {
                const errors = validate.single( element.value, constraints[ element.name ] );
                if ( errors ) {
                    this.setErrorMessage( element, errors[ 0 ], errorDOM );
                    isValid = false;
                }
            }
        } );

        return isValid;
    }

    setErrorMessage ( inputDOM, errorMessage, errorDOM ) {
        inputDOM.focus();
        errorDOM.textContent = errorMessage;
    }

    setAddButtonEvent () {
        this.DOM.addButton.addEventListener( 'click', async () => {
            const editPage = new EditPage( {
                editPageConfig: dataEditPageConfig[ this.config.dbTable ],
                dataI18n:       dataI18n[ this.config.dbTable ],
                editPageDOM:    this.DOM.editPage,
                dbTable:        this.config.dbTable,
                languageId:     this.config.languageId,
                buttonMethod:   'add',
            } );
            await editPage.renderEditPage();

            const editPageDOM = document.getElementById( 'edit-page' );
            const cancelDOM = editPageDOM.querySelector( this.selector.cancel );
            const checkDOM = editPageDOM.querySelector( this.selector.check );

            cancelDOM.addEventListener( 'click', ( e ) => {
                e.preventDefault();
                this.closeEditPageWindow();
            } );
            checkDOM.addEventListener( 'click', ( e ) => {
                e.preventDefault();
                const isValid = this.checkSubmitData();
                if ( isValid )
                    this.uploadAddData();
            } );
        } );
    }

    setUpdateButtonEvent ( info ) {
        info.buttonDOM.addEventListener( 'click', async () => {
            const editPage = new EditPage( {
                editPageConfig: dataEditPageConfig[ this.config.dbTable ],
                dataI18n:       dataI18n[ this.config.dbTable ],
                editPageDOM:    this.DOM.editPage,
                dbTable:        this.config.dbTable,
                languageId:     this.config.languageId,
                dbData:         info.res,
                buttonMethod:   'update',
            } );
            await editPage.renderEditPage();
            const editPageDOM = document.getElementById( 'edit-page' );
            const cancelDOM = editPageDOM.querySelector( this.selector.cancel );
            const checkDOM = editPageDOM.querySelector( this.selector.check );

            cancelDOM.addEventListener( 'click', ( e ) => {
                e.preventDefault();
                this.closeEditPageWindow();
            } );
            checkDOM.addEventListener( 'click', ( e ) => {
                e.preventDefault();

                const isValid = this.checkSubmitData();
                if ( isValid )
                    this.uploadUpdateData( info.id );
            } );
        } );
    }

    setDeleteButtonEvent ( info ) {
        info.buttonDOM.addEventListener( 'click', async () => {
            const editPage = new EditPage( {
                dataI18n:       dataI18n[ this.config.dbTable ],
                editPageConfig: dataEditPageConfig[ this.config.dbTable ],
                editPageDOM:    this.DOM.editPage,
                dbTable:        this.config.dbTable,
                languageId:     this.config.languageId,
                id:             info.id,
                content:        info.content,
                buttonMethod:   'delete',
            } );
            await editPage.renderEditPage();

            const editPageDOM = document.getElementById( 'edit-page' );
            const cancelDOM = editPageDOM.querySelector( this.selector.cancel );
            const checkDOM = editPageDOM.querySelector( this.selector.check );

            cancelDOM.addEventListener( 'click', ( e ) => {
                e.preventDefault();
                this.closeEditPageWindow();
            } );
            checkDOM.addEventListener( 'click', ( e ) => {
                e.preventDefault();
                this.uploadDeleteData( info.id );
            } );
        } );
    }

    async exec () {
        Promise.all( LanguageUtils.supportedLanguageId.map( id => this.fetchData( id ) ) )
        .then( async ( data ) => {
            console.log( data[ this.config.languageId ] );
            if ( !validate.isEmpty( data[ this.config.languageId ][ this.config.dbTable ] ) )
                this.setBlock( data );
            this.setAddButtonEvent();
        } );
    }
}

export {
    SetData,
};
