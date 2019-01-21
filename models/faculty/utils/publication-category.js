import LanguageUtils from 'settings/language/utils.js';
import publicationCategoryMap from 'models/faculty/map/publication-category.js';

class PublicationCategoryUtils {
    static defaultType ( languageId ) {
        return publicationCategoryMap[ languageId ].default;
    }

    static get defaultTypeId () {
        return publicationCategoryMap[ LanguageUtils.defaultLanguageId ].support.indexOf( publicationCategoryMap[ LanguageUtils.defaultLanguageId ].default );
    }

    static isSupportedType ( typeObj ) {
        if ( typeof ( typeObj.typeName ) !== 'string' )
            throw new TypeError( 'Queried publicationType should be a string.' );
        return publicationCategoryMap[ typeObj.languageId ].support.includes( typeObj.typeName );
    }

    static isSupportedTypeId ( typeId ) {
        if ( typeof ( Number( typeId ) ) !== 'number' )
            throw new TypeError( 'Queried id should be a number.' );
        return PublicationCategoryUtils.supportedTypeId.includes( Number( typeId ) );
    }

    static supportedType ( languageId ) {
        return Array.from( publicationCategoryMap[ languageId ].support );
    }

    static get supportedTypeId () {
        return publicationCategoryMap[ LanguageUtils.defaultLanguageId ].support.map( ( {}, index ) => index );
    }

    static getTypeId ( typeObj ) {
        if ( typeof ( typeObj.typeName ) !== 'string' )
            throw new TypeError( 'Queried publicationType should be a string.' );
        if ( !PublicationCategoryUtils.isSupportedType( typeObj.typeName, typeObj.languageId ) )
            throw new Error( 'Queried publicationType is not supported.' );
        return publicationCategoryMap[ LanguageUtils.getLanguageId( typeObj.languageId ) ].support.indexOf( typeObj.typeName );
    }

    static getTypeById ( typeObj ) {
        if ( typeof ( typeObj.typeId ) !== 'number' )
            throw new TypeError( 'Queried id should be a number.' );
        if ( !Number.isInteger( typeObj.typeId ) || typeObj.typeId < 0 || typeObj.typeId >= publicationCategoryMap[ typeObj.languageId ].support.length )
            throw new RangeError( 'Queried id out of range.' );
        return String( publicationCategoryMap[ typeObj.languageId ].support[ typeObj.typeId ] );
    }
}
export default PublicationCategoryUtils;
