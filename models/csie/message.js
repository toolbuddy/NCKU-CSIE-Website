/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'message', {
        ID: {
            type: DataTypes.INTEGER( 5 ).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING( 255 ),
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING( 30 ),
            allowNull: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        time: {
            type: DataTypes.STRING( 20 ),
            allowNull: false,
        },
        reply: {
            type: DataTypes.INTEGER( 3 ),
            allowNull: true,
            defaultValue: '0',
        },
        replyID: {
            type: DataTypes.INTEGER( 6 ),
            allowNull: true,
            defaultValue: '0',
        },
    }, {
        tableName: 'message',
    } );
};
