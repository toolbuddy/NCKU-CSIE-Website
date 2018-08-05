const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const associations = require( `${ projectRoot }/models/announcement/operation/associations` );

module.exports = async ( { language = 'zh-TW', announcementId = 75, fileId = 3, } = {} ) => {
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
        announcementFile => {
            return Promise.all( [
                announcementFile.update( {
                    type: 'jpg',
                } ),
                announcementFile.announcementFileI18n[ 0 ].update( {
                    name: 'big file',
                    url: '/yo/yo/check',
                } ),
            ] )
        }
    ).then(
        announcement => announcement
    );

    table.database.close();

    return data;
};
