import Announcement from 'models/announcement/schemas/announcement.js';
import AnnouncementI18n from 'models/announcement/schemas/announcement-i18n.js';
import File from 'models/announcement/schemas/file.js';
import Tag from 'models/announcement/schemas/tag.js';

Announcement.hasMany( AnnouncementI18n, {
    as:         'announcementI18n',
    foreignKey: 'announcementId',
    sourceKey:  'announcementId',
} );

Announcement.hasMany( Tag, {
    as:         'tags',
    foreignKey: 'announcementId',
    sourceKey:  'announcementId',
} );

Announcement.hasMany( File, {
    as:         'files',
    foreignKey: 'announcementId',
    sourceKey:  'announcementId',
} );

export {
    Announcement,
    AnnouncementI18n,
    File,
    Tag,
};

export default {
    Announcement,
    AnnouncementI18n,
    File,
    Tag,
};
