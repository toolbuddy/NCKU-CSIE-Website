/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('conferenceI18N', {
		conferenceId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'conference',
				key: 'conference_id'
			},
			field: 'conference_id'
		},
		language: {
			type: DataTypes.STRING(6),
			allowNull: false,
			defaultValue: 'en-US',
			primaryKey: true,
			field: 'language'
		},
		conference: {
			type: DataTypes.STRING(300),
			allowNull: false,
			field: 'conference'
		}
	}, {
		tableName: 'conference_i18n',
		timestamps: false
	});
};
