const validate = require('validate.js');

class ValidateUtils {
    static isValidDate ( date ) {
        // TODO: the date can't be parsed as object, but still shouldn't coerce it here
        date = new Date( date );
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
        return ( validate.isInteger( bool ) && ( bool === 0 || bool === 1 ) ) ||
            validate.isBoolean( bool );
    }

    static isValidArray ( arr ) {
        return validate.isArray( arr );
    }
}

module.exports = ValidateUtils;
