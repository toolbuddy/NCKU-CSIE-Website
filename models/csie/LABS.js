/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'LABS', {
        ID: {
            type: DataTypes.INTEGER( 2 ).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        CNAME: {
            type: DataTypes.STRING( 70 ),
            allowNull: true,
        },
        ENAME: {
            type: DataTypes.STRING( 70 ),
            allowNull: true,
        },
        URL: {
            type: DataTypes.STRING( 80 ),
            allowNull: true,
        },
    }, {
        tableName: 'LABS',
    } );
};
