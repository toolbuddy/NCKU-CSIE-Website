const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const associations = require( `${ projectRoot }/models/announcement/operation/associations` );

module.exports = async ( { language = 'zh-TW', fileId, } = {} ) => {
    const table = await associations();

    const rowCount = await table.announcement.destroy( {
        where: {
            fileId,
        },
    } )
    .then(
        rowCount => row_count
    );

    table.database.close();

    return rowCount;
};
