/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('technologyTransferI18N', {
		technologyTransferId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'technology_transfer',
				key: 'technology_transfer_id'
			},
			field: 'technology_transfer_id'
		},
		language: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			field: 'language'
		},
		patent: {
			type: DataTypes.STRING(300),
			allowNull: false,
			field: 'patent'
		},
		technology: {
			type: DataTypes.STRING(300),
			allowNull: false,
			field: 'technology'
		},
		authorizingParty: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'authorizing_party'
		},
		authorizedParty: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'authorized_party'
		}
	}, {
		tableName: 'technology_transfer_i18n',
		timestamps: false
	});
};
