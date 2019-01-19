const nation = {};
Object.defineProperties( nation, {
    'support': {
        value: [
            'TW',
            'US',
        ],
    },
    'default': {
        value: 'TW',
    },
} );

class NationUtils {
    static get defaultNation () {
        return nation.default;
    }

    static get defaultNationId () {
        return nation.support.indexOf( nation.default );
    }

    static isSupportedNation ( nationCode ) {
        if ( typeof ( nationCode ) !== 'string' && nationCode.length === 2 )
            throw new TypeError( 'Queried nation should be a string.' );
        return nation.support.includes( nationCode );
    }

    static isSupportedNationId ( id ) {
        if ( typeof ( Number( id ) ) !== 'number' )
            throw new TypeError( 'Queried id should be a number.' );
        return NationUtils.supportedNationId.includes( Number( id ) );
    }

    static get supportedNation () {
        return Array.from( nation.support );
    }

    static get supportedNationId () {
        return nation.support.map( ( {}, index ) => index );
    }

    static getNationId ( nationCode ) {
        if ( typeof ( nationCode ) !== 'string' && nationCode.length === 2 )
            throw new TypeError( 'Queried nation should be a string.' );
        if ( !NationUtils.isSupportedNation( nationCode ) )
            throw new Error( 'Queried nation is not supported.' );
        return nation.support.indexOf( nationCode );
    }

    static getNationById ( id ) {
        if ( typeof ( id ) !== 'number' )
            throw new TypeError( 'Queried id should be a number.' );
        if ( !Number.isInteger( id ) || id < 0 || id >= nation.support.length )
            throw new RangeError( 'Queried id out of range.' );
        return String( nation.support[ id ] );
    }
}
export default NationUtils;