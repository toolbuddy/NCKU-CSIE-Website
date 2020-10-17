const tables = require('./associations.js');
const { faculty, } = require('../../common/utils/connect.js');

const validate = require('validate.js');
const validateUtils = require('../../common/utils/validate.js');
const languageUtils = require('../../common/utils/language.js');

const AwardValidationConstraints = require('../constraints/update/award.js');
const AwardI18nValidationConstraints = require('../constraints/update/award-i18n.js');
const ConferenceValidationConstraints = require('../constraints/update/conference.js');
const ConferenceI18nValidationConstraints = require('../constraints/update/conference-i18n.js');
const EducationValidationConstraints = require('../constraints/update/education.js');
const EducationI18nValidationConstraints = require('../constraints/update/education-i18n.js');
const ExperienceValidationConstraints = require('../constraints/update/experience.js');
const ExperienceI18nValidationConstraints = require('../constraints/update/experience-i18n.js');
const PatentValidationConstraints = require('../constraints/update/patent.js');
const PatentI18nValidationConstraints = require('../constraints/update/patent-i18n.js');
const ProfileValidationConstraints = require('../constraints/update/profile.js');
const ProfileI18nValidationConstraints = require('../constraints/update/profile-i18n.js');
const ProjectValidationConstraints = require('../constraints/update/project.js');
const ProjectI18nValidationConstraints = require('../constraints/update/project-i18n.js');
const PublicationValidationConstraints = require('../constraints/update/publication.js');
const PublicationI18nValidationConstraints = require('../constraints/update/publication-i18n.js');
const SpecialtyValidationConstraints = require('../constraints/update/specialty.js');
const SpecialtyI18nValidationConstraints = require('../constraints/update/specialty-i18n.js');
const StudentValidationConstraints = require('../constraints/update/student.js');
const StudentI18nValidationConstraints = require('../constraints/update/student-i18n.js');
const StudentAwardValidationConstraints = require('../constraints/update/student-award.js');
const StudentAwardI18nValidationConstraints = require('../constraints/update/student-award-i18n.js');
const TechnologyTransferValidationConstraints = require('../constraints/update/technology-transfer.js');
const TechnologyTransferI18nValidationConstraints = require('../constraints/update/technology-transfer-i18n.js');
const TechnologyTransferPatentValidationConstraints = require('../constraints/update/technology-transfer-patent.js');
const TechnologyTransferPatentI18nValidationConstraints = require('../constraints/update/technology-transfer-patent-i18n.js');
const TitleValidationConstraints = require('../constraints/update/title.js');
const TitleI18nValidationConstraints = require('../constraints/update/title-i18n.js');

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

module.exports = async ( opt ) => {
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
        if ( !validateUtils.isPositiveInteger( opt.profileId ) ) {
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
        if ( opt.i18n.length > 0 ) {
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
        )
        .then( () => {
            if ( Object.keys( opt.item ).length > 0 ) {
                return tables[ dbTable ].update( opt.item, {
                    where: {
                        [ `${ opt.dbTable }Id` ]: opt.dbTableItemId,
                    },
                    transaction: t,
                } );
            }
        } ) )
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
