const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const sequelize = require( 'sequelize' );
const Op = require( 'sequelize' ).Op;
const associations = require( `${ projectRoot }/models/announcement/operation/associations` );

module.exports = async ( { tags = [], startTime = new Date( '2018-07-01' ).toISOString(), endTime = new Date().toISOString(), } = {} ) => {
    const table = await associations();
    const announcementsPerPage = 6;
    const count = await table.announcement.count( {
        where: {
            '$announcementTag.tagI18n.name$': tags,
            'updateTime':                       {
                [ Op.between ]: [ new Date( startTime ),
                    new Date( endTime ), ],
            },
            'isPublished': 1,
            'isApproved':  1,
        },
        include: [
            {
                model:      table.announcementTag,
                as:         'announcementTag',
                include:    [
                    {
                        model:      table.tagI18n,
                        as:         'tagI18n',
                    },
                ],
            },
        ],
        group:  '`announcement`.`announcement_id`',
        having: sequelize.literal( `count(*) = ${ tags.length }` ),
    } )
    .then( count => count.length );
    table.database.close();

    return { pageNumber: Math.ceil( count / announcementsPerPage ), };
};
