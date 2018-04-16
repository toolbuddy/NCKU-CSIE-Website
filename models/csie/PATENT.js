/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'PATENT', {
        PAID: {
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
        CNAME: {
            type: DataTypes.STRING( 200 ),
            allowNull: true,
        },
        ENAME: {
            type: DataTypes.STRING( 100 ),
            allowNull: true,
        },
        YEAR: {
            type: DataTypes.STRING( 6 ),
            allowNull: true,
        },
        Category: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        Country: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        Patent_Number: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        Inventor: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        Patentee: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        Patent_time: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        NSC_Code: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
    }, {
        tableName: 'PATENT',
    } );
};
