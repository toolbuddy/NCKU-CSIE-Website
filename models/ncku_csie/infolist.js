/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'infolist', {
        id: {
            type: DataTypes.INTEGER( 11 ),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: DataTypes.INTEGER( 3 ),
            allowNull: false,
            references: {
                model: 'info_type',
                key: 'id',
            },
        },
        state: {
            type: DataTypes.INTEGER( 3 ),
            allowNull: false,
            references: {
                model: 'state_type',
                key: 'id',
            },
        },
        title: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        en_title: {
            type: DataTypes.STRING( 255 ),
            allowNull: true,
        },
        en_content: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        author: {
            type: DataTypes.INTEGER( 11 ),
            allowNull: false,
            references: {
                model: 'member',
                key: 'id',
            },
        },
        udate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        hasimage: {
            type: DataTypes.INTEGER( 1 ),
            allowNull: false,
            defaultValue: '0',
        },
        isshowhome: {
            type: DataTypes.INTEGER( 1 ),
            allowNull: false,
            defaultValue: '0',
        },
        link: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        isshow: {
            type: DataTypes.INTEGER( 1 ),
            allowNull: false,
            defaultValue: '1',
        },
    }, {
        tableName: 'infolist',
    } );
};
