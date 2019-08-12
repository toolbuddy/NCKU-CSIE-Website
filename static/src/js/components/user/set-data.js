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
import nationUtils from '../../../../../models/faculty/utils/nation';
import projectCategoryUtils from 'models/faculty/utils/project-category.js';

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

        this.DOM = {
            block:     opt.blockDOM,
            addButton: opt.addButtonDOM,
        };
    }

    queryApi ( languageId ) {
        return `${ host }/api/faculty/facultyWithId/${ this.config.profileId }?languageId=${ languageId }`;
    }

    async fetchData ( languageId ) {
        try {
            const res = await fetch( this.queryApi( languageId ) );

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
                opt,
                host,
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
                        return publicationA.category - publicationB.category;
                    else if (
                        publicationA.issueYear !== null &&
                        publicationB.issueYear !== null &&
                        publicationA.issueYear !== publicationB.issueYear )
                        return publicationB.issueYear - publicationA.issueYear;
                    return 0;
                } );
            } );
        }
        if ( this.config.dbTable === 'patent' ) {
            LanguageUtils.supportedLanguageId.forEach( ( languageId ) => {
                data[ languageId ].patent.sort( ( patentA, patentB ) => {
                    const tempDateA = ( patentA.applicationDate !== null ) ? patentA.applicationDate.split( '-' ) : null;
                    const tempDateB = ( patentB.applicationDate !== null ) ? patentB.applicationDate.split( '-' ) : null;
                    for ( const i = 0; i < 3; ++i ) {
                        if ( tempDateA !== null &&
                            tempDateB !== null &&
                            tempDateA[ i ] !== tempDateB[ i ] )
                            return tempDateB[ i ] - tempDateA[ i ];
                    }
                    return 0;
                } );
            } );
        }
        if ( this.config.dbTable === 'project' ) {
            LanguageUtils.supportedLanguageId.forEach( ( languageId ) => {
                data[ languageId ].project.sort( ( projectA, projectB ) => {
                    if ( projectA.category !== projectB.category )
                        return projectB.category - projectA.category;
                    else if ( projectA.from !== null &&
                        projectB.from !== null &&
                        projectA.from !== projectB.from )
                        return projectB.from - projectA.from;
                    return 0;
                } );
            } );
        }
        if ( this.config.dbTable === 'studentAward' ) {
            LanguageUtils.supportedLanguageId.forEach( ( languageId ) => {
                data[ languageId ].award.sort( ( awardA, awardB ) => {
                    if (
                        awardA.receivedYear !== null &&
                      awardB.receivedYear !== null &&
                      awardA.receivedYear !== awardB.receivedYear
                    )
                        return awardB.receivedYear - awardA.receivedYear;
                    return 0;
                } );
            } );
        }
        if ( this.config.dbTable === 'technologyTransfer' ||
            this.config.dbTable === 'education' ||
            this.config.dbTable === 'experience' ) {
            LanguageUtils.supportedLanguageId.forEach( ( languageId ) => {
                data[ languageId ][ this.config.dbTable ].sort( ( tempA, tempB ) => {
                    if (
                        tempA.from !== null &&
                      tempB.from !== null &&
                      tempA.from !== tempB.from
                    )
                        return tempB.from - tempA.from;
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
            let tempInternational = true;
            let tempCategory = 0;
            data[ this.config.languageId ][ this.config.dbTable ].forEach( async ( res, index ) => {
                let content = new Array();
                const subtitle = new Array();
                let dbTableId = res[ `${ this.config.dbTable }Id` ];
                switch ( this.config.dbTable ) {
                    case 'education':
                        await this.renderBlock( {
                            dbTable: this.config.dbTable,
                            id:       dbTableId,
                            res:      data[ this.config.languageId ][ this.config.dbTable ][ index ],
                            nation:  nationUtils.map[ data[ this.config.languageId ][ this.config.dbTable ][ index ].nation ],
                            degree:  degreeUtils.map[ data[ this.config.languageId ][ this.config.dbTable ][ index ].degree ],
                        } );
                        break;
                    case 'experience':
                        await this.renderBlock( {
                            dbTable: 'experience',
                            id:       dbTableId,
                            res:      data[ this.config.languageId ][ this.config.dbTable ][ index ],
                        } );
                        break;
                    case 'award':
                        content.push( res.award );
                        if ( res.receivedYear !== currentYear || index === 0 ) {
                            subtitle.push( res.receivedYear );
                            currentYear = res.receivedYear;
                        }
                        break;
                    case 'conference':
                        content.push( res.conference );
                        if ( res.hostYear !== currentYear || index === 0 ) {
                            subtitle.push( res.hostYear );
                            currentYear = res.hostYear;
                        }
                        break;
                    case 'title':
                        content.push( res.title );
                        break;
                    case 'specialty':
                        content.push( res.specialty );
                        break;
                    case 'publication':
                        content.push( res.title );
                        content.push( ` ${ res.authors }` );
                        let temp = '';
                        if (
                            res.refereed !== tempRefereed ||
                            res.category !== tempCategory ||
                            res.international !== tempInternational ||
                            index === 0 ) {
                            const category = publicationCategoryUtils.i18n[ this.config.languageId ][ publicationCategoryUtils.map[ res.category ] ];
                            tempRefereed = res.refereed;
                            tempCategory = res.category;
                            tempInternational = res.international;
                            temp = '';
                            if ( res.refereed )
                                temp += 'Refereed \n';
                            if ( res.international )
                                temp += '國際';
                            temp += category;
                            subtitle.push( temp );
                        }
                        if ( res.issueYear !== currentYear || index === 0 ) {
                            subtitle.push( res.issueYear );
                            currentYear = res.issueYear;
                        }
                        break;
                    case 'patent':
                        content.push( res.patent );
                        break;
                    case 'project':
                        if ( res.category !== tempCategory || index === 0 ) {
                            subtitle.push( projectCategoryUtils.i18n[ this.config.languageId ][ projectCategoryUtils.map[ res.category ] ] );
                            tempCategory = res.category;
                        }
                        await this.renderBlock( {
                            dbTable: this.config.dbTable,
                            id:       dbTableId,
                            subtitle,
                            res:      data[ this.config.languageId ][ this.config.dbTable ][ index ],
                        } );
                        break;
                    case 'studentAward':
                        if ( res.receivedYear !== currentYear || index === 0 ) {
                            subtitle.push( res.receivedYear );
                            currentYear = res.receivedYear;
                        }
                        content.push( res.award );
                        dbTableId = res.awardId;
                        break;
                    case 'technologyTransfer':
                        content.push( res.technology );
                        break;
                    default:
                        content = '';
                }
                if ( this.config.dbTable !== 'education' &&
                    this.config.dbTable !== 'experience' &&
                    this.config.dbTable !== 'project' ) {
                    await this.renderBlock( {
                        dbTable:  this.config.dbTable,
                        id:       dbTableId,
                        content,
                        subtitle,
                        res:      LanguageUtils.supportedLanguageId.map( id => data[ id ][ this.config.dbTable ][ index ] ),
                    } );
                }

                const updateSelector = `.input-block__block > .block__content > .content__modify--${ this.config.dbTable }-${ dbTableId }`;
                const deleteSelector = `.input-block__block > .block__content > .content__remove--${ this.config.dbTable }-${ dbTableId }`;
                this.setUpdateButtonEvent( {
                    buttonDOM: this.DOM.block.querySelector( updateSelector ),
                    res:       LanguageUtils.supportedLanguageId.map( id => data[ id ][ this.config.dbTable ][ index ] ),
                    id:        dbTableId,
                } );
                this.setDeleteButtonEvent( {
                    buttonDOM: this.DOM.block.querySelector( deleteSelector ),
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
        const errorSelector =   '.edit-page__window > .window__form > .form__content > .content__error > .error__message';
        const editPageDOM = document.getElementById( 'edit-page' );
        const errorDOM = editPageDOM.querySelector( errorSelector );
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

            const selector = {
                cancel: '.edit-page__window > .window__form > .form__button > .button__item--cancel',
                check:  '.edit-page__window > .window__form > .form__button > .button__item--check',
            };
            const editPageDOM = document.getElementById( 'edit-page' );
            const cancelDOM = editPageDOM.querySelector( selector.cancel );
            const checkDOM = editPageDOM.querySelector( selector.check );

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

            const selector = {
                cancel: '.edit-page__window > .window__form > .form__button > .button__item--cancel',
                check:  '.edit-page__window > .window__form > .form__button > .button__item--check',
            };
            const editPageDOM = document.getElementById( 'edit-page' );
            const cancelDOM = editPageDOM.querySelector( selector.cancel );
            const checkDOM = editPageDOM.querySelector( selector.check );

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

            const selector = {
                cancel: '.edit-page__window > .window__form > .form__button > .button__item--cancel',
                check:  '.edit-page__window > .window__form > .form__button > .button__item--check',
            };
            const editPageDOM = document.getElementById( 'edit-page' );
            const cancelDOM = editPageDOM.querySelector( selector.cancel );
            const checkDOM = editPageDOM.querySelector( selector.check );

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
