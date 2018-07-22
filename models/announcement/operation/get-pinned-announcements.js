const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const sequelize = require( 'sequelize' );
const Op = require( 'sequelize' ).Op;
const associations = require( `${ projectRoot }/models/announcement/operation/associations` );

module.exports = async ( {
    tags = [],
    startTime = new Date( '2018-07-01' ).toISOString(),
    endTime = new Date().toISOString(),
    language = 'zh-TW',
} = {} ) => {
    const table = await associations();
    let data = [];
    if ( tags.length === 0 ) {
        data = await table.announcement.findAll( {
            attributes: [
                'announcementId',
                'updateTime',
            ],
            where: {
                updateTime: {
                    [ Op.between ]: [ new Date( startTime ),
                        new Date( endTime ), ],
                },
                isPinned:    1,
                isPublished: 1,
                isApproved:  1,
            },
            include: [
                {
                    model:      table.announcementI18n,
                    as:         'announcementI18n',
                    attributes: [
                        'title',
                        'content',
                    ],
                    where: {
                        language,
                    },
                },
                {
                    model:      table.announcementTag,
                    as:         'announcementTag',
                    attributes: [
                        'tagId',
                    ],
                    include: [
                        {
                            model:      table.tagI18n,
                            as:         'tagI18n',
                            attributes: [
                                'name',
                            ],
                            where: {
                                language: 'en-US',
                            },
                        },

                    ],
                },
            ],
        } )
        .then( announcements => announcements.map( announcement => ( {
            id:         announcement.announcementId,
            title:      announcement.announcementI18n[ 0 ].title,
            content:    announcement.announcementI18n[ 0 ].content,
            updateTime: announcement.updateTime,
            tags:       announcement.announcementTag.map( tag => ( {
                id:   tag.tagId,
                name: tag.tagI18n[ 0 ].name,
            } ) ),
        } ) ) );
    }
    else {
        data = await table.announcement.findAll( {
            attributes: [
                'announcementId',
            ],
            where: {
                '$announcementTag.tagI18n.name$': tags,
                'updateTime':                       {
                    [ Op.between ]: [ new Date( startTime ),
                        new Date( endTime ), ],
                },
                'isPinned':    1,
                'isPublished': 1,
                'isApproved':  1,
            },
            include: [
                {
                    model:      table.announcementTag,
                    attributes: [],
                    as:         'announcementTag',
                    include:    [
                        {
                            model:      table.tagI18n,
                            attributes: [],
                            as:         'tagI18n',
                        },
                    ],
                },
            ],
            group:  'announcementId',
            having: sequelize.literal( `count(*) = ${ tags.length }` ),
        } )
        .then( ids => ids.map( id => id.announcementId ) )
        .then( requiredId => table.announcement.findAll( {
            attributes: [
                'announcementId',
                'updateTime',
            ],
            where: {
                announcementId: requiredId,
            },
            include: [
                {
                    model:      table.announcementI18n,
                    as:         'announcementI18n',
                    attributes: [
                        'title',
                        'content',
                    ],
                    where: {
                        language,
                    },
                },
                {
                    model:      table.announcementTag,
                    as:         'announcementTag',
                    attributes: [
                        'tagId',
                    ],
                    include: [
                        {
                            model:      table.tagI18n,
                            as:         'tagI18n',
                            attributes: [
                                'name',
                            ],
                            where: {
                                language: 'en-US',
                            },
                        },

                    ],
                },
            ],
        } )
        .then( announcements => announcements.map( announcement => ( {
            id:         announcement.announcementId,
            title:      announcement.announcementI18n[ 0 ].title,
            content:    announcement.announcementI18n[ 0 ].content,
            updateTime: announcement.updateTime,
            tags:       announcement.announcementTag.map( tag => ( {
                id:   tag.tagId,
                name: tag.tagI18n[ 0 ].name,
            } ) ),
        } ) ) ) );
    }
    table.database.close();

    return data;
};
