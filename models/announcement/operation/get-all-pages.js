const path = require( 'path' );
const Op = require( 'sequelize' ).Op;
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const opRoot = path.join( projectRoot, 'models/announcement/operation' );
const associations = require( path.join( opRoot, 'associations' ) );
const validate = require( path.join( projectRoot, 'test/models/announcement/operation/validate' ) );
const defaultValue = require( path.join( projectRoot, 'settings/default-value/announcement/config' ) );

module.exports = async ( {
    tags = [],
    startTime = defaultValue.startTime,
    endTime = defaultValue.endTime,
} = {} ) => {
    tags = [ ...new Set( tags ), ];
    startTime = new Date( startTime );
    endTime = new Date( endTime );

    if ( !validate.isValidTags( tags ) )
        return { error: 'invalid tag name', };

    if ( !validate.isValidDate( startTime ) )
        return { error: 'invalid start time', };

    if ( !validate.isValidDate( endTime ) )
        return { error: 'invalid end time', };

    const table = await associations();
    let count = 0;
    if ( tags.length === 0 ) {
        count = await table.announcement.count( {
            where: {
                updateTime: {
                    [ Op.between ]: [
                        startTime,
                        endTime,
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
                '$announcementTag.tagI18n.name$': {
                    [ Op.in ]: tags,
                },
                'updateTime': {
                    [ Op.between ]: [
                        startTime,
                        endTime,
                    ],
                },
                'isPublished': 1,
                'isApproved':  1,
            },
            include: [
                {
                    model:   table.announcementTag,
                    as:      'announcementTag',
                    include: [
                        {
                            model: table.tagI18n,
                            as:    'tagI18n',
                        },
                    ],
                },
            ],
            distinct: true,
        } );
    }
    table.database.close();

    return { pageNumber: Math.ceil( count / defaultValue.announcementsPerPage ), };
};
