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

module.exports = {
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
