const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const associations = require( `${ projectRoot }/models/announcement/operation/associations` );

module.exports = async ( { announcementId, announcementData, } = {} ) => {
    const table = await associations();

    const i18n = announcementData.announcementI18n;
    delete announcementData.announcementI18n;

    // Initialize result object
    const result = {};
    result.i18n = {};
    result.i18n.affectedCount = {};

    for ( let i = 0; i < i18n.length; i++ ) {
        await table.announcementI18n.update( i18n[ i ], {
            where: {
                language: i18n[ i ].language,
                announcementId,
            },
        } )
        .then(
            ( count ) => { result.i18n.affectedCount[ i18n[ i ].language ] = count; }
        );
    }

    await table.announcement.update( announcementData, {
        include: [
            {
                model:      table.announcementI18n,
                as:         'announcementI18n',
            },
        ],
        where: {
            announcementId,
        },
    } )
    .then(
        ( count ) => { result.affectedCount = count; }
    );

    table.database.close();

    return result;
};
