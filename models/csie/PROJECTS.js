/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'PROJECTS', {
        PID: {
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
            type: DataTypes.TEXT,
            allowNull: false,
        },
        CSUPPORT: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
            defaultValue: '',
        },
        ESUPPORT: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
            defaultValue: '',
        },
        SDATE: {
            type: 'YEAR(4)',
            allowNull: false,
            defaultValue: '0000',
        },
        EDATE: {
            type: 'YEAR(4)',
            allowNull: true,
        },
        CATE: {
            type: DataTypes.INTEGER( 1 ),
            allowNull: false,
            defaultValue: '0',
        },
    }, {
        tableName: 'PROJECTS',
    } );
};
