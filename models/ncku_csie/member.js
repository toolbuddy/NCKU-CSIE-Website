/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'member', {
        id: {
            type: DataTypes.INTEGER( 11 ),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        account: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
        },
        sid: {
            type: DataTypes.STRING( 20 ),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
        },
        job: {
            type: DataTypes.STRING( 20 ),
            allowNull: false,
        },
        type: {
            type: DataTypes.INTEGER( 3 ),
            allowNull: false,
            references: {
                model: 'member_type',
                key: 'id',
            },
        },
        cdate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        tableName: 'member',
    } );
};
