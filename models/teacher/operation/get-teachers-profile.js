const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
<<<<<<< HEAD
const connect = require( `${ projectRoot }/settings/database/connect` );

module.exports = async ( language = 'zh-TW' ) => {
    const teacherDatabase = await connect( 'teacher' );
    const tables = {
        profile:        teacherDatabase.import( `${ projectRoot }/models/teacher/tables/profile` ),
        profileI18n:    teacherDatabase.import( `${ projectRoot }/models/teacher/tables/profile_i18n` ),
        title:          teacherDatabase.import( `${ projectRoot }/models/teacher/tables/title` ),
        titleI18n:      teacherDatabase.import( `${ projectRoot }/models/teacher/tables/title_i18n` ),
        department:     teacherDatabase.import( `${ projectRoot }/models/teacher/tables/department` ),
        departmentI18n: teacherDatabase.import( `${ projectRoot }/models/teacher/tables/department_i18n` ),
        office:         teacherDatabase.import( `${ projectRoot }/models/teacher/tables/office` ),
        officeI18n:     teacherDatabase.import( `${ projectRoot }/models/teacher/tables/office_i18n` ),
    };

    const data = {};

    // Promise.all uses iterator, so it will keep the order of the elements in array that passed in
    [
        data.profile,
        data.profileI18n,
        data.title,
        data.titleI18n,
        data.department,
        data.departmentI18n,
        data.office,
        data.officeI18n,
    ] = await Promise.all(
        [
            tables.profile.findAll( {
                attributes: [
                    'profileId',
                    'personalWeb',
                    'email',
                    'position',
                ],
            } ),
            tables.profileI18n.findAll( {
                attributes: [
                    'profileId',
                    'name',
                ],
                where:      { language, },
            } ),
            tables.title.findAll( {
                attributes: [
                    'profileId',
                    'titleId',
                ],
            } ),
            tables.titleI18n.findAll( {
                attributes: [
                    'titleId',
                    'title',
                ],
                where:      { language, },
            } ),
            tables.department.findAll( {
                attributes: [
                    'profileId',
                    'departmentId',
                ],
            } ),
            tables.departmentI18n.findAll( {
                attributes: [
                    'departmentId',
                    'department',
                ],
                where:      { language, },
            } ),
            tables.office.findAll( {
                attributes: [ 'profileId',
                    'officeId',
                    'tel', ],
            } ),
            tables.officeI18n.findAll( {
                attributes: [
                    'officeId',
                    'address',
                ],
                where:      { language, },
            } ),
        ]
    );

    teacherDatabase.close();

    return data.profile.map( profile => ( {
        profileId: profile.profileId,
        name:      data.profileI18n
            .find( profileI18n => profileI18n.profileId === profile.profileId )
            .name,
        personalWeb: profile.personalWeb,
        email:       profile.email,
        titles:       data.title
            .filter( title => title.profileId === profile.profileId )
            .map(
                title => data.titleI18n
                    .find( titleI18n => titleI18n.titleId === title.titleId )
                    .title
            ),
        departments: data.department
            .filter( department => department.profileId === profile.profileId )
            .map(
                department => data.departmentI18n
                    .find( departmentI18n => departmentI18n.departmentId === department.departmentId )
                    .department
            ),
        offices: data.office
            .filter( office => office.profileId === profile.profileId )
            .map( office => ( {
                address:
                    data.officeI18n
                        .find( officeI18n => officeI18n.officeId === office.officeId )
                        .address,
                tel: office.tel,
            } ) ),
        position: profile.position,
        image:    'http://via.placeholder.com/300x600',
    } ) );
=======
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
>>>>>>> 5db0391fbb5c84ae402ca328a7c174bb3b95654e
};
