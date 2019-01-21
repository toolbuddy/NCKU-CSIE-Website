import LanguageUtils from 'settings/language/utils.js';
import researchGroupTypeMap from 'models/faculty/map/research-group-type.js';

class ResearchTypeUtils {
    static defaultType ( languageId ) {
        return researchGroupTypeMap[ languageId ].default;
    }

    static get defaultTypeId () {
        return researchGroupTypeMap[ LanguageUtils.defaultLanguageId ].support.indexOf( researchGroupTypeMap[ LanguageUtils.defaultLanguageId ].default );
    }

    static isSupportedType ( typeObj ) {
        if ( typeof ( typeObj.typeName ) !== 'string' )
            throw new TypeError( 'Queried researchType should be a string.' );
        return researchGroupTypeMap[ typeObj.languageId ].support.includes( typeObj.typeName );
    }

    static isSupportedTypeId ( typeId ) {
        if ( typeof ( Number( typeId ) ) !== 'number' )
            throw new TypeError( 'Queried id should be a number.' );
        return ResearchTypeUtils.supportedTypeId.includes( Number( typeId ) );
    }

    static supportedType ( languageId ) {
        return Array.from( researchGroupTypeMap[ languageId ].support );
    }

    static get supportedTypeId () {
        return researchGroupTypeMap[ LanguageUtils.defaultLanguageId ].support.map( ( {}, index ) => index );
    }

    static getTypeId ( typeObj ) {
        if ( typeof ( typeObj.typeName ) !== 'string' )
            throw new TypeError( 'Queried researchType should be a string.' );
        if ( !ResearchTypeUtils.isSupportedType( typeObj.typeName, typeObj.languageId ) )
            throw new Error( 'Queried researchType is not supported.' );
        return researchGroupTypeMap[ LanguageUtils.getLanguageId( typeObj.languageId ) ].support.indexOf( typeObj.typeName );
    }

    static getTypeById ( typeObj ) {
        if ( typeof ( typeObj.typeId ) !== 'number' )
            throw new TypeError( 'Queried id should be a number.' );
        if ( !Number.isInteger( typeObj.typeId ) || typeObj.typeId < 0 || typeObj.typeId >= researchGroupTypeMap[ typeObj.languageId ].support.length )
            throw new RangeError( 'Queried id out of range.' );
        return String( researchGroupTypeMap[ typeObj.languageId ].support[ typeObj.typeId ] );
    }
}
export default ResearchTypeUtils;
