const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const associations = require( `${ projectRoot }/models/teacher/operation/associations` );

// Const getTeacherProfile = require( `${ projectRoot }/models/teacher/operation/get-teacher-profile` );

module.exports = async ( language = 'zh-TW' ) => {
    const table = await associations();

    const data = await table.profile.findAll( {
        attributes: [
            'email',
            'personalWeb',
            'photo',
            'position',
            'profileId',
        ],
    } )
        .then(
            profiles => Promise.all( profiles.map(
                async ( profile ) => {
                    const [
                        departments,
                        offices,
                        profileI18n,
                        titles,
                    ] = await Promise.all( [
                        table.department.findAll( {
                            include: [
                                {
                                    model:      table.departmentI18n,
                                    as:         'departmentI18n',
                                    attributes: [
                                        'department',
                                    ],
                                    where: {
                                        language,
                                    },
                                },
                            ],
                            attributes: [],
                            where:      {
                                profileId: profile.profileId,
                            },
                        } )
                            .then(
                                departments => departments.map(
                                    department => ( {
                                        department: department.departmentI18n[ 0 ].department,
                                    } )
                                )
                            ),
                        table.office.findAll( {
                            include: [
                                {
                                    model:      table.officeI18n,
                                    as:         'officeI18n',
                                    attributes: [
                                        'address',
                                    ],
                                    where: {
                                        language,
                                    },
                                },
                            ],
                            attributes: [
                                'tel',
                            ],
                            where: {
                                profileId: profile.profileId,
                            },
                        } )
                            .then(
                                offices => offices.map(
                                    office => ( {
                                        tel:     office.tel,
                                        address: office.officeI18n[ 0 ].address,
                                    } )
                                )
                            ),
                        table.profileI18n.findOne( {
                            attributes: [
                                'name',
                            ],
                            where: {
                                language,
                                profileId: profile.profileId,
                            },
                        } ),
                        table.title.findAll( {
                            include: [
                                {
                                    model:      table.titleI18n,
                                    as:         'titleI18n',
                                    attributes: [
                                        'title',
                                    ],
                                    where: {
                                        language,
                                    },
                                },
                            ],
                            attributes: [
                                'endDate',
                                'startDate',
                            ],
                            where: {
                                profileId: profile.profileId,
                            },
                        } )
                            .then(
                                titles => titles.map(
                                    title => ( {
                                        endDate:   title.endDate,
                                        startDate: title.startDate,
                                        title:     title.titleI18n[ 0 ].title,
                                    } )
                                )
                            ),
                    ] );

                    return ( {
                        email:       profile.email,
                        name:        profileI18n.name,
                        personalWeb: profile.email,
                        photo:       profile.photo,
                        position:    profile.position,
                        profileId:   profile.profileId,
                        titles,
                        departments,
                        offices,
                    } );
                }
            ) )
        );

    table.database.close();

    return data;
};
