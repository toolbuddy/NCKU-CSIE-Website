/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('specialty', {
		specialtyId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'specialty_id'
		},
		profileId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'profile',
				key: 'profile_id'
			},
			field: 'profile_id'
		},
		language: {
			type: DataTypes.STRING(6),
			allowNull: false,
			defaultValue: 'zh-TW',
			primaryKey: true,
			field: 'language'
		},
		specialty: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'specialty'
		}
	}, {
		tableName: 'specialty',
		timestamps: false
	});
};
