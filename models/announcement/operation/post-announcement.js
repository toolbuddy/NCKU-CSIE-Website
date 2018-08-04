const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const associations = require( `${ projectRoot }/models/announcement/operation/associations` );

module.exports = async ( { language = 'zh-TW', } = {} ) => {
    const table = await associations();

    const data = await table.announcement.create( {
        author: 'Daniel',
        announcementI18n: [
            {
                language: 'zh-TW',
                title: 'Test',
                content: 'Content',
            },
            {
                language: 'en-US',
                title: 'Test',
                content: 'Content',
            },
        ],
        announcementTag: [
            {
                tagId: 1,
            },
            {
                tagId: 2,
            }
        ],
        announcementFile: [
            {
                type: 'jpeg',
                announcementFileI18n: [
                    {
                        language: 'zh-TW',
                        name: 'some file',
                        url: '/bla/yo'
                    },
                    {
                        language: 'en-US',
                        name: 'some file',
                        url: '/bla/yo'
                    },
                ]
            }
        ]
    }, {
        include: [
            {
                model:   table.announcementI18n,
                as:      'announcementI18n',
            },
            {
                model:   table.announcementTag,
                as:      'announcementTag',
            },
            {
                model:   table.announcementFile,
                as:      'announcementFile',
                include: [
                    {
                        model: table.announcementFileI18n,
                        as:    'announcementFileI18n',
                    },
                ],
            },
        ],
    } )
    .then(
        announcement => announcement
    );

    table.database.close();

    return data;
};
