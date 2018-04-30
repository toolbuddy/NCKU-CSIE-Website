/**
 * @function deepFreeze - Recursively freeze object.
 * @param {object} obj  - Target object to be freeze.
 * @return {object}     - Same object passed in.
 */
module.exports = function deepFreeze ( obj ) {
    Object.freeze( obj );
    Reflect.ownKeys( obj ).forEach( ( propertyName ) => {
        const property = obj[ propertyName ];
        if( typeof property === 'object' && !Object.isFrozen( property ) )
            deepFreeze( property );
    } );
    return obj;
};
