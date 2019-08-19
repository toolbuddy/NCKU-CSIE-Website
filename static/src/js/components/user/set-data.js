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
import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import validate from 'validate.js';
import nationUtils from '../../../../../models/faculty/utils/nation';
import projectCategoryUtils from 'models/faculty/utils/project-category.js';

class SetData {
    constructor ( opt ) {
        opt = opt || {};

        if (
            !ValidateUtils.isDomElement( opt.blockDOM ) ||
            !ValidateUtils.isDomElement( opt.noResultDOM ) ||
            !ValidateUtils.isDomElement( opt.loadingDOM ) ||
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
            noResult:  opt.noResultDOM,
            loading:   opt.loadingDOM,
        };
    }

    renderLoading () {
        classAdd( this.DOM.noResult, 'no-result--hidden' );
        classRemove( this.DOM.loading, 'loading--hidden' );
    }

    renderLoadingSucceed () {
        classAdd( this.DOM.loading, 'loading--hidden' );
        classAdd( this.DOM.noResult, 'no-result--hidden' );
    }

    renderLoadingFailed () {
        classAdd( this.DOM.loading, 'loading--hidden' );
        classRemove( this.DOM.noResult, 'no-result--hidden' );
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
                    for ( let i = 0; i < 3; ++i ) {
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
                data[ languageId ].studentAward.sort( ( awardA, awardB ) => {
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
                        const degree = degreeUtils.map[ data[ this.config.languageId ][ this.config.dbTable ][ index ].degree ];
                        content.push( `${ res.school } ${ res.major } ${ degree }` );
                        await this.renderBlock( {
                            dbTable: this.config.dbTable,
                            id:       dbTableId,
                            res:      data[ this.config.languageId ][ this.config.dbTable ][ index ],
                            nation:  nationUtils.map[ data[ this.config.languageId ][ this.config.dbTable ][ index ].nation ],
                            degree:  degreeUtils.map[ data[ this.config.languageId ][ this.config.dbTable ][ index ].degree ],
                        } );
                        break;
                    case 'experience':
                        let deleteContent = '';
                        deleteContent += `${ res.organization }`;
                        deleteContent += ( res.department !== null ) ? ` ${ res.department }` : '';
                        deleteContent += ( res.title !== null ) ? ` ${ res.title }` : '';
                        content.push( deleteContent );
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
                        if ( index === 0 ) {
                            await this.renderBlock( {
                                dbTable:     this.config.dbTable,
                                id:          res.technologyTransferId,
                                res:         data[ this.config.languageId ][ this.config.dbTable ][ index ],
                                isTitle:     true,
                            } );
                        }
                        await this.renderBlock( {
                            dbTable: this.config.dbTable,
                            id:       dbTableId,
                            res:      data[ this.config.languageId ][ this.config.dbTable ][ index ],
                            nation:  nationUtils.map[ data[ this.config.languageId ][ this.config.dbTable ][ index ].nation ],
                        } );
                        break;
                    case 'project':
                        if ( res.category !== tempCategory || index === 0 ) {
                            subtitle.push( projectCategoryUtils.i18n[ this.config.languageId ][ projectCategoryUtils.map[ res.category ] ] );
                            tempCategory = res.category;
                        }
                        content.push( res.name );
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
                        await this.renderBlock( {
                            dbTable:     this.config.dbTable,
                            id:          res.awardId,
                            subtitle,
                            res:         data[ this.config.languageId ][ this.config.dbTable ][ index ],
                            degreeI18n:  degreeUtils.i18n[ this.config.languageId ],
                            degreeUtils,
                        } );
                        this.setAddButtonEvent( {
                            dbTable:      'student',
                            dbTableId:    res.awardId,
                            addButtonDOM: this.DOM.block.querySelector( `.content__studentAward > .content__modify--student-${ res.awardId }` ),
                        } );

                        if ( ValidateUtils.isValidArray( res.student ) ) {
                            const removeSelector = studentId => ` .word__student > .student__remove-${ studentId } `;
                            const updateSelector = studentId => ` .word__student > .student__modify-${ studentId } `;
                            res.student.forEach( ( student, studentIndex ) => {
                                this.setUpdateButtonEvent( {
                                    buttonDOM: this.DOM.block.querySelector( updateSelector( student.studentId ) ),
                                    res:       LanguageUtils.supportedLanguageId.map( id => data[ id ].studentAward[ index ].student[ studentIndex ] ),
                                    id:        student.studentId,
                                    dbTable:   'student',
                                } );
                                this.setDeleteButtonEvent( {
                                    buttonDOM: this.DOM.block.querySelector( removeSelector( student.studentId ) ),
                                    id:        student.studentId,
                                    content:   student.name,
                                    dbTable:   'student',
                                } );
                            } );
                        }

                        dbTableId = res.awardId;
                        break;
                    case 'technologyTransfer':
                        content.push( res.technology );

                        if ( index === 0 ) {
                            await this.renderBlock( {
                                dbTable:     this.config.dbTable,
                                id:          res.technologyTransferId,
                                res:         data[ this.config.languageId ][ this.config.dbTable ][ index ],
                                isTitle:     true,
                            } );
                        }
                        await this.renderBlock( {
                            dbTable:     this.config.dbTable,
                            id:          res.technologyTransferId,
                            res:         data[ this.config.languageId ][ this.config.dbTable ][ index ],
                            isTitle:     false,
                        } );
                        this.setAddButtonEvent( {
                            dbTable:      'technologyTransferPatent',
                            dbTableId:    res.technologyTransferId,
                            addButtonDOM: this.DOM.block.querySelector( `.content__technologyTransfer > .content__modify--technologyTransfer-${ res.technologyTransferId }` ),
                        } );

                        if ( ValidateUtils.isValidArray( res.technologyTransferPatent ) ) {
                            const removeSelector = patentId => ` .technologyTransfer__patent > .patent__remove-${ patentId } `;
                            const updateSelector = patentId => `  .technologyTransfer__patent > .patent__modify-${ patentId } `;
                            res.technologyTransferPatent.forEach( ( patent, patentIndex ) => {
                                this.setUpdateButtonEvent( {
                                    buttonDOM: this.DOM.block.querySelector( updateSelector( patent.technologyTransferPatentId ) ),
                                    res:       LanguageUtils.supportedLanguageId.map( ( id ) => {
                                        if ( typeof data[ id ].technologyTransfer[ index ] === 'object' )
                                            return data[ id ].technologyTransfer[ index ].technologyTransferPatent[ patentIndex ];
                                        return data[ 0 ].technologyTransfer[ index ].technologyTransferPatent[ patentIndex ];
                                    } ),
                                    id:        patent.technologyTransferPatentId,
                                    dbTable:   'technologyTransferPatent',
                                } );
                                this.setDeleteButtonEvent( {
                                    buttonDOM: this.DOM.block.querySelector( removeSelector( patent.technologyTransferPatentId ) ),
                                    id:        patent.technologyTransferPatentId,
                                    content:   patent.patent,
                                    dbTable:   'technologyTransferPatent',
                                } );
                            } );
                        }
                        break;
                    default:
                        content = '';
                }
                if ( this.config.dbTable !== 'education' &&
                    this.config.dbTable !== 'experience' &&
                    this.config.dbTable !== 'project' &&
                    this.config.dbTable !== 'studentAward' &&
                    this.config.dbTable !== 'technologyTransfer' &&
                    this.config.dbTable !== 'patent' ) {
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
                    dbTable:   this.config.dbTable,
                } );
                this.setDeleteButtonEvent( {
                    buttonDOM: this.DOM.block.querySelector( deleteSelector ),
                    id:        dbTableId,
                    content,
                    dbTable:   this.config.dbTable,
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

    uploadUpdateData ( dbTableItemId, dbTable ) {
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
                dbTable,
                dbTableItemId,
                item,
                i18n,
            } ),
        } )
        .then( async () => {
            this.exec();
            this.emptyBlock();
            this.closeEditPageWindow();
        } ).catch( ( err ) => {
            this.closeEditPageWindow();
            this.emptyBlock();
            this.renderLoadingFailed();
            console.error( err );
        } );
    }

