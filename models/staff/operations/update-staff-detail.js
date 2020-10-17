const tables = require('./associations.js');
const { staff, } = require('../../common/utils/connect.js');

const validate = require('validate.js');
const validateUtils = require('../../common/utils/validate.js');
const languageUtils = require('../../common/utils/language.js');

const BusinessValidationConstraints = require('../constraints/update/business.js');
const BusinessI18nValidationConstraints = require('../constraints/update/business-i18n.js');
const ProfileValidationConstraints = require('../../faculty/constraints/update/profile.js');
const ProfileI18nValidationConstraints = require('../../faculty/constraints/update/profile-i18n.js');
const TitleValidationConstraints = require('../../faculty/constraints/update/title.js');
const TitleI18nValidationConstraints = require('../../faculty/constraints/update/title-i18n.js');

const validationConstraints = {
    Business:     BusinessValidationConstraints,
    BusinessI18n: BusinessI18nValidationConstraints,
    Profile:      ProfileValidationConstraints,
    ProfileI18n:  ProfileI18nValidationConstraints,
    Title:        TitleValidationConstraints,
    TitleI18n:    TitleI18nValidationConstraints,
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
        return staff.transaction( t => Promise.all(
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
