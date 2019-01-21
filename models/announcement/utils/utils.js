import LanguageUtils from 'settings/language/utils.js';
import tagMap from 'models/announcement/map/tag.js';

class tagUtils {
    static defaultType ( languageId ) {
        return tagMap[ languageId ].default;
    }

    static get defaultTypeId () {
        return tagMap[ LanguageUtils.defaultLanguageId ].support.indexOf( tagMap[ LanguageUtils.defaultLanguageId ].default );
    }

    static isSupportedType ( typeObj ) {
        if ( !LanguageUtils.isSupportedLanguageId( typeObj.languageId ) )
            return false;
        if ( typeof ( typeObj.typeName ) !== 'string' )
            return false;
        return tagMap[ typeObj.languageId ].support.includes( typeObj.typeName );
    }

    static isSupportedTypeId ( typeId ) {
        typeId = Number( typeId );
        if ( typeof ( typeId ) !== 'number' )
            throw new TypeError( 'Queried id should be a number.' );
        return tagUtils.supportedTypeId.includes( typeId );
    }

    static supportedType ( languageId ) {
        return Array.from( tagMap[ languageId ].support );
    }

    static get supportedTypeId () {
        return tagMap[ LanguageUtils.defaultLanguageId ].support.map( ( {}, index ) => index );
    }

    static getTypeId ( typeObj ) {
        if ( typeof ( typeObj.typeName ) !== 'string' )
            throw new TypeError( 'Queried tag should be a string.' );
        if ( !tagUtils.isSupportedType( typeObj.typeName, typeObj.languageId ) )
            throw new Error( 'Queried tag is not supported.' );
        return tagMap[ LanguageUtils.getLanguageId( typeObj.languageId ) ].support.indexOf( typeObj.typeName );
    }

    static getTypeById ( typeObj ) {
        if ( typeof ( typeObj.typeId ) !== 'number' )
            throw new TypeError( 'Queried id should be a number.' );
        if ( !Number.isInteger( typeObj.typeId ) || typeObj.typeId < 0 || typeObj.typeId >= tagMap[ typeObj.languageId ].support.length )
            throw new RangeError( 'Queried id out of range.' );
        return String( tagMap[ typeObj.languageId ].support[ typeObj.typeId ] );
    }
}

export default tagUtils;
