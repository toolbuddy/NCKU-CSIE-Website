const Sequelize = require('sequelize');
const { collectFormValues } = require('validate.js');
const {announcement} = require('../../common/utils/connect.js');

const News = announcement.define('news', {
    newsId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    author: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    title: {
        type: Sequelize.STRING(300),
        allowNull: false,
    },
    image: {
        type: Sequelize.BLOB('medium'),
        allowNull: true,
        get () {
            if (this.getDataValue('image'))
                return this.getDataValue('image').toString('base64');
            return null;
        },
    },
    url: {
        type: Sequelize.STRING(2083),
        allowNull: true,
    },
}, {
    timestamps: true,
    createdAt: 'publishTime',
    updatedAt: false,
});

module.exports = News;
