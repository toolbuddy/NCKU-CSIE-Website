const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const associations = require( `${ projectRoot }/models/announcement/operation/associations` );

module.exports = async ( { language = 'zh-TW', announcementTags, } = {} ) => {
    const table = await associations();

    announcementTags = [
        {
            announcementId: 75,
            tagId: 8,
        },
        {
            announcementId: 75,
            tagId: 7,
        },
    ]

    const data = await table.announcementTag.bulkCreate( announcementTags )
    .then(
        announcementTags => announcementTags.map(
            announcementTag => ( {
                announcementId:   announcementTag.announcementId,
                tagId:   announcementTag.tagId,
            } )
        )
    );

    table.database.close();

    return data;
};
