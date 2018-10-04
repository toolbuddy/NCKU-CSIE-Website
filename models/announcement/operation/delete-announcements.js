import associations from 'models/announcement/operation/associations.js';

export default async ( { announcementId, } = {} ) => {
    const table = await associations();

    const rowCount = await table.announcement.destroy( {
        where: {
            announcementId,
        },
    } )
    .then(
        rowCount => rowCount
    );

    table.database.close();

    return rowCount;
};
