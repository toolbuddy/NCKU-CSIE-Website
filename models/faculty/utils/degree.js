import LanguageUtils from 'settings/language/utils.js';
import degreeMap from 'models/faculty/map/degree.js';

class DegreeTypeUtils {
    static defaultType ( languageId ) {
        return degreeMap[ languageId ].default;
    }

    static get defaultTypeId () {
        return degreeMap[ LanguageUtils.defaultLanguageId ].support.indexOf( degreeMap[ LanguageUtils.defaultLanguageId ].default );
    }

    static isSupportedType ( typeObj ) {
        if ( !LanguageUtils.isSupportedLanguageId( typeObj.languageId ) )
            return false;
        if ( typeof ( typeObj.typeName ) !== 'string' )
            return false;
        return degreeMap[ typeObj.languageId ].support.includes( typeObj.typeName );
    }

    static isSupportedTypeId ( typeId ) {
        typeId = Number( typeId );
        if ( typeof ( typeId ) !== 'number' )
            throw new TypeError( 'Queried id should be a number.' );
        return DegreeTypeUtils.supportedTypeId.includes( typeId );
    }

    static supportedType ( languageId ) {
        return Array.from( degreeMap[ languageId ].support );
    }

    static get supportedTypeId () {
        return degreeMap[ LanguageUtils.defaultLanguageId ].support.map( ( {}, index ) => index );
    }

    static getTypeId ( typeObj ) {
        if ( typeof ( typeObj.typeName ) !== 'string' )
            throw new TypeError( 'Queried degree should be a string.' );
        if ( !DegreeTypeUtils.isSupportedType( typeObj.typeName, typeObj.languageId ) )
            throw new Error( 'Queried degree is not supported.' );
        return degreeMap[ LanguageUtils.getLanguageId( typeObj.languageId ) ].support.indexOf( typeObj.typeName );
    }

    static getTypeById ( typeObj ) {
        if ( typeof ( typeObj.typeId ) !== 'number' )
            throw new TypeError( 'Queried id should be a number.' );
        if ( !Number.isInteger( typeObj.typeId ) || typeObj.typeId < 0 || typeObj.typeId >= degreeMap[ typeObj.languageId ].support.length )
            throw new RangeError( 'Queried id out of range.' );
        return String( degreeMap[ typeObj.languageId ].support[ typeObj.typeId ] );
    }
}
export default DegreeTypeUtils;
