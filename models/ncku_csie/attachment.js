/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'attachment', {
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
        filestype: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
        },
        udate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        files: {
            type: 'LONGBLOB',
            allowNull: true,
        },
    }, {
        tableName: 'attachment',
    } );
};
