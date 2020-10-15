const Sequelize = require('sequelize');
const {faculty} = require('models/common/utils/connect.js');
const nationUtils = require('models/faculty/utils/nation.js');

const Profile = faculty.define('profile', {
    profileId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    fax: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: '2747076',
    },
    email: {
        type: Sequelize.STRING(2083),
        allowNull: true,
    },
    personalWeb: {
        type: Sequelize.STRING(2083),
        allowNull: true,
    },
    nation: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: nationUtils.defaultId,
    },
    photo: {
        type: 'MEDIUMBLOB',
        allowNull: true,
        get () {
            if (!this.getDataValue('photo'))
                return '';

            return Buffer.from(this.getDataValue('photo')).toString('base64');
        },
    },
    officeTel: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: '06-2757575,62500',
    },
    labTel: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: '06-2757575,62500',
    },
    labWeb: {
        type: Sequelize.STRING(2083),
        allowNull: true,
    },
    order: {
        type: Sequelize.SMALLINT(5),
        allowNull: false,
        defaultValue: 1,
    },
});

module.exports = Profile;
