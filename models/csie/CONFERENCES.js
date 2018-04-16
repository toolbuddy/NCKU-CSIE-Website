/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'CONFERENCES', {
        CID: {
            type: DataTypes.INTEGER( 3 ).UNSIGNED,
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
            type: DataTypes.STRING( 200 ),
            allowNull: false,
            defaultValue: '',
        },
        ENAME: {
            type: DataTypes.STRING( 200 ),
            allowNull: false,
            defaultValue: '',
        },
        YEAR: {
            type: DataTypes.STRING( 6 ),
            allowNull: true,
        },
    }, {
        tableName: 'CONFERENCES',
    } );
};
