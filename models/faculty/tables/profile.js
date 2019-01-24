/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('profile', {
		profileId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			unique: true,
			autoIncrement: true,
			field: 'profile_id'
		},
		fax: {
			type: DataTypes.STRING(20),
			allowNull: true,
			defaultValue: '2747076',
			field: 'fax'
		},
		email: {
			type: DataTypes.STRING(2083),
			allowNull: true,
			field: 'email'
		},
		officeTel: {
			type: DataTypes.STRING(30),
			allowNull: true,
			defaultValue: '06-2757575,62500',
			field: 'office_tel'
		},
		labTel: {
			type: DataTypes.STRING(30),
			allowNull: true,
			defaultValue: '06-2757575,62500',
			field: 'lab_tel'
		},
		labWeb: {
			type: DataTypes.STRING(2083),
			allowNull: true,
			field: 'lab_web'
		},
		personalWeb: {
			type: DataTypes.STRING(2083),
			allowNull: true,
			field: 'personal_web'
		},
		nation: {
			type: DataTypes.CHAR(2),
			allowNull: true,
			defaultValue: 'TW',
			field: 'nation'
		},
		photo: {
			type: DataTypes.STRING(2083),
			allowNull: true,
			field: 'photo'
		},
	}, {
		tableName: 'profile',
		timestamps: false
	});
};
