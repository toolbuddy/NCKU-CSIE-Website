const type = {};
Object.defineProperties( type, {
    'support': {
        value: [
            '資訊系',
            '資訊所',
            '兼任師資',
            '合聘師資',
        ],
    },
    'default': {
        value: '資訊系',
    },
} );

class TypeUtils {
    static get defaultType () {
        return type.default;
    }

    static get defaultTypeId () {
        return type.support.indexOf( type.default );
    }

    static isSupportedType ( typeName ) {
        if ( typeof ( typeName ) !== 'string' )
            throw new TypeError( 'Queried type should be a string.' );
        return type.support.includes( typeName );
    }

    static isSupportedTypeId ( id ) {
        if ( typeof ( Number( id ) ) !== 'number' )
            throw new TypeError( 'Queried id should be a number.' );
        return TypeUtils.supportedTypeId.includes( Number( id ) );
    }

    static get supportedType () {
        return Array.from( type.support );
    }

    static get supportedTypeId () {
        return type.support.map( ( {}, index ) => index );
    }

    static getTypeId ( typeName ) {
        if ( typeof ( typeName ) !== 'string' )
            throw new TypeError( 'Queried type should be a string.' );
        if ( !TypeUtils.isSupportedType( typeName ) )
            throw new Error( 'Queried type is not supported.' );
        return type.support.indexOf( typeName );
    }

    static getTypeById ( id ) {
        if ( typeof ( id ) !== 'number' )
            throw new TypeError( 'Queried id should be a number.' );
        if ( !Number.isInteger( id ) || id < 0 || id >= type.support.length )
            throw new RangeError( 'Queried id out of range.' );
        return String( type.support[ id ] );
    }
}
export default TypeUtils;