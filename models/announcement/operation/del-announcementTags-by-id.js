const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const associations = require( `${ projectRoot }/models/announcement/operation/associations` );

module.exports = async ( { language = 'zh-TW', announcementId, tagId, } = {} ) => {
    const table = await associations();

    const row_count = await table.announcementTag.destroy( {
        where: {
            announcementId,
            tagId,
        },
    } )
    .then(
        row_count => row_count
    );

    table.database.close();

    return row_count;
};
