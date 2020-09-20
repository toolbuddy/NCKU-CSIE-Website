import LanguageUtils from 'models/common/utils/language.js';
import Sequelize from 'sequelize';
import {
    Publication,
    PublicationI18n,
} from 'models/faculty/operations/associations.js';

export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            language = null,
            from = null,
            to = null,
        } = opt;

        /**
         * Invalid query parameter.
         * Handle with 400 bad request.
         */

        if ( !LanguageUtils.isSupportedLanguageId( language ) ) {
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
                        language,
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
