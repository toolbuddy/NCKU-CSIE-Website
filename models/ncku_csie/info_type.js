/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'info_type', {
        id: {
            type: DataTypes.INTEGER( 3 ),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        lang: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        en_name: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING( 255 ),
            allowNull: true,
        },
    }, {
        tableName: 'info_type',
    } );
};
