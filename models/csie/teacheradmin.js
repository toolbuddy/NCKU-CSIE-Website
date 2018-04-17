/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'teacheradmin', {
        uname: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
            defaultValue: '',
        },
        password: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
            defaultValue: '',
        },
    }, {
        tableName: 'teacheradmin',
    } );
};
