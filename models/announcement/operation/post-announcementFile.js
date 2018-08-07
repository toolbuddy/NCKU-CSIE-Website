const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const associations = require( `${ projectRoot }/models/announcement/operation/associations` );
const languageSettings = require( `${ projectRoot }/settings/language/config` )

function isLangExist (data, language) {
    for ( var i=0; i<data.length; i++ ) {
        if ( data[i].language === language )
            return true
    }
    return false
}

module.exports = async ( { language = languageSettings.default, announcementFile } = {} ) => {
    const table = await associations();

    announcementFile = {
        announcementId: 75,
        type: 'jpeg',
        announcementFileI18n: [
            {
                language: 'zh-TW',
                name: 'some other file',
                url: '/bla/yo'
            },
            {
                language: 'en-US',
                name: 'some other file',
                url: '/bla/yo'
            },
        ]
    }

    languageSettings.support.forEach( ( lang ) => {
        if ( !isLangExist( announcementFile.announcementFileI18n, lang ) ) {
           throw 'Missing language for announcementFileI18n: '+lang
        }
    } )

    const data = await table.announcementFile.create( announcementFile, {
        include: [
            {
                model: table.announcementFileI18n,
                as:    'announcementFileI18n',
            },
        ],
    } )
    .then(
        announcementFile => ( {
            uploadTime: announcementFile.uploadTime,
            type:       announcementFile.type,
            url:        announcementFile.announcementFileI18n[ 0 ].url,
            name:       announcementFile.announcementFileI18n[ 0 ].name,
        } ),
    );

    table.database.close();

    return data;
};
