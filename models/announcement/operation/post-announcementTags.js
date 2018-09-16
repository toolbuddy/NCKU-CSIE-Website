const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const associations = require( `${ projectRoot }/models/announcement/operation/associations` );

module.exports = async ( { announcementId, tagId, } = {} ) => {
    const table = await associations();

    const announcementTagData = tagId.map( id => ( {
        announcementId,
        tagId:          id,
    } ) );

    const data = await table.announcementTag.bulkCreate( announcementTagData )
    .then(
        announcementTags => announcementTags.map(
            announcementTag => ( {
                announcementId:   announcementTag.announcementId,
                tagId:          announcementTag.tagId,
            } )
        )
    );

    table.database.close();

    return data;
};
