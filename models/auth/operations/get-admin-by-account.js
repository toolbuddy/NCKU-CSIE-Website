/**
 * A function for getting a specific user's data by his / her account.
 *
 * @param {string} [account] - Account of the user.
 * @returns {object}         - Related information of the user, including:
 * - userId
 * - account
 * - password
 * - role
 * - roleId.
 */

const ValidateUtils = require('models/common/utils/validate.js');
const {Admin} = require('models/auth/operations/associations.js');

module.exports = (account) => {
    try {
        if (!ValidateUtils.isValidString(account)) {
            const error = new Error('Invalid account');
            error.status = 400;
            throw error;
        }

        return Admin.findOne({
            attributes: ['userId', 'account', 'password', 'role', 'roleId'],
            where: {
                account,
            },
        }).
        then((data) => {
            if (!data) {
                const error = new Error('User not found');
                error.status = 404;
                throw error;
            }
            else {
                return {
                    userId: data.userId,
                    account: data.account,
                    password: data.password,
                    role: data.role,
                    roleId: data.roleId,
                };
            }
        });
    }
    catch (error) {
        if (!error.status)
            error.status = 500;
        throw error;
    }
};
