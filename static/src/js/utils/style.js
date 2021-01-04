import ValidateUtils from 'models/common/utils/validate.js';

/**
 * Making sure there is no `className` class on the element before adding the `className` class to the classlist.
 */

export function classAdd (element, className) {
    if (!element.classList.contains(className))
        element.classList.add(className);
}

/**
 * Making sure there is `className` class on the element before removing the `className` class from the classlist.
 */

export function classRemove (element, className) {
    if (element.classList.contains(className))
        element.classList.remove(className);
}

/**
 * Delay required milliseconds.
 * @param {number} ms
 * @return {Promise}
 * @throws {TypeError}
 */

export function delay (ms = 1) {
    if (!ValidateUtils.isPositiveInteger(ms))
        throw new TypeError('Parameter `ms` should be a positive integer.');
    return new Promise((res) => {
        setTimeout(res, ms);
    });
}
