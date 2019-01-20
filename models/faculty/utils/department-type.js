import LanguageUtils from 'settings/language/utils.js';
import departmentTypeMap from 'models/faculty/map/department-type.js';

class DepartmentTypeUtils {
    static defaultType ( languageId ) {
        return departmentTypeMap[ languageId ].default;
    }

    static get defaultTypeId () {
        return departmentTypeMap[ LanguageUtils.defaultLanguageId ].support.indexOf( departmentTypeMap[ LanguageUtils.defaultLanguageId ].default );
    }

    static isSupportedType ( typeObj ) {
        if ( typeof ( typeObj.typeName ) !== 'string' )
            throw new TypeError( 'Queried departmentType should be a string.' );
        return departmentTypeMap[ typeObj.languageId ].support.includes( typeObj.typeName );
    }

    static isSupportedTypeId ( typeId ) {
        if ( typeof ( Number( typeId ) ) !== 'number' )
            throw new TypeError( 'Queried id should be a number.' );
        return DepartmentTypeUtils.supportedTypeId.includes( Number( typeId ) );
    }

    static supportedType ( languageId ) {
        return Array.from( departmentTypeMap[ languageId ].support );
    }

    static get supportedTypeId () {
        return departmentTypeMap[ LanguageUtils.defaultLanguageId ].support.map( ( {}, index ) => index );
    }

    static getTypeId ( typeObj ) {
        if ( typeof ( typeObj.typeName ) !== 'string' )
            throw new TypeError( 'Queried departmentType should be a string.' );
        if ( !DepartmentTypeUtils.isSupportedType( typeObj.typeName, typeObj.languageId ) )
            throw new Error( 'Queried departmentType is not supported.' );
        return departmentTypeMap[ LanguageUtils.getLanguageId( typeObj.languageId ) ].support.indexOf( typeObj.typeName );
    }

    static getTypeById ( typeObj ) {
        if ( typeof ( typeObj.typeId ) !== 'number' )
            throw new TypeError( 'Queried id should be a number.' );
        if ( !Number.isInteger( typeObj.typeId ) || typeObj.typeId < 0 || typeObj.typeId >= departmentTypeMap[ typeObj.languageId ].support.length )
            throw new RangeError( 'Queried id out of range.' );
        return String( departmentTypeMap[ typeObj.languageId ].support[ typeObj.typeId ] );
    }
}
export default DepartmentTypeUtils;
