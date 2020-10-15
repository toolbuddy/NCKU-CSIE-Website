const tables = require('models/faculty/operations/associations.js');
const validateUtils = require('models/common/utils/validate.js');
const {faculty} = require('models/common/utils/connect.js');

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

        // Check if dbTableItemId or type is valid
        if (
            (dbTable === 'Department' || dbTable === 'ResearchGroup') ?
                !validateUtils.isValidId(opt.type) :
                !validateUtils.isPositiveInteger(opt.dbTableItemId)
        ) {
            const error = new Error(`Invalid ${dbTable} id`);
            error.status = 400;
            throw error;
        }

        // StudentAward need different delete procedure
        if (dbTable === 'StudentAward') {
            return faculty.transaction(t => tables.Student.findAll({
                attributes: ['studentId'],
                where: {
                    studentAwardId: opt.dbTableItemId,
                },
                transaction: t,
            }).
            then(ids => tables.StudentI18n.destroy({
                where: {
                    studentId: ids.map(id => id.studentId),
                },
                transaction: t,
            })).
            then(() => tables.Student.destroy({
                where: {
                    studentAwardId: opt.dbTableItemId,
                },
                transaction: t,
            })).
            then(() => tables.StudentAwardI18n.destroy({
                where: {
                    studentAwardId: opt.dbTableItemId,
                },
                transaction: t,
            })).
            then(() => tables.StudentAward.destroy({
                where: {
                    studentAwardId: opt.dbTableItemId,
                },
                transaction: t,
            }))).
            then(() => ({message: 'success'})).
            catch((err) => {
                throw err;
            });
        }

        // TechnologyTransfer need different delete procedure
        if (dbTable === 'TechnologyTransfer') {
            return faculty.transaction(t => tables.TechnologyTransferPatent.findAll({
                attributes: ['technologyTransferPatentId'],
                where: {
                    technologyTransferId: opt.dbTableItemId,
                },
                transaction: t,
            }).
            then(ids => tables.TechnologyTransferPatentI18n.destroy({
                where: {
                    technologyTransferPatentId: ids.map(id => id.technologyTransferPatentId),
                },
                transaction: t,
            })).
            then(() => tables.TechnologyTransferPatent.destroy({
                where: {
                    technologyTransferId: opt.dbTableItemId,
                },
                transaction: t,
            })).
            then(() => tables.TechnologyTransferI18n.destroy({
                where: {
                    technologyTransferId: opt.dbTableItemId,
                },
                transaction: t,
            })).
            then(() => tables.TechnologyTransfer.destroy({
                where: {
                    technologyTransferId: opt.dbTableItemId,
                },
                transaction: t,
            }))).
            then(() => ({message: 'success'})).
            catch((err) => {
                throw err;
            });
        }

        // Department and ResearchGroup don't need to delete i18n part
        if (dbTable === 'Department' || dbTable === 'ResearchGroup') {
            return tables[dbTable].destroy({
                where: {
                    profileId: opt.profileId,
                    type: opt.type,
                },
            }).
            then(() => ({message: 'success'})).
            catch((err) => {
                throw err;
            });
        }

        return faculty.transaction(t => tables[`${dbTable}I18n`].destroy({
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
