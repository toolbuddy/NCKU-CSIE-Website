import LanguageUtils from 'settings/language/utils.js';
import nationMap from 'models/faculty/map/nation.js';

class NationUtils {
    static defaultType ( languageId ) {
        return nationMap[ languageId ].default;
    }

    static get defaultTypeId () {
        return nationMap[ LanguageUtils.defaultLanguageId ].support.indexOf( nationMap[ LanguageUtils.defaultLanguageId ].default );
    }

    static isSupportedType ( typeObj ) {
        if ( typeof ( typeObj.typeName ) !== 'string' )
            throw new TypeError( 'Queried nation should be a string.' );
        return nationMap[ typeObj.languageId ].support.includes( typeObj.typeName );
    }

    static isSupportedTypeId ( typeId ) {
        if ( typeof ( Number( typeId ) ) !== 'number' )
            throw new TypeError( 'Queried id should be a number.' );
        return NationUtils.supportedTypeId.includes( Number( typeId ) );
    }

    static supportedType ( languageId ) {
        return Array.from( nationMap[ languageId ].support );
    }

    static get supportedTypeId () {
        return nationMap[ LanguageUtils.defaultLanguageId ].support.map( ( {}, index ) => index );
    }

    static getTypeId ( typeObj ) {
        if ( typeof ( typeObj.typeName ) !== 'string' )
            throw new TypeError( 'Queried nation should be a string.' );
        if ( !NationUtils.isSupportedType( typeObj.typeName, typeObj.languageId ) )
            throw new Error( 'Queried nation is not supported.' );
        return nationMap[ LanguageUtils.getLanguageId( typeObj.languageId ) ].support.indexOf( typeObj.typeName );
    }

    static getTypeById ( typeObj ) {
        if ( typeof ( typeObj.typeId ) !== 'number' )
            throw new TypeError( 'Queried id should be a number.' );
        if ( !Number.isInteger( typeObj.typeId ) || typeObj.typeId < 0 || typeObj.typeId >= nationMap[ typeObj.languageId ].support.length )
            throw new RangeError( 'Queried id out of range.' );
        return String( nationMap[ typeObj.languageId ].support[ typeObj.typeId ] );
    }
}
export default NationUtils;
