import Sequelize from 'sequelize';
import { announcement, } from 'models/common/utils/connect.js';
import TagUtils from 'models/announcement/utils/tag.js';

const Tag = announcement.define( 'tag', {
    announcementId: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
        primaryKey: true,
    },
    typeId: {
        type:         Sequelize.INTEGER.UNSIGNED,
        allowNull:    false,
        defaultValue: TagUtils.defaultTagId,
        primaryKey:   true,
    },
} );

export default Tag;
