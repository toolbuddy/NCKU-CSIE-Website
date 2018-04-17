/* jshint indent: 2 */

module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define( 'TEACHERS', {
        ID: {
            type: DataTypes.INTEGER( 2 ).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        CNAME: {
            type: DataTypes.STRING( 30 ),
            allowNull: false,
            defaultValue: '',
        },
        ENAME: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
            defaultValue: '',
        },
        CTITLE: {
            type: DataTypes.STRING( 100 ),
            allowNull: true,
        },
        CTITLE_old: {
            type: DataTypes.STRING( 100 ),
            allowNull: true,
        },
        ETITLE: {
            type: DataTypes.STRING( 100 ),
            allowNull: true,
        },
        TEL: {
            type: DataTypes.STRING( 30 ),
            allowNull: false,
            defaultValue: '',
        },
        FAX: {
            type: DataTypes.STRING( 30 ),
            allowNull: false,
            defaultValue: '2747076',
        },
        EMAIL: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
            defaultValue: '',
        },
        LAB: {
            type: DataTypes.INTEGER( 2 ),
            allowNull: false,
            defaultValue: '0',
        },
        AA: {
            type: DataTypes.INTEGER( 2 ).UNSIGNED,
            allowNull: false,
            defaultValue: '0',
        },
        BB: {
            type: DataTypes.INTEGER( 2 ).UNSIGNED,
            allowNull: false,
            defaultValue: '0',
        },
        CC: {
            type: DataTypes.INTEGER( 2 ).UNSIGNED,
            allowNull: false,
            defaultValue: '0',
        },
        DD: {
            type: DataTypes.INTEGER( 2 ).UNSIGNED,
            allowNull: false,
            defaultValue: '0',
        },
        EE: {
            type: DataTypes.INTEGER( 2 ).UNSIGNED,
            allowNull: false,
            defaultValue: '0',
        },
        FF: {
            type: DataTypes.INTEGER( 2 ).UNSIGNED,
            allowNull: false,
            defaultValue: '0',
        },
        GG: {
            type: DataTypes.INTEGER( 2 ).UNSIGNED,
            allowNull: false,
            defaultValue: '0',
        },
        username: {
            type: DataTypes.STRING( 20 ),
            allowNull: false,
            defaultValue: '',
        },
        password: {
            type: DataTypes.STRING( 20 ),
            allowNull: false,
            defaultValue: 'csie',
        },
        Personal_Website: {
            type: DataTypes.STRING( 100 ),
            allowNull: true,
        },
        position: {
            type: DataTypes.INTEGER( 11 ),
            allowNull: false,
            defaultValue: '0',
        },
        skype: {
            type: DataTypes.STRING( 255 ),
            allowNull: true,
        },
        imi: {
            type: DataTypes.CHAR( 1 ),
            allowNull: false,
            defaultValue: '0',
        },
        imi_position: {
            type: DataTypes.INTEGER( 4 ),
            allowNull: false,
            defaultValue: '0',
        },
        SHOW_TT: {
            type: DataTypes.INTEGER( 1 ),
            allowNull: false,
            defaultValue: '0',
        },
        office_no: {
            type: DataTypes.STRING( 30 ),
            allowNull: true,
        },
        E_office_no: {
            type: DataTypes.STRING( 60 ),
            allowNull: true,
        },
        lab_no: {
            type: DataTypes.STRING( 30 ),
            allowNull: false,
        },
        E_lab_no: {
            type: DataTypes.STRING( 60 ),
            allowNull: true,
        },
        C_department: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        E_department: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        depmember: {
            type: DataTypes.STRING( 255 ),
            allowNull: true,
        },
    }, {
        tableName: 'TEACHERS',
        timestamps: false,
    } );
};
