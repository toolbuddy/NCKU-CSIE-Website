const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const associations = require( path.join( projectRoot, 'models/announcement/operation/associations' ) );

module.exports = async ( { announcementId = 1, } = {} ) => {
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
                            language: 'en-US',
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
                            'name',
                        ],
                    },
                ],
                attributes: [
                    'type',
                    'uploadTime',
                ],
            },
        ],
        attributes: [
            'announcementId',
            'author',
            'updateTime',
            'views',
            'isPinned',
            'isPublished',
        ],
        where: {
            announcementId,
        },
    } )
    .then(
        announcement => ( {
            'id':          announcement.announcementId,
            'author':      announcement.author,
            'updateTime':  announcement.updateTime,
            'views':       announcement.views,
            'isPinned':    announcement.isPinned,
            'isPublished': announcement.isPublished,
            'en-US':       {
                title:   announcement.announcementI18n[ 0 ].title,
                content: announcement.announcementI18n[ 0 ].content,
            },
            'zh-TW': {
                title:   announcement.announcementI18n[ 1 ].title,
                content: announcement.announcementI18n[ 1 ].content,
            },
            'files':       announcement.announcementFile.map(
                announcementFile => ( {
                    uploadTime: announcementFile.uploadTime,
                    type:       announcementFile.type,
                    url:        announcementFile.announcementFileI18n[ 0 ].url,
                    name:       announcementFile.announcementFileI18n[ 0 ].name,
                } ),
            ),
            'tags':        announcement.announcementTag.map(
                announcementTag => announcementTag.tagI18n[ 0 ].name,
            ),
        } )
    );

    table.database.close();

    return data;
};
