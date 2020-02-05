import LanguageUtils from 'models/common/utils/language.js';
import Sequelize from 'sequelize';
import {
    Publication,
    PublicationI18n,
} from 'models/faculty/operations/associations.js';

/**
 * A function for getting information of all faculty publication in a specific language .
 *
 * @async
 * @param   {number}    languageId  - The ID of language. Deciding the langauge of the requested information.
 * @param   {number}    from        - The beginning year of the requested time range.
 * @param   {number}    to          - The end year of the requested time range.
 * @returns {object []}             - Information of all faculty publication. Including:
 * - publicationId
 * - profileId
 * - issueYear
 * - issueMonth
 * - category
 * - international
 * - refereed
 * - title
 * - authors
 *
 */

export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            languageId = null,
            from = null,
            to = null,
        } = opt;

        /**
         * Invalid query parameter.
         * Handle with 400 bad request.
         */

        if ( !LanguageUtils.isSupportedLanguageId( languageId ) ) {
            const error = new Error( 'invalid language id' );
            error.status = 400;
            throw error;
        }
        const data = await Publication.findAll( {
            attributes: [
                'publicationId',
                'profileId',
                'issueYear',
                'category',
                'international',
            ],
            where: {
                issueYear: {
                    [ Sequelize.Op.gte ]: from,
                    [ Sequelize.Op.lte ]: to,
                },
            },
            include: [
                {
                    model:      PublicationI18n,
                    as:         'publicationI18n',
                    attributes: [
                        'title',
                        'authors',
                    ],
                    where: {
                        language: languageId,
                    },
                },
            ],
        } );
        return data.map( publication => ( {
            publicationId: publication.publicationId,
            profileId:     publication.profileId,
            issueYear:     publication.issueYear,
            issueMonth:    publication.issueMonth,
            category:      publication.category,
            international: publication.international,
            refereed:      publication.refereed,
            title:         publication.publicationI18n[ 0 ].title,
            authors:       publication.publicationI18n[ 0 ].authors,
        } ) );
    }
    catch ( err ) {
        if ( err.status )
            throw err;
        const error = new Error();
        error.status = 500;
        throw error;
    }
};
