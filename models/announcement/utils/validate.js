import validate from 'validate.js';
class ValidateUtils {
    static isValidDate ( date ) {
        return validate.isDate( date );
    }

    static isValidNumber ( page ) {
        return validate.isInteger( page ) &&
            page > 0 &&
            page < Number.MAX_SAFE_INTEGER;
    }
}

export default ValidateUtils;
