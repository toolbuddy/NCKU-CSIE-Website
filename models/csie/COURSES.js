/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'COURSES', {
        CID: {
            type: DataTypes.INTEGER( 3 ).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        TID: {
            type: DataTypes.INTEGER( 2 ).UNSIGNED,
            allowNull: false,
            defaultValue: '0',
        },
        CNAME: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
            defaultValue: '',
        },
        ENAME: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
            defaultValue: '',
        },
        CREDIT: {
            type: DataTypes.INTEGER( 1 ).UNSIGNED,
            allowNull: false,
            defaultValue: '3',
        },
        PERIOD: {
            type: DataTypes.INTEGER( 1 ).UNSIGNED,
            allowNull: false,
            defaultValue: '0',
        },
        COBJECT: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        EOBJECT: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        COUTLINE: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        EOUTLINE: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        CREF: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        EREF: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        TYPE: {
            type: DataTypes.INTEGER( 1 ).UNSIGNED,
            allowNull: false,
            defaultValue: '0',
        },
        CPREREQUISITE: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        EPREREQUISITE: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        CGRAD: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        EGRAD: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        CPS: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        EPS: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        URL: {
            type: DataTypes.STRING( 100 ),
            allowNull: true,
            defaultValue: '無',
        },
    }, {
        tableName: 'COURSES',
    } );
};
