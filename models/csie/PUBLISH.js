/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'PUBLISH', {
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
        AUTHOR: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        TITLE: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        SOURCE: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        DATE: {
            type: DataTypes.STRING( 30 ),
            allowNull: false,
            defaultValue: '',
        },
        PLAN: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        CITATIONS: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        CATE: {
            type: DataTypes.INTEGER( 1 ).UNSIGNED,
            allowNull: false,
            defaultValue: '0',
        },
    }, {
        tableName: 'PUBLISH',
    } );
};
