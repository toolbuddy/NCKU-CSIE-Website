/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'STUDENTS', {
        ID: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
        TID: {
            type: DataTypes.INTEGER( 2 ),
            allowNull: false,
            defaultValue: '0',
        },
        DEGREE: {
            type: DataTypes.INTEGER( 2 ),
            allowNull: false,
            defaultValue: '0',
        },
        YEAR: {
            type: DataTypes.INTEGER( 2 ),
            allowNull: false,
            defaultValue: '0',
        },
    }, {
        tableName: 'STUDENTS',
    } );
};
