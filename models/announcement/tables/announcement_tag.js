/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('announcementTag', {
		tagId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'tag',
				key: 'tag_id'
			},
			field: 'tag_id'
		},
		announcementId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'announcement',
				key: 'announcement_id'
			},
			field: 'announcement_id'
		}
	}, {
		tableName: 'announcement_tag',
		timestamps: false
	});
};
