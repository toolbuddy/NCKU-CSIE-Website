/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'users', {
        id: {
            type: DataTypes.INTEGER( 9 ),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
    }, {
        tableName: 'users',
    } );
};
