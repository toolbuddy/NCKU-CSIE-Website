const tables = require('models/staff/operations/associations.js');
const validateUtils = require('models/common/utils/validate.js');
const {staff} = require('models/common/utils/connect.js');

module.exports = async (opt) => {
    try {
        opt = opt || {};
        let dbTable = null;

        // Turn first letter of table name to uppercase
        // TODO: check if a valid table name?
        // TODO: check if going to delete profile?
        if (typeof opt.dbTable === typeof '')
            dbTable = opt.dbTable[0].toUpperCase() + opt.dbTable.substr(1);
        else {
            const error = new Error('Invalid table name');
            error.status = 400;
            throw error;
        }

        // Check if profileId is valid
        if (!validateUtils.isPositiveInteger(opt.profileId)) {
            const error = new Error('Invalid profile id');
            error.status = 400;
            throw error;
        }

        return staff.transaction(t => tables[`${dbTable}I18n`].destroy({
            where: {
                [`${opt.dbTable}Id`]: opt.dbTableItemId,
            },
            transaction: t,
        }).then(() => tables[dbTable].destroy({
            where: {
                [`${opt.dbTable}Id`]: opt.dbTableItemId,
            },
            transaction: t,
        }))).
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
