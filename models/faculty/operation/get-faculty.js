import LanguageUtils from 'settings/language/utils.js';
import associations from 'models/faculty/operation/associations.js';

export default async ( language = LanguageUtils.defaultLanguageId ) => {
    const table = await associations();

    const data = await table.profile.findAll( {
        attributes: [
            'email',
            'personalWeb',
            'photo',
            'profileId',
            'officeTel',
            'labWeb',
        ],
    } )
    .then(
        profiles => Promise.all( profiles.map(
            async ( profile ) => {
                const [
                    departments,
                    profileI18n,
                    titles,
                    researchGruops,
                ] = await Promise.all( [
                    table.department.findAll( {
                        attributes: [
                            'type',
                        ],
                        where:      {
                            profileId: profile.profileId,
                        },
                    } ),
                    table.profileI18n.findOne( {
                        attributes: [
                            'name',
                            'officeAddress',
                            'labName',
                        ],
                        where: {
                            language,
                            profileId: profile.profileId,
                        },
                    } )
                    .then(
                        profileI18ns => ( {
                            name:          profileI18ns.name,
                            officeAddress: profileI18ns.officeAddress,
                            labName:       profileI18ns.labName,
                        } )
                    ),
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
                            'to',
                            'from',
                        ],
                        where: {
                            profileId: profile.profileId,
                        },
                    } )
                    .then(
                        titles => titles.map(
                            title => ( {
                                to:        title.to,
                                from:      title.from,
                                title:     title.titleI18n[ 0 ].title,
                            } )
                        )
                    ),
                    table.researchGroup.findAll( {
                        attributes: [
                            'type',
                        ],
                        where:      {
                            profileId: profile.profileId,
                        },
                    } )
                    .then(
                        ( researchGroups ) => {
                            let result = '';
                            for ( const data of researchGroups )
                                result = `${ result }${ data.type }`;
                            return result;
                        }
                    ),
                ] );

                return ( {
                    email:         profile.email,
                    name:          profileI18n.name,
                    personalWeb:   profile.email,
                    photo:         profile.photo,
                    profileId:     profile.profileId,
                    officeTel:     profile.officeTel,
                    officeAddress: profileI18n.officeAddress,
                    labWeb:        profile.labWeb,
                    labName:       profileI18n.labName,
                    titles,
                    departments,
                    researchGruops,
                } );
            }
        ) )
    );

    table.database.close();
    return data;
};
