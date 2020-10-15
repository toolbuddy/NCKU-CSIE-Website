const Announcement = require('models/announcement/schemas/announcement.js');
const AnnouncementI18n = require('models/announcement/schemas/announcement-i18n.js');
const File = require('models/announcement/schemas/file.js');
const Tag = require('models/announcement/schemas/tag.js');

Announcement.hasMany(AnnouncementI18n, {
    as: 'announcementI18n',
    foreignKey: 'announcementId',
    sourceKey: 'announcementId',
});

Announcement.hasMany(Tag, {
    as: 'tags',
    foreignKey: 'announcementId',
    sourceKey: 'announcementId',
});

Announcement.hasMany(File, {
    as: 'files',
    foreignKey: 'announcementId',
    sourceKey: 'announcementId',
});

module.exports = {
    Announcement,
    AnnouncementI18n,
    File,
    Tag,
};
