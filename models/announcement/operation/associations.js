const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const connect = require( path.join( projectRoot, 'settings/database/connect' ) );

module.exports = async () => {
    const announcementDatabase = await connect( 'announcement' );
    const tablesRoot = path.join( projectRoot, 'models/announcement/tables' );
    const table = {
        announcementFileI18n: announcementDatabase.import( path.join( tablesRoot, 'announcement_file_i18n' ) ),
        announcementFile:     announcementDatabase.import( path.join( tablesRoot, 'announcement_file' ) ),
        announcementI18n:     announcementDatabase.import( path.join( tablesRoot, 'announcement_i18n' ) ),
        announcement:         announcementDatabase.import( path.join( tablesRoot, 'announcement' ) ),
        announcementTag:      announcementDatabase.import( path.join( tablesRoot, 'announcement_tag' ) ),
        tagI18n:              announcementDatabase.import( path.join( tablesRoot, 'tag_i18n' ) ),
        tag:                  announcementDatabase.import( path.join( tablesRoot, 'tag' ) ),
    };

    // Translation relationship.
    // `announcement` has many translations.
    table.announcement.hasMany( table.announcementI18n, {
        as:         'announcementI18n',
        foreignKey: 'announcementId',
        sourceKey:  'announcementId',
        onDelete:   'CASCADE',
    } );

    // `announcementFile` has many translations.
    table.announcementFile.hasMany( table.announcementFileI18n, {
        as:         'announcementFileI18n',
        foreignKey: 'fileId',
        sourceKey:  'fileId',
        onDelete:   'CASCADE',
    } );

    // `tag` has many translations.
    table.tag.hasMany( table.tagI18n, {
        as:         'tagI18n',
        foreignKey: 'tagId',
        sourceKey:  'tagId',
        onDelete:   'CASCADE',
    } );

    // Announcement relationship.
    // `announcement` has many `file`.
    table.announcement.hasMany( table.announcementFile, {
        as:         'announcementFile',
        foreignKey: 'announcementId',
        sourceKey:  'announcementId',
        onDelete:   'CASCADE',
    } );

    // `announcement` has many `announcementTag`.
    table.announcement.hasMany( table.announcementTag, {
        as:         'announcementTag',
        foreignKey: 'announcementId',
        sourceKey:  'announcementId',
        onDelete:   'CASCADE',
    } );

    // `announcementTag` has many `tagI18n`.
    table.announcementTag.hasMany( table.tagI18n, {
        as:         'tagI18n',
        foreignKey: 'tagId',
        sourceKey:  'tagId',
        onDelete:   'CASCADE',
    } );

    // Any one who use this module should remember to close connection,
    // like `table.database.close()`.
    table.database = announcementDatabase;

    return table;
};
