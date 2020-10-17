const Sequelize = require('sequelize');
const { staff, } = require('../../common/utils/connect.js');

const Profile = staff.define( 'profile', {
    profileId: {
        type:          Sequelize.INTEGER.UNSIGNED,
        allowNull:     false,
        primaryKey:    true,
        autoIncrement: true,
    },
    email: {
        type:      Sequelize.STRING( 2083 ),
        allowNull: true,
    },
    photo: {
        type:      'MEDIUMBLOB',
        allowNull: true,
        get () {
            if ( !this.getDataValue( 'photo' ) )
                return '';

            return Buffer.from( this.getDataValue( 'photo' ) ).toString( 'base64' );
        },
    },
    officeTel: {
        type:         Sequelize.STRING( 30 ),
        allowNull:    false,
        defaultValue: '06-2757575,62500',
    },
    order: {
        type:         Sequelize.SMALLINT.UNSIGNED,
        allowNull:    false,
        defaultValue: 1,
    },
} );

module.exports = Profile;
