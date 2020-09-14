import tables from 'models/faculty/operations/associations.js';

import validate from 'validate.js';
import validateUtils from 'models/common/utils/validate.js';
import languageUtils from 'models/common/utils/language.js';

import AwardValidationConstraints from 'models/faculty/constraints/add/award.js';
import AwardI18nValidationConstraints from 'models/faculty/constraints/add/award-i18n.js';
import ConferenceValidationConstraints from 'models/faculty/constraints/add/conference.js';
import ConferenceI18nValidationConstraints from 'models/faculty/constraints/add/conference-i18n.js';
import DepartmentValidationConstraints from 'models/faculty/constraints/add/department.js';
import EducationValidationConstraints from 'models/faculty/constraints/add/education.js';
import EducationI18nValidationConstraints from 'models/faculty/constraints/add/education-i18n.js';
import ExperienceValidationConstraints from 'models/faculty/constraints/add/experience.js';
import ExperienceI18nValidationConstraints from 'models/faculty/constraints/add/experience-i18n.js';
import PatentValidationConstraints from 'models/faculty/constraints/add/patent.js';
import PatentI18nValidationConstraints from 'models/faculty/constraints/add/patent-i18n.js';
import ProjectValidationConstraints from 'models/faculty/constraints/add/project.js';
import ProjectI18nValidationConstraints from 'models/faculty/constraints/add/project-i18n.js';
import PublicationValidationConstraints from 'models/faculty/constraints/add/publication.js';
import PublicationI18nValidationConstraints from 'models/faculty/constraints/add/publication-i18n.js';
import ResearchGroupValidationConstraints from 'models/faculty/constraints/add/research-group.js';
import SpecialtyValidationConstraints from 'models/faculty/constraints/add/specialty.js';
import SpecialtyI18nValidationConstraints from 'models/faculty/constraints/add/specialty-i18n.js';
import StudentValidationConstraints from 'models/faculty/constraints/add/student.js';
import StudentI18nValidationConstraints from 'models/faculty/constraints/add/student-i18n.js';
import StudentAwardValidationConstraints from 'models/faculty/constraints/add/student-award.js';
import StudentAwardI18nValidationConstraints from 'models/faculty/constraints/add/student-award-i18n.js';
import TechnologyTransferValidationConstraints from 'models/faculty/constraints/add/technology-transfer.js';
import TechnologyTransferI18nValidationConstraints from 'models/faculty/constraints/add/technology-transfer-i18n.js';
import TechnologyTransferPatentValidationConstraints from 'models/faculty/constraints/add/technology-transfer-patent.js';
import TechnologyTransferPatentI18nValidationConstraints from 'models/faculty/constraints/add/technology-transfer-patent-i18n.js';
import TitleValidationConstraints from 'models/faculty/constraints/add/title.js';
import TitleI18nValidationConstraints from 'models/faculty/constraints/add/title-i18n.js';

const validationConstraints = {
    Award:                        AwardValidationConstraints,
    AwardI18n:                    AwardI18nValidationConstraints,
    Conference:                   ConferenceValidationConstraints,
    ConferenceI18n:               ConferenceI18nValidationConstraints,
    Department:                   DepartmentValidationConstraints,
    Education:                    EducationValidationConstraints,
    EducationI18n:                EducationI18nValidationConstraints,
    Experience:                   ExperienceValidationConstraints,
    ExperienceI18n:               ExperienceI18nValidationConstraints,
    Patent:                       PatentValidationConstraints,
    PatentI18n:                   PatentI18nValidationConstraints,
    Project:                      ProjectValidationConstraints,
    ProjectI18n:                  ProjectI18nValidationConstraints,
    Publication:                  PublicationValidationConstraints,
    PublicationI18n:              PublicationI18nValidationConstraints,
    ResearchGroup:                ResearchGroupValidationConstraints,
    Specialty:                    SpecialtyValidationConstraints,
    SpecialtyI18n:                SpecialtyI18nValidationConstraints,
    Student:                      StudentValidationConstraints,
    StudentI18n:                  StudentI18nValidationConstraints,
    StudentAward:                 StudentAwardValidationConstraints,
    StudentAwardI18n:             StudentAwardI18nValidationConstraints,
    TechnologyTransfer:           TechnologyTransferValidationConstraints,
    TechnologyTransferI18n:       TechnologyTransferI18nValidationConstraints,
    TechnologyTransferPatent:     TechnologyTransferPatentValidationConstraints,
    TechnologyTransferPatentI18n: TechnologyTransferPatentI18nValidationConstraints,
    Title:                        TitleValidationConstraints,
    TitleI18n:                    TitleI18nValidationConstraints,
};

function sortByValue ( a, b ) {
    return a - b;
}

function equalArray ( a, b ) {
    if ( a === b )
        return true;
    if ( a == null || b == null )
        return false;
    if ( a.length !== b.length )
        return false;
    for ( let i = 0; i < a.length; ++i ) {
        if ( a[ i ] !== b[ i ] )
            return false;
    }

    return true;
}

export default async ( opt ) => {
    try {
        opt = opt || {};
        let dbTable = null;

        // Turn first letter of table name to uppercase
        // TODO: check if a valid table name?
        if ( typeof opt.dbTable === typeof '' )
            dbTable = opt.dbTable[ 0 ].toUpperCase() + opt.dbTable.substr( 1 );
        else {
            const error = new Error( 'Invalid table name' );
            error.status = 400;
            throw error;
        }

        // Check if profileId is valid
        if ( !validateUtils.isValidId( opt.data.profileId ) ) {
            const error = new Error( 'Invalid profile id' );
            error.status = 400;
            throw error;
        }

        // Check if data follow the validation constraint
        if ( typeof ( validate( opt.data, validationConstraints[ dbTable ] ) ) !== 'undefined' ) {
            const error = new Error( `Invalid ${ dbTable } object` );
            error.status = 400;
            throw error;
        }

        if ( opt.data[ `${ opt.dbTable }I18n` ] ) {
            const langArr = [];
            for ( const i18nData of opt.data[ `${ opt.dbTable }I18n` ] ) {
                if ( typeof ( validate( i18nData, validationConstraints[ `${ dbTable }I18n` ] ) ) !== 'undefined' ) {
                    const error = new Error( `Invalid ${ dbTable }I18n object` );
                    error.status = 400;
                    throw error;
                }
                langArr.push( i18nData.language );
            }
            if ( !equalArray( langArr.sort( sortByValue ), languageUtils.supportedLanguageId.sort( sortByValue ) ) ) {
                const error = new Error( `Invalid length of ${ dbTable }I18n object` );
                error.status = 400;
                throw error;
            }
        }

        // Insert data
        return tables[ dbTable ].create(
            opt.data,
            opt.data[ `${ opt.dbTable }I18n` ] ?
                {
                    include: [ {
                        model: tables[ `${ dbTable }I18n` ],
                        as:    `${ opt.dbTable }I18n`,
                    }, ],
                } :
                null
        )
        .then( () => ( { 'message': 'success', } ) )
        .catch( ( err ) => {
            throw err;
        } );
    }
    catch ( err ) {
        console.error( err );
        throw err;
    }
};
