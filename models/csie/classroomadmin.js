/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'classroomadmin', {
        uname: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
            defaultValue: '',
        },
        pw: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
            defaultValue: '',
        },
    }, {
        tableName: 'classroomadmin',
    } );
};
