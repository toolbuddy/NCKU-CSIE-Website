import associations from 'models/announcement/operation/associations.js';

export default async ( { language = 'zh-TW', fileId, } = {} ) => {
    const table = await associations();

    const rowCount = await table.announcementI18n.destroy( {
        where: {
            language,
            fileId,
        },
    } )
    .then(
        rowCount => rowCount
    );

    table.database.close();

    return rowCount;
};
