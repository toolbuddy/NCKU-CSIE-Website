/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'pcounter_users', {
        user_ip: {
            type: DataTypes.STRING( 39 ),
            allowNull: false,
        },
        user_time: {
            type: DataTypes.INTEGER( 10 ).UNSIGNED,
            allowNull: false,
        },
    }, {
        tableName: 'pcounter_users',
    } );
};
