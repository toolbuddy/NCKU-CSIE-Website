const tables = require('./associations.js');

const validate = require('validate.js');
const validateUtils = require('../../common/utils/validate.js');
const languageUtils = require('../../common/utils/language.js');
const equalArray = require('../../common/utils/equal-array.js');

const BusinessValidationConstraints = require('../constraints/add/business.js');
const BusinessI18nValidationConstraints = require('../constraints/add/business-i18n.js');
const TitleValidationConstraints = require('../../faculty/constraints/add/title.js');
const TitleI18nValidationConstraints = require('../../faculty/constraints/add/title-i18n.js');

const validationConstraints = {
    Business: BusinessValidationConstraints,
    BusinessI18n: BusinessI18nValidationConstraints,
    Title: TitleValidationConstraints,
    TitleI18n: TitleI18nValidationConstraints,
};

module.exports = (opt) => {
    try {
        opt = opt || {};
        let dbTable = null;

        // Turn first letter of table name to uppercase
        // TODO: check if a valid table name?
        // TODO: check if going to create profile?
        if (typeof opt.dbTable === typeof '')
            dbTable = opt.dbTable[0].toUpperCase() + opt.dbTable.substr(1);
        else {
            const error = new Error('Invalid table name');
            error.status = 400;
            throw error;
        }

        // Check if profileId is valid
        if (!validateUtils.isPositiveInteger(opt.data.profileId)) {
            const error = new Error('Invalid profile id');
            error.status = 400;
            throw error;
        }

        // Check if data follow the validation constraint
        if (typeof (validate(opt.data, validationConstraints[dbTable])) !== 'undefined') {
            const error = new Error(`Invalid ${dbTable} object`);
            error.status = 400;
            throw error;
        }

        const langArr = [];
        for (const i18nData of opt.data[`${opt.dbTable}I18n`]) {
            if (typeof (validate(i18nData, validationConstraints[`${dbTable}I18n`])) !== 'undefined') {
                const error = new Error(`Invalid ${dbTable}I18n object`);
                error.status = 400;
                throw error;
            }
            langArr.push(i18nData.language);
        }
        if (!equalArray(langArr.sort((a, b) => a - b), languageUtils.supportedLanguageId.sort((a, b) => a - b))) {
            const error = new Error(`Invalid length of ${dbTable}I18n object`);
            error.status = 400;
            throw error;
        }

        // Insert data
        return tables[dbTable].create(
            opt.data,
            {
                include: [
                    {
                        model: tables[`${dbTable}I18n`],
                        as: `${opt.dbTable}I18n`,
                    },
                ],
            },
        ).
        then(() => ({message: 'success'})).
        catch((err) => {
            throw err;
        });
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};
