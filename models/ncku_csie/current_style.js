/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'current_style', {
        id: {
            type: DataTypes.INTEGER( 11 ),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
        },
        useid: {
            type: DataTypes.INTEGER( 11 ),
            allowNull: false,
            references: {
                model: 'style_item',
                key: 'id',
            },
        },
        israndom: {
            type: DataTypes.INTEGER( 1 ),
            allowNull: false,
            defaultValue: '0',
        },
    }, {
        tableName: 'current_style',
    } );
};
