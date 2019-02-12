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

    static isDomElement ( element ) {
        return validate.isDomElement( element );
    }
}

export default ValidateUtils;
