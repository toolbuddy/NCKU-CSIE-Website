import header from 'static/src/js/components/common/header/index.js';
import { multipleDefaultTagsFilter, } from 'static/src/js/components/announcement/filter/index.js';

header( document.getElementById( 'header' ) );

// Construct filter with no default tags.
multipleDefaultTagsFilter(
    [],
    document.getElementById( 'announcement__brefings--top' ),
    document.getElementById( 'announcement__brefings' ),
    6,
    6,
    document.getElementById( 'filter__tags' ),
    [
        'all',
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
    ]
);
