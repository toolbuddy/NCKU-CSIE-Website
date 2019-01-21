const validTags = Object.freeze( [
    'award',
    'college',
    'competition',
    'conference',
    'course',
    'exhibition',
    'faculty',
    'international',
    'internship',
    'master',
    'phd',
    'recruitment',
    'rule',
    'scholarship',
    'speech',
] );

export default {
    isValidTags ( tags ) {
        return tags.filter( tag => validTags.indexOf( tag ) < 0 ).length === 0;
    },

    isValidDate ( date ) {
        return date instanceof Date && !Number.isNaN( date );
    },

    isValidPage ( page ) {
        return !Number.isNaN( Number( page ) ) && Number.isInteger( Number( page ) ) && Number( page ) > 0;
    },
};
