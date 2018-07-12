const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const connect = require( `${ projectRoot }/settings/database/connect` );
// const associations = require( `${ projectRoot }/models/announcement/operation/associations` );

module.exports = async ( { language = 'zh-TW', announcementId = 1, } = {} ) => {
    // const table = await associations();
    const announcementDatabase = await connect( 'teacher' );
    const table = {
        announcement:         announcementDatabase.import( `${ projectRoot }/models/announcement/tables/announcement` ),
        announcementI18n:     announcementDatabase.import( `${ projectRoot }/models/announcement/tables/announcement_i18n` ),
        announcementFile:     announcementDatabase.import( `${ projectRoot }/models/announcement/tables/announcement_file` ),
        announcementFileI18n: announcementDatabase.import( `${ projectRoot }/models/announcement/tables/announcement_file_i18n` ),
        announcementTag:      announcementDatabase.import( `${ projectRoot }/models/announcement/tables/announcement_tag` ),
        tag:                  announcementDatabase.import( `${ projectRoot }/models/announcement/tables/tag` ),
        tagI18n:              announcementDatabase.import( `${ projectRoot }/models/announcement/tables/tag_i18n` ),
    };

    // i18n
    table.announcement.hasMany( table.announcementI18n, {
        as:         'announcementI18n',
        foreignKey: 'announcementId',
        sourceKey:  'announcementId',
    } );
    table.announcementFile.hasMany( table.announcementFileI18n, {
        as:         'announcementFileI18n',
        foreignKey: 'fileId',
        sourceKey:  'fileId',
    } );
    table.tag.hasMany( table.tagI18n, {
        as:         'tagI18n',
        foreignKey: 'tagId',
        sourceKey:  'tagId',
    } );

    // announcement
    table.announcement.hasMany( table.announcementFile, {
        as:         'announcementFile',
        foreignKey: 'announcementId',
        sourceKey:  'announcementId',
    } );
    table.announcement.hasMany( table.announcementTag, {
        as:         'announcementTag',
        foreignKey: 'announcementId',
        sourceKey:  'announcementId',
    } );
    table.announcementTag.hasMany( table.tag, {
        as:         'tag',
        foreignKey: 'tagId',
        sourceKey:  'tagId',
    } );

    const data = await table.announcement.findOne( {
        include: [
            {
                model: table.announcementI18n,
                as:    'announcementI18n',
                attributes: [
                    'title',
                    'content',
                ],
                where: {
                    language,
                },
            },
            {
                model: table.announcementTag,
                as:    'announcementTag',
                include: [
                    {
                        model: table.tag,
                        as:    'tag',
                        include: [
                            {
                                model: table.tagI18n,
                                as:    'tagI18n',
                                attributes: [
                                    'name',
                                ],
                                where: {
                                    language
                                },
                            },
                        ],
                    },
                ],
            },
            {
                model: table.announcementFile,
                as:    'announcementFile',
                include: [
                    {
                        model: table.announcementFileI18n,
                        as:    'announcementFileI18n',
                        attributes: [
                            'url',
                        ],
                        where: {
                            language
                        },
                    },
                ],
                attributes: [
                    'type',
                ],
            },
        ],
        attributes: [
            'author',
            'publishTime',
            'updateTime',
            'views',
            'is_pinned',
        ],
        where: {
            announcementId,
        },
    } )
    .then(
        announcement => ( {
            title:       announcement.announcementI18n[ 0 ].title,
            content:     announcement.announcementI18n[ 0 ].content,
            autohr:      announcement.author,
            publishTime: announcement.publishTime,
            updateTime:  announcement.updateTime,
            views:       announcement.views,
            is_pinned:   announcement.pinned,
            files:       announcement.announcementFile.map(
                announcementFile => ( {
                    type: announcementfile.type,
                    url:  announcementfile.announcementFileI18n[ 0 ].url,
                } ),
            ),
            tags:        announcement.announcementTag.map(
                announcementTag => ( {
                    name: announcementTag.tag[ 0 ].tagI18n[ 0 ].name,
                } )
            ),
        } )
    );

    table.database.close();

    return data;
};
