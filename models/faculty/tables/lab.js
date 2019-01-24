/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lab', {
		labId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'lab_id'
		},
		profileId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'profile',
				key: 'profile_id'
			},
			field: 'profile_id'
		},
		tel: {
			type: DataTypes.STRING(30),
			allowNull: true,
			defaultValue: '06-2757575 ext 62500',
			field: 'tel'
		},
		labWeb: {
			type: DataTypes.STRING(2083),
			allowNull: true,
			field: 'lab_web'
		}
	}, {
		tableName: 'lab',
		timestamps: false
	});
};
