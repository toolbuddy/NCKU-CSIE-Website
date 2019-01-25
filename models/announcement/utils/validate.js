class ValidateUtils {
    static isValidDate ( date ) {
        return date instanceof Date && !Number.isNaN( date );
    }

    static isValidNumber ( page ) {
        return !Number.isNaN( Number( page ) ) &&
            Number.isInteger( Number( page ) ) &&
            Number( page ) > 0 &&
            page < Number.MAX_SAFE_INTEGER;
    }
}

export default ValidateUtils;
