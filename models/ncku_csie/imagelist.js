/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'imagelist', {
        id: {
            type: DataTypes.INTEGER( 11 ),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        rid: {
            type: DataTypes.INTEGER( 11 ),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
        },
        udate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        oimage: {
            type: 'LONGBLOB',
            allowNull: false,
        },
        width: {
            type: DataTypes.INTEGER( 5 ),
            allowNull: false,
        },
        height: {
            type: DataTypes.INTEGER( 5 ),
            allowNull: false,
        },
        rights: {
            type: DataTypes.INTEGER( 3 ),
            allowNull: false,
        },
    }, {
        tableName: 'imagelist',
    } );
};
