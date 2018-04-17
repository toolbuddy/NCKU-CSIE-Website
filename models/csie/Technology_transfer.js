/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'Technology_transfer', {
        TTID: {
            type: DataTypes.INTEGER( 3 ).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        ID: {
            type: DataTypes.INTEGER( 2 ),
            allowNull: true,
            defaultValue: '0',
        },
        Category: {
            type: DataTypes.STRING( 100 ),
            allowNull: true,
        },
        Technical: {
            type: DataTypes.STRING( 200 ),
            allowNull: true,
        },
        Patent: {
            type: DataTypes.STRING( 500 ),
            allowNull: true,
        },
        Authority: {
            type: DataTypes.STRING( 100 ),
            allowNull: true,
        },
        Receiving: {
            type: DataTypes.STRING( 100 ),
            allowNull: true,
        },
        Period_Time: {
            type: DataTypes.STRING( 100 ),
            allowNull: true,
        },
        NSC_Code: {
            type: DataTypes.STRING( 100 ),
            allowNull: true,
        },
        YEAR: {
            type: DataTypes.STRING( 6 ),
            allowNull: true,
        },
    }, {
        tableName: 'Technology_transfer',
    } );
};
