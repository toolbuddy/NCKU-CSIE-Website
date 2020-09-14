import tables from 'models/faculty/operations/associations.js';
import { faculty, } from 'models/common/utils/connect.js';

import validate from 'validate.js';
import validateUtils from 'models/common/utils/validate.js';
import languageUtils from 'models/common/utils/language.js';

import AwardValidationConstraints from 'models/faculty/constraints/update/award.js';
import AwardI18nValidationConstraints from 'models/faculty/constraints/update/award-i18n.js';
import ConferenceValidationConstraints from 'models/faculty/constraints/update/conference.js';
import ConferenceI18nValidationConstraints from 'models/faculty/constraints/update/conference-i18n.js';
import EducationValidationConstraints from 'models/faculty/constraints/update/education.js';
import EducationI18nValidationConstraints from 'models/faculty/constraints/update/education-i18n.js';
import ExperienceValidationConstraints from 'models/faculty/constraints/update/experience.js';
import ExperienceI18nValidationConstraints from 'models/faculty/constraints/update/experience-i18n.js';
import PatentValidationConstraints from 'models/faculty/constraints/update/patent.js';
import PatentI18nValidationConstraints from 'models/faculty/constraints/update/patent-i18n.js';
import ProfileValidationConstraints from 'models/faculty/constraints/update/profile.js';
import ProfileI18nValidationConstraints from 'models/faculty/constraints/update/profile-i18n.js';
import ProjectValidationConstraints from 'models/faculty/constraints/update/project.js';
import ProjectI18nValidationConstraints from 'models/faculty/constraints/update/project-i18n.js';
import PublicationValidationConstraints from 'models/faculty/constraints/update/publication.js';
import PublicationI18nValidationConstraints from 'models/faculty/constraints/update/publication-i18n.js';
import SpecialtyValidationConstraints from 'models/faculty/constraints/update/specialty.js';
import SpecialtyI18nValidationConstraints from 'models/faculty/constraints/update/specialty-i18n.js';
import StudentValidationConstraints from 'models/faculty/constraints/update/student.js';
import StudentI18nValidationConstraints from 'models/faculty/constraints/update/student-i18n.js';
import StudentAwardValidationConstraints from 'models/faculty/constraints/update/student-award.js';
import StudentAwardI18nValidationConstraints from 'models/faculty/constraints/update/student-award-i18n.js';
import TechnologyTransferValidationConstraints from 'models/faculty/constraints/update/technology-transfer.js';
import TechnologyTransferI18nValidationConstraints from 'models/faculty/constraints/update/technology-transfer-i18n.js';
import TechnologyTransferPatentValidationConstraints from 'models/faculty/constraints/update/technology-transfer-patent.js';
import TechnologyTransferPatentI18nValidationConstraints from 'models/faculty/constraints/update/technology-transfer-patent-i18n.js';
import TitleValidationConstraints from 'models/faculty/constraints/update/title.js';
import TitleI18nValidationConstraints from 'models/faculty/constraints/update/title-i18n.js';

const validationConstraints = {
    Award:                        AwardValidationConstraints,
    AwardI18n:                    AwardI18nValidationConstraints,
    Conference:                   ConferenceValidationConstraints,
    ConferenceI18n:               ConferenceI18nValidationConstraints,
    Education:                    EducationValidationConstraints,
    EducationI18n:                EducationI18nValidationConstraints,
    Experience:                   ExperienceValidationConstraints,
    ExperienceI18n:               ExperienceI18nValidationConstraints,
    Patent:                       PatentValidationConstraints,
    PatentI18n:                   PatentI18nValidationConstraints,
    Profile:                      ProfileValidationConstraints,
    ProfileI18n:                  ProfileI18nValidationConstraints,
    Project:                      ProjectValidationConstraints,
    ProjectI18n:                  ProjectI18nValidationConstraints,
    Publication:                  PublicationValidationConstraints,
    PublicationI18n:              PublicationI18nValidationConstraints,
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
        if ( !validateUtils.isValidId( opt.profileId ) ) {
            const error = new Error( 'Invalid profile id' );
            error.status = 400;
            throw error;
        }

        // Check if dbTableItemId is valid
        if ( !validateUtils.isPositiveInteger( opt.dbTableItemId ) ) {
            const error = new Error( `Invalid ${ dbTable } id` );
            error.status = 400;
            throw error;
        }

        // Check if non-i18n part fit constraints (If nothing to change, it should be empty object)
        if ( typeof ( validate( opt.item, validationConstraints[ dbTable ] ) ) !== 'undefined' ) {
            const error = new Error( `Invalid ${ dbTable } object` );
            error.status = 400;
            throw error;
        }

        // Check if i18n part fit constraints (If nothing to change, it should be empty array)
        const langArr = [];
        for ( const i18nData of opt.i18n ) {
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

        // Update both part in one transaction.
        // Promise all will always resolve empty array, so it's no need to check if array is empty before update.
        // But update with empty object will cause sequelize empty query error, so it should be check.
        return faculty.transaction( t => Promise.all(
            opt.i18n.map( i18nInfo => tables[ `${ dbTable }I18n` ].update( i18nInfo, {
                where: {
                    [ `${ opt.dbTable }Id` ]: opt.dbTableItemId,
                    language:                 i18nInfo.language,
                },
                transaction: t,
            } ) )
            .then( () => {
                if ( Object.keys( opt.item ).length === 0 && opt.item.constructor === Object ) {
                    return tables[ dbTable ].update( opt.item, {
                        where: {
                            [ `${ opt.dbTable }Id` ]: opt.dbTableItemId,
                            profileId:                opt.profileId,
                        },
                        transaction: t,
                    } );
                }
            } )
        ) )
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
