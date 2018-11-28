import associations from 'models/announcement/operation/associations.js';
import languageSettings from 'settings/language/config.js';

function isLangExist ( data, language ) {
    for ( let i = 0; i < data.length; i++ ) {
        if ( data[ i ].language === language )
            return true;
    }
    return false;
}

export default async ( { announcementFileData, } = {} ) => {
    const table = await associations();

    languageSettings.support.forEach( ( lang ) => {
        if ( !isLangExist( announcementFileData.announcementFileI18n, lang ) )
            throw new Error( `Missing language for announcementFileI18n: ${ lang }` );
    } );

    const data = await table.announcementFile.create( announcementFileData, {
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
