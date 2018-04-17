/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'EDUCATION', {
        EID: {
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
        CSNAME: {
            type: DataTypes.STRING( 30 ),
            allowNull: false,
            defaultValue: '',
        },
        ESNAME: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
            defaultValue: '',
        },
        CCOUNTRY: {
            type: DataTypes.STRING( 30 ),
            allowNull: false,
            defaultValue: '',
        },
        ECOUNTRY: {
            type: DataTypes.STRING( 30 ),
            allowNull: false,
            defaultValue: '',
        },
        CMAJOR: {
            type: DataTypes.STRING( 30 ),
            allowNull: false,
            defaultValue: '',
        },
        EMAJOR: {
            type: DataTypes.STRING( 30 ),
            allowNull: false,
            defaultValue: '',
        },
        DEGREE: {
            type: DataTypes.INTEGER( 1 ),
            allowNull: false,
            defaultValue: '0',
        },
        SDATE: {
            type: 'YEAR(4)',
            allowNull: true,
        },
        EDATE: {
            type: 'YEAR(4)',
            allowNull: true,
        },
    }, {
        tableName: 'EDUCATION',
    } );
};
