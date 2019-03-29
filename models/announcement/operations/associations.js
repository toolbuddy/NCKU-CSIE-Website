import Announcement from 'models/announcement/schemas/announcement.js';
import AnnouncementI18n from 'models/announcement/schemas/announcement-i18n.js';
import File from 'models/announcement/schemas/file.js';
import FileI18n from 'models/announcement/schemas/file-i18n.js';
import Tag from 'models/announcement/schemas/tag.js';

Announcement.hasMany( AnnouncementI18n, {
    as:         'announcementI18n',
    foreignKey: 'announcementId',
    sourceKey:  'announcementId',
} );

File.hasMany( FileI18n, {
    as:         'fileI18n',
    foreignKey: 'fileId',
    sourceKey:  'fileId',
} );

Announcement.hasMany( File, {
    as:         'file',
    foreignKey: 'announcementId',
    sourceKey:  'announcementId',
} );

Announcement.hasMany( Tag, {
    as:         'tag',
    foreignKey: 'announcementId',
    sourceKey:  'announcementId',
} );

export {
    Announcement,
    AnnouncementI18n,
    File,
    FileI18n,
    Tag,
};

export default {
    Announcement,
    AnnouncementI18n,
    File,
    FileI18n,
    Tag,
};
