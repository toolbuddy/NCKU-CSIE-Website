const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const associations = require( `${ projectRoot }/models/announcement/operation/associations` );

module.exports = async ( { language = 'zh-TW', announcementId = 75, } = {} ) => {
    const table = await associations();

    const data = await table.announcementI18n.update( {
        title: '測試',
        content: '內容唷',
    }, {
        where: {
            announcementId,
            language,
        },
    } )
    .then(
        announcement => announcement
    );

    table.database.close();

    return data;
};
