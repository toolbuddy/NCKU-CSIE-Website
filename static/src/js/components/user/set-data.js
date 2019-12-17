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

        /***
         * Data validation
         * require data:
         * blockDOM:     DOM of information block
         * addButtonDOM: DOM of add button to add information
         * loadingDOM:   DOM of loading logo
         * languageId:   Id  of languageId
         * profileId:    Id  of profileId
         * dbTable:      String of the table name of database
         */

        if (
            !ValidateUtils.isDomElement( opt.blockDOM ) ||
            !ValidateUtils.isDomElement( opt.refreshDOM ) ||
            !ValidateUtils.isDomElement( opt.loadingDOM ) ||
            !ValidateUtils.isDomElement( opt.addButtonDOM ) ||
            !WebLanguageUtils.isSupportedLanguageId( opt.languageId ) ||
            !ValidateUtils.isValidId( opt.profileId ) ||
            !ValidateUtils.isValidString( opt.dbTable )
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
            refresh:   opt.refreshDOM,
            loading:   opt.loadingDOM,
        };
    }

    /***
     * Show loading logo
     */

    renderLoading () {
        classAdd( this.DOM.refresh, 'refresh--hidden' );
        classRemove( this.DOM.loading, 'loading--hidden' );
    }

    /***
     * Show data information ( show the blocks )
     */

    renderLoadingSucceed () {
        classAdd( this.DOM.loading, 'loading--hidden' );
        classAdd( this.DOM.refresh, 'refresh--hidden' );
    }

    /***
     * Show refresh logo
     */

    renderLoadingFailed () {
        classAdd( this.DOM.loading, 'loading--hidden' );
        classRemove( this.DOM.refresh, 'refresh--hidden' );
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

    /****
     * Render Information Block
     */

    async renderBlock ( opt ) {
        try {
            this.DOM.block.innerHTML += dynamicInputBlock( {
                opt,
                host,
                dbTable:     this.config.dbTable,
                languageId:  this.config.languageId,
                LANG:        LanguageUtils,
                dataI18n:    dataI18n[ this.config.dbTable ],
            } );
        }
        catch ( err ) {
            console.error( err );
        }
    }

    /***
     * Sort database data to show information in order
     */

    async sortData ( dbData ) {
        /***
         * Sort award data
         * receievedYear: int
         */

        if ( this.config.dbTable === 'award' ) {
            LanguageUtils.supportedLanguageId.forEach( ( languageId ) => {
                dbData[ languageId ].award.sort( ( awardA, awardB ) => {
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

        /***
         * Sort conference data
         * hostYear: boolean
         */

        if ( this.config.dbTable === 'conference' ) {
            LanguageUtils.supportedLanguageId.forEach( ( languageId ) => {
                dbData[ languageId ].conference.sort( ( conferenceA, conferenceB ) => {
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

        /***
         * Sort conference data
         * refereed: boolean,
         * international: boolean,
         * category:  int ( 0 for journal, 1 for conference, 2 for workshop ),
         * issueYear: int
         */

        if ( this.config.dbTable === 'publication' ) {
            LanguageUtils.supportedLanguageId.forEach( ( languageId ) => {
                dbData[ languageId ].publication.sort( ( publicationA, publicationB ) => {
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

        /***
         * Sort patent data
         * applicationDate: string ( yyyy-mm-dd )
         */

        if ( this.config.dbTable === 'patent' ) {
            LanguageUtils.supportedLanguageId.forEach( ( languageId ) => {
                dbData[ languageId ].patent.sort( ( patentA, patentB ) => {
                    const tempDateA = ( patentA.applicationDate !== null ) ? patentA.applicationDate.split( '-' ) : null;
                    const tempDateB = ( patentB.applicationDate !== null ) ? patentB.applicationDate.split( '-' ) : null;

                    /***
                     * If one of applicationDates not exist, put it behind
                     * If all of applicationDatas not exist, don't change its position
                     */

                    if ( tempDateA === null && tempDateB !== null )
                        return 1;

                    else if ( tempDateA !== null && tempDateB === null )
                        return -1;

                    else if ( tempDateA === null && tempDateB === null )
                        return 0;

                    /***
                     * Sort data according to
                     * tempDate[ 0 ]: year
                     * tempDate[ 1 ]: month
                     * tempDate[ 2 ]: day
                     */

                    for ( let i = 0; i < 3; ++i ) {
                        if ( tempDateA[ i ] !== tempDateB[ i ] )
                            return Number( tempDateB[ i ] ) - Number( tempDateA[ i ] );
                    }
                    return 0;
                } );
            } );
        }

        /***
         * Sort project data
         * category: int ( 0 for generl, 1 for national science council )
         * from:     int ( year )
         */

        if ( this.config.dbTable === 'project' ) {
            LanguageUtils.supportedLanguageId.forEach( ( languageId ) => {
                dbData[ languageId ].project.sort( ( projectA, projectB ) => {
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

        /***
         * Sort student award data
         * receievedYear: int
         */

        if ( this.config.dbTable === 'studentAward' ) {
            LanguageUtils.supportedLanguageId.forEach( ( languageId ) => {
                dbData[ languageId ].studentAward.sort( ( awardA, awardB ) => {
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

        /***
         * Sort technology transfer, education and experience data
         * from: int ( year )
         */

        if ( this.config.dbTable === 'technologyTransfer' ||
            this.config.dbTable === 'education' ||
            this.config.dbTable === 'experience' ) {
            LanguageUtils.supportedLanguageId.forEach( ( languageId ) => {
                dbData[ languageId ][ this.config.dbTable ].sort( ( tempA, tempB ) => {
                    if ( tempA.from === null || tempB.from === null )
                        return 0;
                    return tempB.from - tempA.from;
                } );
            } );
        }
        return dbData;
    }

    /***
     * Put information in database to the block
     */

    async setBlock ( dbData ) {
        try {
            this.DOM.block.innerHTML = '';
            const data = await this.sortData( dbData );
            let currentYear = new Date().getFullYear();

            /***
             * Get the current state to classify data
             */

            let tempRefereed = true;
            let tempInternational = true;
            let tempCategory = 0;

            /***
             * Render data in oder
             */

            data[ this.config.languageId ][ this.config.dbTable ].forEach( async ( dataItem, index ) => {
                /***
                 * Item use to initia
                 */

                const content = [];
                const subtitle = [];
                const deleteDescription = [];
                let dbTableId = dataItem[ `${ this.config.dbTable }Id` ];
                switch ( this.config.dbTable ) {
                    case 'education':
                        // Abbreviation of degree
                        const degree = degreeUtils.i18n[ this.config.languageId ][ degreeUtils.map[ dataItem.degree ] ];

                        deleteDescription.push( `${ dataItem.school } ${ dataItem.major } ${ degree }` );

                        /***
                         * Id:  item id of its database table
                         * res: item info in the database
                         * nation: abbreviation of nation
                         * degree: abbreviation of degree
                         */

                        await this.renderBlock( {
                            id:      dbTableId,
                            res:     dataItem,
                            nation:  nationUtils.map[ dataItem.nation ],
                            degree,
                        } );
                        break;

                    case 'experience':
                        /***
                         * Create description let user review when click delete button
                         */

                        let deleteContent = '';
                        deleteContent += `${ dataItem.organization }`;
                        deleteContent += ( dataItem.department !== null ) ? ` ${ dataItem.department }` : '';
                        deleteContent += ( dataItem.title !== null ) ? ` ${ dataItem.title }` : '';
                        deleteDescription.push( deleteContent );

                        /***
                         * Id: item id of its database table
                         * res: item info in the database
                         */

                        await this.renderBlock( {
                            id:       dbTableId,
                            res:      dataItem,
                        } );
                        break;

                    case 'award':
                        content.push( dataItem.award );
                        deleteDescription.push( dataItem.award );

                        /***
                         * Set subtitle of year
                         * if receieveYear is not equle to current status year or
                         * it is the first item.
                         */

                        if ( dataItem.receivedYear !== currentYear || index === 0 ) {
                            subtitle.push( dataItem.receivedYear );
                            currentYear = dataItem.receivedYear;
                        }

                        /***
                         * Id: item id of its database
                         * content: array of string, it is award name here
                         * subtitle: array of string, receievedYear of the award
                         */

                        await this.renderBlock( {
                            id:       dbTableId,
                            content,
                            subtitle,
                        } );
                        break;

                    case 'conference':
                        content.push( dataItem.conference );
                        deleteDescription.push( dataItem.conference );

                        /***
                         * Set subtitle of hostYear
                         * if hostYear is not equle to current status year or
                         * it is the first item.
                         */

                        if ( dataItem.hostYear !== currentYear || index === 0 ) {
                            subtitle.push( dataItem.hostYear );
                            currentYear = dataItem.hostYear;
                        }

                        /***
                         * Id: item id of its database
                         * content: array of string, it is conference name here
                         * subtitle: array of string, receievedYear of the award
                         */

                        await this.renderBlock( {
                            id:       dbTableId,
                            content,
                            subtitle,
                        } );
                        break;

                    case 'title':
                        content.push( dataItem.title );
                        deleteDescription.push( dataItem.title );

                        /***
                         * Id: item id of its database
                         * content: array of string, it is title name here
                         * subtitle: array of string, it is empty array here
                         */

                        await this.renderBlock( {
                            id:       dbTableId,
                            content,
                            subtitle,
                        } );

                        break;

                    case 'specialty':
                        content.push( dataItem.specialty );
                        deleteDescription.push( dataItem.specialty );

                        /***
                         * Id: item id of its database
                         * content: array of string, it is specialty name here
                         * subtitle: array of string, it is empty array here
                         */

                        await this.renderBlock( {
                            id:       dbTableId,
                            content,
                            subtitle,
                        } );
                        break;

                    case 'publication':
                        content.push( dataItem.title );
                        content.push( ` ${ dataItem.authors }` );
                        deleteDescription.push( dataItem.title );
                        let temp = '';

                        /***
                         * Set subtitle of Refereed, category, international
                         * if refereed is not equle to current status Refereed or
                         * category is not equle to current status category or
                         * international is not equle to  current status international or
                         * it is the first item.
                         */

                        if (
                            dataItem.refereed !== tempRefereed ||
                            dataItem.category !== tempCategory ||
                            dataItem.international !== tempInternational ||
                            index === 0 ) {
                            const categoryAbbreviation = publicationCategoryUtils.map[ dataItem.category ];
                            const category = publicationCategoryUtils.i18n[ this.config.languageId ][ categoryAbbreviation ];
                            const i18n = {
                                [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
                                    international: 'international ',
                                    reffereed:     'REFFEREED ',
                                },
                                [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
                                    international: '國際',
                                    reffereed:     '被引用',
                                },
                            };
                            tempRefereed = dataItem.refereed;
                            tempCategory = dataItem.category;
                            tempInternational = dataItem.international;
                            temp = '';
                            if ( dataItem.refereed )
                                temp += i18n[ this.config.languageId ].reffereed;
                            if ( dataItem.refereed && this.config.languageId === LanguageUtils.getLanguageId( 'zh-TW' ) ) {
                                if ( dataItem.international )
                                    temp += i18n[ this.config.languageId ].international;
                            }
                            temp += category;
                            subtitle.push( temp );
                        }

                        /***
                         * Set subtitle of Refereed, category, international
                         * if issueYear is not equal to current status year of
                         * it is the first item.
                         */

                        if ( dataItem.issueYear !== currentYear || index === 0 ) {
                            subtitle.push( dataItem.issueYear );
                            currentYear = dataItem.issueYear;
                        }

                        /***
                         * Id: item id of its database
                         * content: array of string, it is [ title, authors ] here.
                         * subtitle: array of string, it is [ `REFEREED international category`, year ] here
                         */

                        await this.renderBlock( {
                            id:       dbTableId,
                            content,
                            subtitle,
                        } );
                        break;

                    case 'patent':
                        deleteDescription.push( dataItem.patent );

                        /***
                         * At beginning, show title
                         */

                        if ( index === 0 ) {
                            this.renderBlock( {
                                isTitle:     true,
                            } );
                        }

                        /***
                         * Id:     item id of its database table
                         * res:    item info in the database
                         * nation: nation abbreviation
                         */

                        await this.renderBlock( {
                            id:       dbTableId,
                            res:      dataItem,
                            nation:  nationUtils.map[ dataItem.nation ],
                        } );
                        break;

                    case 'project':
                        deleteDescription.push( dataItem.name );

                        /***
                         * At beginning, show title
                         */

                        if ( dataItem.category !== tempCategory || index === 0 ) {
                            const projectAbbreviation =  projectCategoryUtils.map[ dataItem.category ];
                            subtitle.push( projectCategoryUtils.i18n[ this.config.languageId ][ projectAbbreviation ] );
                            tempCategory = dataItem.category;

                            this.renderBlock( {
                                subtitle,
                                isTitle:     true,
                            } );
                        }

                        /***
                         * Id:     item id of its database table
                         * res:    item info in the database
                         */

                        await this.renderBlock( {
                            id:       dbTableId,
                            res:      dataItem,
                        } );
                        break;

                    case 'studentAward':
                        deleteDescription.push( dataItem.award );

                        /***
                         * Set subtitle if index = 0 or receieveYear != current status year
                         */

                        if ( dataItem.receivedYear !== currentYear || index === 0 ) {
                            subtitle.push( dataItem.receivedYear );
                            currentYear = dataItem.receivedYear;
                        }
                        await this.renderBlock( {
                            id:          dataItem.awardId,
                            subtitle,
                            res:         dataItem,
                            degreeI18n:  degreeUtils.i18n[ this.config.languageId ],
                            degreeUtils,
                        } );
                        this.setAddButtonEvent( {
                            dbTable:      'student',
                            dbTableId:    dataItem.awardId,
                            addButtonDOM: this.DOM.block.querySelector( `.content__studentAward > .content__modify--student-${ dataItem.awardId }` ),
                        } );

                        /***
                         * Set subblock of student who receieved the award
                         */

                        if ( ValidateUtils.isValidArray( dataItem.student ) ) {
                            const removeSelector = studentId => ` .word__student > .student__remove-${ studentId } `;
                            const updateSelector = studentId => ` .word__student > .student__modify-${ studentId } `;
                            dataItem.student.forEach( ( student, studentIndex ) => {
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

                        dbTableId = dataItem.awardId;
                        break;

                    case 'technologyTransfer':
                        deleteDescription.push( dataItem.technology );

                        /***
                         * At beginning, set title
                         */

                        if ( index === 0 ) {
                            this.renderBlock( {
                                isTitle:     true,
                            } );
                        }
                        await this.renderBlock( {
                            id:          dataItem.technologyTransferId,
                            res:         dataItem,
                        } );
                        const addSelector = `.content__technologyTransfer > .content__modify--technologyTransfer-${ dataItem.technologyTransferId }`;
                        this.setAddButtonEvent( {
                            dbTable:      'technologyTransferPatent',
                            dbTableId:    dataItem.technologyTransferId,
                            addButtonDOM: this.DOM.block.querySelector( addSelector ),
                        } );

                        /***
                         * Set patent of technology transfer
                         */

                        if ( ValidateUtils.isValidArray( dataItem.technologyTransferPatent ) ) {
                            const removeSelector = patentId => ` .technologyTransfer__patent > .patent__remove-${ patentId } `;
                            const updateSelector = patentId => `  .technologyTransfer__patent > .patent__modify-${ patentId } `;
                            dataItem.technologyTransferPatent.forEach( ( patent, patentIndex ) => {
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
                        console.error( 'no validate table' );
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
                    content:   deleteDescription,
                    dbTable:   this.config.dbTable,
                } );
            } );
        }
        catch ( err ) {
            throw err;
        }
    }

    /***
     * Deal with update data
     * update database
     */

    uploadUpdateData ( dbTableItemId, dbTable ) {
        const editPageDOM = document.getElementById( 'edit-page' );
        const input = editPageDOM.getElementsByTagName( 'input' );

        // Every data not need i18n
        const item = {};

        // Every data need i18n
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
            document.body.removeChild( document.getElementById( 'edit-page' ) );
        } ).catch( ( err ) => {
            document.body.removeChild( document.getElementById( 'edit-page' ) );
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
            document.body.removeChild( document.getElementById( 'edit-page' ) );
        } ).catch( ( err ) => {
            document.body.removeChild( document.getElementById( 'edit-page' ) );
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
            document.body.removeChild( document.getElementById( 'edit-page' ) );
        } ).catch( ( err ) => {
            document.body.removeChild( document.getElementById( 'edit-page' ) );
            this.emptyBlock();
            this.renderLoadingFailed();
            console.error( err );
        } );
    }

    /****
     * Submit Data Validation
     */

    checkSubmitData ( dbTable ) {
        let isValid = true;
        const errorSelector =   '.edit-page__window > .window__form > .form__content > .content__error > .error__message';
        const editPageDOM = document.getElementById( 'edit-page' );
        const errorDOM = editPageDOM.querySelector( errorSelector );
        const input = editPageDOM.getElementsByTagName( 'input' );

        const profileId = this.config.profileId;
        const constraints = validationInfo[ dbTable ];

        Array.from( input ).forEach( ( element ) => {
            if ( constraints[ element.name ].presence.allowEmpty === false || element.value !== '' ) {
                const errors = validate.single( element.value, constraints[ element.name ] );
                if ( errors ) {
                    element.focus();
                    errorDOM.textContent = errors[ 0 ];
                    isValid = false;
                    this.config.profileId = profileId;
                }
            }
        } );

        return isValid;
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
                document.body.removeChild( document.getElementById( 'edit-page' ) );
            } );
            checkDOM.addEventListener( 'click', ( e ) => {
                e.preventDefault();
                const isValid = this.checkSubmitData( opt.dbTable );
                if ( isValid )
                    this.uploadAddData( opt.dbTable, opt.dbTableId );
            } );
        } );
    }

    /***
     * Set information update button event
     * When click update button,
     * open an edit-page.
     */

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
                document.body.removeChild( document.getElementById( 'edit-page' ) );
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
                document.body.removeChild( document.getElementById( 'edit-page' ) );
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
            // Whether there is no data of certain table in database
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
