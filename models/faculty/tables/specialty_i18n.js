/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('specialty_i18n', {
		specialtyId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			unique: true,
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
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			field: 'language'
		},
		specialty: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'specialty'
		}
	}, {
		tableName: 'specialty_i18n',
		timestamps: false
	});
};
