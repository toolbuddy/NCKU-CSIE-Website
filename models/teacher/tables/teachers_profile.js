/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('teachersProfile', {
		name: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'name'
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'title'
		},
		department: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'department'
		},
		address: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'address'
		},
		personalWeb: {
			type: DataTypes.STRING(2083),
			allowNull: true,
			field: 'personal_web'
		},
		email: {
			type: DataTypes.STRING(2083),
			allowNull: true,
			field: 'email'
		},
		tel: {
			type: DataTypes.STRING(30),
			allowNull: true,
			defaultValue: '06-2757575 ext 62500',
			field: 'tel'
		},
		photo: {
			type: DataTypes.STRING(2083),
			allowNull: true,
			field: 'photo'
		}
	}, {
		tableName: 'teachers_profile',
		timestamps: false
	});
};
