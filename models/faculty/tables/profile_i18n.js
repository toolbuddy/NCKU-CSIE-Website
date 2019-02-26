/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('profileI18N', {
		profileId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			field: 'profile_id'
		},
		language: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			field: 'language'
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'name'
		},
		officeAddress: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'office_address'
		},
		labName: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'lab_name'
		},
		labAddress: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'lab_address'
		}
	}, {
		tableName: 'profile_i18n',
		timestamps: false
	});
};
