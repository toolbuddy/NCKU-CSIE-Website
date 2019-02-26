/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('awardI18N', {
		awardId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'award',
				key: 'award_id'
			},
			field: 'award_id'
		},
		language: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			field: 'language'
		},
		award: {
			type: DataTypes.STRING(300),
			allowNull: false,
			field: 'award'
		}
	}, {
		tableName: 'award_i18n',
		timestamps: false
	});
};
