/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'state_type', {
        id: {
            type: DataTypes.INTEGER( 3 ),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        en_name: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        class: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
        },
    }, {
        tableName: 'state_type',
    } );
};
