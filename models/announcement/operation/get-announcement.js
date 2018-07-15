const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const associations = require( `${ projectRoot }/models/announcement/operation/associations` );

module.exports = async ( { language = 'zh-TW', announcementId = 1, } = {} ) => {
    const table = await associations();

    const data = await table.announcement.findOne( {
        include: [
            {
                model:      table.announcementI18n,
                as:         'announcementI18n',
                attributes: [
                    'title',
                    'content',
                ],
                where: {
                    language,
                },
            },
            {
                model:   table.announcementTag,
                as:      'announcementTag',
                include: [
                    {
                        model:      table.tagI18n,
                        as:         'tagI18n',
                        attributes: [
                            'tagId',
                            'name',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
            },
            {
                model:   table.announcementFile,
                as:      'announcementFile',
                include: [
                    {
                        model:      table.announcementFileI18n,
                        as:         'announcementFileI18n',
                        attributes: [
                            'url',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
                attributes: [
                    'type',
                ],
            },
        ],
        attributes: [
            'announcementId',
            'author',
            'publishTime',
            'updateTime',
            'views',
            'isPinned',
        ],
        where: {
            announcementId,
        },
    } )
    .then(
        announcement => ( {
            id:          announcement.announcementId,
            title:       announcement.announcementI18n[ 0 ].title,
            content:     announcement.announcementI18n[ 0 ].content,
            autohr:      announcement.author,
            publishTime: announcement.publishTime,
            updateTime:  announcement.updateTime,
            views:       announcement.views,
            isPinned:    announcement.isPinned,
            files:       announcement.announcementFile.map(
                announcementFile => ( {
                    type: announcementFile.type,
                    url:  announcementFile.announcementFileI18n[ 0 ].url,
                } ),
            ),
            tags:        announcement.announcementTag.map(
                announcementTag => ( {
                    id:   announcementTag.tagI18n[ 0 ].tagId,
                    name: announcementTag.tagI18n[ 0 ].name,
                } )
            ),
        } )
    );

    table.database.close();

    return data;
};