    uploadAddData ( dbTable, dbTableId ) {
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
                dbTableId,
                method:       'add',
                dbTable,
                item,
                i18n,
            } ),
        } )
        .then( async () => {
            this.exec();
            this.emptyBlock();
            this.closeEditPageWindow();
        } ).catch( ( err ) => {
            this.closeEditPageWindow();
            this.emptyBlock();
            this.renderLoadingFailed();
            console.error( err );
        } );
    }

    uploadDeleteData ( dbTableItemId, dbTable ) {
        fetch( `${ host }/user/profile`, {
            method:   'POST',
            body:   JSON.stringify( {
                profileId:     this.config.profileId,
                method:        'delete',
                dbTable,
                dbTableItemId,
            } ),
        } )
        .then( async () => {
            this.exec();
            this.emptyBlock();
            this.closeEditPageWindow();
        } ).catch( ( err ) => {
            this.closeEditPageWindow();
            this.emptyBlock();
            this.renderLoadingFailed();
            console.error( err );
        } );
    }

    checkSubmitData ( dbTable ) {
        let isValid = true;
        const errorSelector =   '.edit-page__window > .window__form > .form__content > .content__error > .error__message';
        const editPageDOM = document.getElementById( 'edit-page' );
        const errorDOM = editPageDOM.querySelector( errorSelector );
        const input = editPageDOM.getElementsByTagName( 'input' );

        const constraints = validationInfo[ dbTable ];

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

    setAddButtonEvent ( opt ) {
        opt.addButtonDOM.addEventListener( 'click', async () => {
            const editPage = new EditPage( {
                editPageConfig: dataEditPageConfig[ opt.dbTable ],
                dataI18n:       dataI18n[ opt.dbTable ],
                editPageDOM:    this.DOM.editPage,
                dbTable:        opt.dbTable,
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
                const isValid = this.checkSubmitData( opt.dbTable );
                if ( isValid )
                    this.uploadAddData( opt.dbTable, opt.dbTableId );
            } );
        } );
    }

    setUpdateButtonEvent ( info ) {
        info.buttonDOM.addEventListener( 'click', async () => {
            const editPage = new EditPage( {
                editPageConfig: dataEditPageConfig[ info.dbTable ],
                dataI18n:       dataI18n[ info.dbTable ],
                editPageDOM:    this.DOM.editPage,
                dbTable:        info.dbTable,
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

                const isValid = this.checkSubmitData( info.dbTable );
                if ( isValid )
                    this.uploadUpdateData( info.id, info.dbTable );
            } );
        } );
    }

    setDeleteButtonEvent ( info ) {
        info.buttonDOM.addEventListener( 'click', async () => {
            const editPage = new EditPage( {
                dataI18n:       dataI18n[ info.dbTable ],
                editPageConfig: dataEditPageConfig[ info.dbTable ],
                editPageDOM:    this.DOM.editPage,
                dbTable:        info.dbTable,
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
                this.uploadDeleteData( info.id, info.dbTable );
            } );
        } );
    }

    emptyBlock () {
        this.DOM.block.innerHTML = '';
    }

    async exec () {
        this.renderLoading();
        Promise.all( LanguageUtils.supportedLanguageId.map( id => this.fetchData( id ) ) )
        .then( async ( data ) => {
            console.log( data[ this.config.languageId ] );
            if ( validate.isEmpty( data[ this.config.languageId ][ this.config.dbTable ] ) )
                this.emptyBlock();
            else
                this.setBlock( data );
            this.setAddButtonEvent( {
                dbTable:      this.config.dbTable,
                dbTableId:    -1,
                addButtonDOM: this.DOM.addButton,
            } );
        } )
        .then( () => {
            this.renderLoadingSucceed();
        } )
        .catch( () => {
            this.renderLoadingFailed();
        } );
    }
}

export {
    SetData,
};
