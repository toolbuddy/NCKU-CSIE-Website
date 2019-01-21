import LanguageUtils from 'settings/language/utils.js';
import projectCategoryMap from 'models/faculty/map/project-category.js';

class ProjectCategoryUtils {
    static defaultType ( languageId ) {
        return projectCategoryMap[ languageId ].default;
    }

    static get defaultTypeId () {
        return projectCategoryMap[ LanguageUtils.defaultLanguageId ].support.indexOf( projectCategoryMap[ LanguageUtils.defaultLanguageId ].default );
    }

    static isSupportedType ( typeObj ) {
        //if ( typeof ( typeObj.typeName ) !== 'string' )
        //    throw new TypeError( 'Queried projectType should be a string.' );
        if ( typeof ( typeObj.typeName ) !== 'string' )
            return false;
        return projectCategoryMap[ typeObj.languageId ].support.includes( typeObj.typeName );
    }

    static isSupportedTypeId ( typeId ) {
        //if ( typeof ( Number( typeId ) ) !== 'number' )
        //    throw new TypeError( 'Queried id should be a number.' );
        return ProjectCategoryUtils.supportedTypeId.includes( typeId );
    }

    static supportedType ( languageId ) {
        return Array.from( projectCategoryMap[ languageId ].support );
    }

    static get supportedTypeId () {
        return projectCategoryMap[ LanguageUtils.defaultLanguageId ].support.map( ( {}, index ) => index );
    }

    static getTypeId ( typeObj ) {
        if ( typeof ( typeObj.typeName ) !== 'string' )
            throw new TypeError( 'Queried projectType should be a string.' );
        if ( !ProjectCategoryUtils.isSupportedType( typeObj ) )
            throw new Error( 'Queried projectType is not supported.' );
        return projectCategoryMap[ typeObj.languageId ].support.indexOf( typeObj.typeName );
    }

    static getTypeById ( typeObj ) {
        if ( typeof ( typeObj.typeId ) !== 'number' )
            throw new TypeError( 'Queried id should be a number.' );
        if ( !Number.isInteger( typeObj.typeId ) || typeObj.typeId < 0 || typeObj.typeId >= projectCategoryMap[ typeObj.languageId ].support.length )
            throw new RangeError( 'Queried id out of range.' );
        return String( projectCategoryMap[ typeObj.languageId ].support[ typeObj.typeId ] );
    }
}
export default ProjectCategoryUtils;
