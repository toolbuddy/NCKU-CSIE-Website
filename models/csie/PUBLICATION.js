/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'PUBLICATION', {
        PID: {
            type: DataTypes.INTEGER( 10 ).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        ID: {
            type: DataTypes.INTEGER( 2 ),
            allowNull: false,
            defaultValue: '0',
        },
        CNAME: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        ENAME: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        YEAR: {
            type: DataTypes.STRING( 6 ),
            allowNull: true,
            defaultValue: '0000',
        },
        CATE: {
            type: DataTypes.INTEGER( 1 ).UNSIGNED,
            allowNull: false,
            defaultValue: '0',
        },
    }, {
        tableName: 'PUBLICATION',
    } );
};
