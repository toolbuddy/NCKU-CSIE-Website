const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const associations = require( `${ projectRoot }/models/announcement/operation/associations` );

module.exports = async ( { announcementId, tagId, } = {} ) => {
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
