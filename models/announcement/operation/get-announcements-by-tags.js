const path = require( 'path' );
const sequelize = require( 'sequelize' );
const Op = sequelize.Op;
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const opRoot = path.resolve( projectRoot, 'models/announcement/operation' );
const associations = require( path.resolve( opRoot, 'associations' ) );
const defaultValue = require( path.resolve( projectRoot, 'settings/default-value/announcement/config' ) );

module.exports = async ( {
    tags = [],
    startTime = defaultValue.startTime,
    endTime = defaultValue.endTime,
    page = defaultValue.page,
    language = defaultValue.language,
} = {} ) => {
    const table = await associations();
    if ( page <= 0 )
        return [];
    const data = await table.announcement.findAll( {
        attributes: [ 'announcementId', ],
        where:      {
            '$announcementTag.tagI18n.name$': {
                [ Op.in ]: tags,
            },
            'updateTime': {
                [ Op.between ]: [
                    new Date( startTime ),
                    new Date( endTime ),
                ],
            },
            'isPublished': 1,
            'isApproved':  1,
        },
        include: [ {
            model:      table.announcementTag,
            attributes: [],
            as:         'announcementTag',
            include:    [ {
                model:      table.tagI18n,
                attributes: [],
                as:         'tagI18n',
            }, ],
        }, ],
        group:  'announcementId',
        having: sequelize.literal( `count(*) = ${ tags.length }` ),
    } )
    .then( ids => table.announcement.findAll( {
        attributes: [
            'announcementId',
            'updateTime',
        ],
        where: {
            announcementId: {
                [ Op.in ]: ids.map( id => id.announcementId ),
            },
        },
        offset:  ( page - 1 ) * defaultValue.announcementsPerPage,
        limit:   defaultValue.announcementsPerPage,
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
                attributes: [ 'tagId', ],
                include:    [ {
                    model:      table.tagI18n,
                    as:         'tagI18n',
                    attributes: [ 'name', ],
                    where:      {
                        language: 'en-US',
                    },
                }, ],
            },
        ],
    } ) )
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

    table.database.close();

    return data;
};
