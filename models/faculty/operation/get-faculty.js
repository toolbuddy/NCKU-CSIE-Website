import associations from 'models/faculty/operation/associations.js';

/**
 * A function for getting all the basic information of the faculty.
 * @param {string} [language = 'zh-TW'] - specified the data of the faculty.
 * @returns {object[]}                  - the data of the faculty in the specified language.
 */

export default async ( language = 'zh-TW' ) => {
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
                    labs,
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
                    table.lab.findAll( {
                        include: [
                            {
                                model:      table.labI18n,
                                as:         'labI18n',
                                attributes: [
                                    'name',
                                ],
                                where: {
                                    language,
                                },
                            },
                        ],
                        attributes: [
                            'labWeb',
                        ],
                        where: {
                            profileId: profile.profileId,
                        },
                    } )
                    .then(
                        labs => labs.map(
                            lab => ( {
                                labWeb:  lab.labWeb,
                                name:    lab.labI18n[ 0 ].name,
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
                    labs,
                } );
            }
        ) )
    );

    table.database.close();

    return data;
};
