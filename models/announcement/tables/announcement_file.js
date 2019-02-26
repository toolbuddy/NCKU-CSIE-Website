/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('announcementFile', {
		fileId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'file_id'
		},
		announcementId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'announcement',
				key: 'announcement_id'
			},
			field: 'announcement_id'
		},
		type: {
			type: DataTypes.STRING(127),
			allowNull: true,
			field: 'type'
		},
		uploadTime: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'upload_time'
		}
	}, {
		tableName: 'announcement_file',
		timestamps: false
	});
};
