/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'EXPERIENCES', {
        EXID: {
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
        CINST: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
            defaultValue: '',
        },
        EINST: {
            type: DataTypes.STRING( 200 ),
            allowNull: false,
            defaultValue: '',
        },
        CDEP: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
            defaultValue: '',
        },
        EDEP: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
            defaultValue: '',
        },
        CPOS: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
            defaultValue: '',
        },
        EPOS: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
            defaultValue: '',
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
        tableName: 'EXPERIENCES',
    } );
};
