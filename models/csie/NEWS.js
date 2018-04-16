/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'NEWS', {
        ID: {
            type: DataTypes.INTEGER( 5 ).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        CATE: {
            type: DataTypes.INTEGER( 10 ).UNSIGNED,
            allowNull: false,
            defaultValue: '1',
        },
        TITLE: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
            defaultValue: '',
        },
        CONTENT: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        RELATEDURL: {
            type: DataTypes.STRING( 100 ),
            allowNull: true,
        },
        DECLARER: {
            type: DataTypes.STRING( 10 ),
            allowNull: true,
        },
        TIME: {
            type: DataTypes.STRING( 20 ),
            allowNull: true,
        },
        APPENT1: {
            type: DataTypes.STRING( 100 ),
            allowNull: true,
        },
        APPENT2: {
            type: DataTypes.STRING( 100 ),
            allowNull: true,
        },
        APPENT3: {
            type: DataTypes.STRING( 100 ),
            allowNull: true,
        },
        APPENT4: {
            type: DataTypes.STRING( 100 ),
            allowNull: true,
        },
        isValid: {
            type: DataTypes.INTEGER( 3 ),
            allowNull: false,
            defaultValue: '1',
        },
        priority: {
            type: DataTypes.INTEGER( 3 ).UNSIGNED,
            allowNull: true,
            defaultValue: '0',
        },
        recruitstudent: {
            type: DataTypes.CHAR( 1 ),
            allowNull: true,
            defaultValue: 'N',
        },
    }, {
        tableName: 'NEWS',
    } );
};
