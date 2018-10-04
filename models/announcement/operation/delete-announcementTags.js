import associations from 'models/announcement/operation/associations.js';

export default async ( { announcementId, tagId, } = {} ) => {
    const table = await associations();

    const rowCount = await table.announcementTag.destroy( {
        where: {
            announcementId,
            tagId,
        },
    } )
    .then(
        rowCount => rowCount
    );

    table.database.close();

    return rowCount;
};
