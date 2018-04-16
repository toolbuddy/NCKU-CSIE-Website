/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'member_type', {
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
        rights: {
            type: DataTypes.INTEGER( 3 ),
            allowNull: false,
        },
        pageright: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
            defaultValue: '0@@0@@0@@0@@0@@0',
        },
    }, {
        tableName: 'member_type',
    } );
};
