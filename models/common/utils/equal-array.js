/**
 * EqualArray module.
 *
 * To compare if two arrays are the same in both length, element content and element order.
 * @param {array}   a  - First array.
 * @param {array}   b  - Second array.
 * @returns {boolean}  - If two arrays are the same.
 */

module.exports = (a, b) => {
    if (a === b)
        return true;
    if (a === null || b === null)
        return false;
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i])
            return false;
    }

    return true;
};
