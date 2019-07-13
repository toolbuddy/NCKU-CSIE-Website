import validate from 'validate.js';

class ValidateUtils {
    static isValidDate ( date ) {
        return validate.isDate( date ) && !Number.isNaN( Number( date ) );
    }

    static isPositiveInteger ( number ) {
        return validate.isInteger( number ) &&
            number > 0 &&
            number <= Number.MAX_SAFE_INTEGER;
    }

    static isValidId ( number ) {
        return validate.isNumber( number ) &&
            number >= 0 &&
            number <= Number.MAX_SAFE_INTEGER;
    }

    static isDomElement ( element ) {
        return validate.isDomElement( element );
    }

    static isValidString ( str ) {
        return validate.isString( str );
    }

    static isValidBoolean ( bool ) {
        return validate.isInteger( bool ) &&
            ( bool === 0 || bool === 1 );
    }
}

export default ValidateUtils;
