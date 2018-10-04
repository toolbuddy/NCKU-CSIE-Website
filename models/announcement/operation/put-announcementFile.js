import associations from 'models/announcement/operation/associations.js';

export default async ( { language = 'zh-TW', announcementId, fileId, } = {} ) => {
    const table = await associations();

    const data = await table.announcementFile.findOne( {
        include: [
            {
                model:      table.announcementFileI18n,
                as:         'announcementFileI18n',
                where: {
                    language,
                },
            },
        ],
        where: {
            announcementId,
            fileId,
        },
    } )
    .then(
        announcementFile => Promise.all( [
            announcementFile.update( {
                type: 'jpg',
            } ),
            announcementFile.announcementFileI18n[ 0 ].update( {
                name: 'big file',
                url:  '/yo/yo/check',
            } ),
        ] )
    ).then(
        announcement => announcement
    );

    table.database.close();

    return data;
};
