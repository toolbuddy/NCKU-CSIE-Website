import Sequelize from 'sequelize';
import { announcement, } from 'models/common/utils/connect.js';
import tagUtils from 'models/announcement/utils/tag.js';

const Tag = announcement.define( 'tag', {
    announcementId: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
        primaryKey: true,
    },
    tagId: {
        type:         Sequelize.INTEGER.UNSIGNED,
        allowNull:    false,
        defaultValue: tagUtils.defaultId,
        primaryKey:   true,
    },
} );

export default Tag;
