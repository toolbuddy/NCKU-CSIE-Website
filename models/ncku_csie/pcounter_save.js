/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'pcounter_save', {
        save_name: {
            type: DataTypes.STRING( 10 ),
            allowNull: false,
        },
        save_value: {
            type: DataTypes.INTEGER( 10 ).UNSIGNED,
            allowNull: false,
        },
    }, {
        tableName: 'pcounter_save',
    } );
};
