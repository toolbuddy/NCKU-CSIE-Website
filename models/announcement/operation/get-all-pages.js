const path = require( 'path' );
const Op = require( 'sequelize' ).Op;
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const opRoot = path.resolve( projectRoot, 'models/announcement/operation' );
const associations = require( path.resolve( opRoot, 'associations' ) );
const defaultValue = require( path.resolve( opRoot, 'default-value' ) );

module.exports = async ( {
    tags = [],
    startTime = new Date( defaultValue.startTime ).toISOString(),
    endTime = new Date( defaultValue.endTime ).toISOString(),
} = {} ) => {
    const table = await associations();
    let count = 0;
    if ( tags.length === 0 ) {
        count = await table.announcement.count( {
            where: {
                updateTime: {
                    [ Op.between ]: [
                        new Date( startTime ),
                        new Date( endTime ),
                    ],
                },
                isPublished: 1,
                isApproved:  1,
            },
        } );
    }
    else {
        count = await table.announcement.count( {
            where: {
                '$announcementTag.tagI18n.name$':{
                    [Op.in] : tags,
                },
                'updateTime':                       {
                    [ Op.between ]: [
                        new Date( startTime ),
                        new Date( endTime ),
                    ],
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
        } )
        .then( count => count.length );
    }
    table.database.close();

    return { pageNumber: Math.ceil( count / defaultValue.announcementsPerPage ), };
};
