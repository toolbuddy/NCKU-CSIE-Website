export function isValidDate ( date ) {
    return date instanceof Date && !Number.isNaN( date );
}

export function isValidPage ( page ) {
    return !Number.isNaN( Number( page ) ) && Number.isInteger( page ) && page > 0;
}

const validTags = Object.freeze( [
    'college',
    'competition',
    'conference',
    'course',
    'exhibition',
    'international',
    'internship',
    'master',
    'phd',
    'recruitment',
    'rule',
    'scholarship',
    'speech',
    'teacher',
] );

export function isValidTags ( tags ) {
    return tags.filter( tag => validTags.indexOf( tag ) < 0 ).length === 0;
}
