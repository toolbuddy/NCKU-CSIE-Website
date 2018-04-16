/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'style_item', {
        id: {
            type: DataTypes.INTEGER( 11 ),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
        },
        itemcount: {
            type: DataTypes.INTEGER( 3 ),
            allowNull: false,
        },
        itemright: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
        },
        item1: {
            type: DataTypes.INTEGER( 11 ),
            allowNull: true,
            references: {
                model: 'infolist',
                key: 'id',
            },
        },
        item2: {
            type: DataTypes.INTEGER( 11 ),
            allowNull: true,
            references: {
                model: 'infolist',
                key: 'id',
            },
        },
        item3: {
            type: DataTypes.INTEGER( 11 ),
            allowNull: true,
            references: {
                model: 'infolist',
                key: 'id',
            },
        },
        item4: {
            type: DataTypes.INTEGER( 11 ),
            allowNull: true,
            references: {
                model: 'infolist',
                key: 'id',
            },
        },
        item5: {
            type: DataTypes.INTEGER( 11 ),
            allowNull: true,
            references: {
                model: 'infolist',
                key: 'id',
            },
        },
        item6: {
            type: DataTypes.INTEGER( 11 ),
            allowNull: true,
            references: {
                model: 'infolist',
                key: 'id',
            },
        },
        item7: {
            type: DataTypes.INTEGER( 11 ),
            allowNull: true,
            references: {
                model: 'infolist',
                key: 'id',
            },
        },
    }, {
        tableName: 'style_item',
    } );
};
