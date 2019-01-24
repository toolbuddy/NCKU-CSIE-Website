/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('technologyTransferPatentI18N', {
		technologyTransferId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'technology_transfer_i18n',
				key: 'technology_transfer_id'
			},
			field: 'technology_transfer_id'
		},
		language: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			field: 'language'
		},
		patent: {
			type: DataTypes.STRING(300),
			allowNull: false,
			field: 'patent'
		}
	}, {
		tableName: 'technology_transfer_patent_i18n',
		timestamps: false
	});
};
