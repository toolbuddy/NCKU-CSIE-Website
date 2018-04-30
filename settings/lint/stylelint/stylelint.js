const indentation = 2;
const emptyLines = 1;
const lineLength = 160;
const maxSelectorId = 1;
const maxSelectorUniversal = 1;
const maxSelectorEmpyLines = 1;
const numberPrecision = 3;
const maxValueListEmptyLines = 0;
const maxFunctionEmptyLines = 0;
module.exports = {
    'rules': {

        /* Possible Errors category*/
        // no empty comment
        'comment-no-empty': true,

        // non invail hex color
        'color-no-invalid-hex': true,

        // no duplicate font names
        'font-family-no-duplicate-names': true,

        // no missing generic families in lists of font family names
        'font-family-no-missing-generic-family-keyword': true,

        // need space before and after each operator
        'function-calc-no-unspaced-operator': true,

        // linear-gradient need to specify color direction
        'function-linear-gradient-no-nonstandard-direction': true,

        // string need to use \A to start a new line
        'string-no-newline': true,

        // no unknown unit
        'unit-no-unknown': true,

        // no unknown property
        'property-no-unknown': true,

        // no !important in keyframe
        'keyframe-declaration-no-important': true,

        // no duplicate properties in selectors
        'declaration-block-no-duplicate-properties': true,

        // specify properties override order(in one selector)
        'declaration-block-no-shorthand-property-overrides': true,

        // no empty block
        'block-no-empty': true,

        // no unknown pseudo selector class
        'selector-pseudo-class-no-unknown': true,

        // no unknown pseudo selector element
        'selector-pseudo-element-no-unknown': true,

        // no unknown selector
        'selector-type-no-unknown': true,

        // no unknown @media
        'media-feature-name-no-unknown': true,

        // no unknown @rule
        'at-rule-no-unknown': true,

        // no empty comment
        'comment-no-empty': true,

        // specifty properties override order(multiple selectors)
        'no-descending-specificity': true,

        // no duplicate import files
        'no-duplicate-at-import-rules': true,

        // no duplicate selectors
        'no-duplicate-selectors': true,

        // no empty source file
        'no-empty-source': true,

        // no extra semicolons
        'no-extra-semicolons': true,

        // no double slash comment(//) for CSS files
        'no-invalid-double-slash-comments': true,

        /* Limit language features category*/

        // no sheme-relative function
        'function-url-no-scheme-relative': true,

        // max decimal precision
        'number-max-precision': numberPrecision,

        // must not use specified unit
        'unit-blacklist': [ 'em', ],

        // no redundant value in shorthand properties
        'shorthand-property-no-redundant-values': true,

        // no vender prefix value
        'value-no-vendor-prefix': true,

        // must not use specified properties
        'property-blacklist': [ 'image-oriention', 'devide-aspect-ratio',
            'device-height', 'device-width', 'Aural', 'azimuth',
            'clip', 'ime-mode', 'scroll-snap-prints-x',
            'scroll-snap-points-y', 'shape', ],

        // no vender prefix properties
        'property-no-vendor-prefix': true,

        // must not use !important
        'declaration-no-important': true,

        // declaration must not only use single line
        'declaration-block-single-line-max-declarations': true,

        // specified class pattern
        'selector-class-pattern':
        '(&|[a-z][a-z0-9]*(-[a-z0-9]+)*)(|--([a-z][a-z0-9]*(-[a-z0-9]+)*))(|__([a-z][a-z0-9]*(-[a-z0-9]+)*)(|--([a-z][a-z0-9]*(-[a-z0-9]+)*)))',

        // specified id pattern
        'selector-id-pattern':
        '([a-z][a-z0-9]*(-[a-z0-9]+)*)(|--([a-z][a-z0-9]*(-[a-z0-9]+)*))(|__([a-z][a-z0-9]*(-[a-z0-9]+)*)(|--([a-z][a-z0-9]*(-[a-z0-9]+)*)))',

        // selector can oly have 1 empty line
        'selector-max-empty-lines': maxSelectorEmpyLines,

        // maximum id selector number
        'selector-max-id': maxSelectorId,

        // maximum universal selector
        'selector-max-universal': maxSelectorUniversal,

        // disallow qualifying a selector by type
        'selector-no-qualifying-type': true,

        // must not use vendor prefix for selector
        'selector-no-vendor-prefix': true,
        'media-feature-name-no-vendor-prefix': true,
        'at-rule-no-vendor-prefix': true,

        'no-unknown-animations': true,

        /* Stylistic issues category*/

        // color hex must use lowercase
        'color-hex-case': 'lower',

        // color hex need 6 length
        'color-hex-length': 'long',

        // must add font family name quote where needed
        'font-family-name-quotes': 'always-where-recommended',

        // yse weiht notation when possible
        'font-weight-notation': 'named-where-possible',

        // need whitespace after function comma
        'function-comma-space-after': 'always',

        // maximum empty line in function
        'function-max-empty-lines': maxFunctionEmptyLines,

        // function name muse use lowercase
        'function-name-case': 'lower',

        // function parentheses need a new line
        'function-parentheses-newline-inside': 'always-multi-line',

        // need space within space parentheses
        'function-parentheses-space-inside': 'always',

        // url need quotes when passing to function argument
        'function-url-quotes': 'always',

        // need whitespace between functions
        'function-whitespace-after': 'always',

        // no leading zero in number format
        'number-leading-zero': 'never',

        // no trailing zeros in number format
        'number-no-trailing-zeros': true,

        // string quotes must use single quote
        'string-quotes': 'single',

        // don't need unit when value is zero
        'length-zero-no-unit': true,

        // unit must use lowercase
        'unit-case': 'lower',

        // value keyword must use lowercase
        'value-keyword-case': 'lower',

        // must have whitespace after comma after in value list
        'value-list-comma-space-after': 'always',

        // maximum empty line in value list
        'value-list-max-empty-lines': maxValueListEmptyLines,

        // property must use lowercase
        'property-case': 'lower',

        // need space before bang
        'declaration-bang-space-before': 'always',

        // need newline after declaration colon
        'declaration-colon-newline-after': 'always-multi-line',

        // need space after declaration colon
        'declaration-colon-space-after': 'always',

        // must have empty before declaration
        'declaration-empty-line-before': 'never',

        // need newline after declaration block semicolon
        'declaration-block-semicolon-newline-after': 'always',

        // need semicolon after declaration
        'declaration-block-trailing-semicolon': 'always',

        // don't need empty line before closing brace
        'block-closing-brace-empty-line-before': 'never',

        // need newline after closing brace
        'block-closing-brace-newline-after': 'always',

        // need newline before closing brace
        'block-closing-brace-newline-before': 'always',

        // don't need space after closing brace
        'block-closing-brace-space-after': 'never',

        // don't need space before closing brace
        'block-closing-brace-space-before': 'never',

        // need newline after opening brace
        'block-opening-brace-newline-after': 'always',

        // need space after opening brace
        'block-opening-brace-space-before': 'always',

        // need space within selector attribute bracket
        'selector-attribute-brackets-space-inside': 'always',

        // need space after selector attribute operator
        'selector-attribute-operator-space-after': 'always',

        // need space before selector attribute operator
        'selector-attribute-operator-space-before': 'always',

        // need quotes in selector attribute
        'selector-attribute-quotes': 'always',

        // need space after selector combinator
        'selector-combinator-space-after': 'always',

        // need space before selector combinator
        'selector-combinator-space-before': 'always',

        // don't need non-space characters for descendant combinators of selectors.
        'selector-descendant-combinator-no-non-space': true,

        // pseudo class must use lowercase
        'selector-pseudo-class-case': 'lower',

        // need space within pseudo class parentheses
        'selector-pseudo-class-parentheses-space-inside': 'always',

        // pseudo element must use lowercase
        'selector-pseudo-element-case': 'lower',

        // pseudo element colon notation must use ::
        'selector-pseudo-element-colon-notation': 'double',

        // selector type must use lowercase
        'selector-type-case': 'lower',

        // need new line after selector-list-comma
        'selector-list-comma-newline-after': 'always-multi-line',

        // need space after selector list comma
        'selector-list-comma-space-after': 'always',

        // need empty line before each rule
        'rule-empty-line-before': 'always',

        // need space after media colon
        'media-feature-colon-space-after': 'always',

        // media name must use lowercase
        'media-feature-name-case': 'lower',

        // need space within media parentheses
        'media-feature-parentheses-space-inside': 'always',

        // need space after media range operator
        'media-feature-range-operator-space-after': 'always',

        // need space after media range operator
        'media-feature-range-operator-space-before': 'always',

        // need new line after media query list
        'media-query-list-comma-newline-after': 'always-multi-line',

        // need space after media query comma
        'media-query-list-comma-space-after': 'always',

        // need empty before @rules
        'at-rule-empty-line-before': 'never',

        // @rules must use lowercase
        'at-rule-name-case': 'lower',

        // need new line after @rules
        'at-rule-name-newline-after': 'always-multi-line',

        // need space after @rules
        'at-rule-name-space-after': 'always-single-line',

        // need new line after @rule semicolon
        'at-rule-semicolon-newline-after': 'always',

        // must need empty line before comment
        'comment-empty-line-before': 'always',

        // must need space within comment
        'comment-whitespace-inside': 'always',

        // specify indentation
        'indentation': indentation,

        // specify maximum empty line
        'max-empty-lines': emptyLines,

        // specify maximum line length
        'max-line-length': lineLength,

        // must not have whitespace at end of line
        'no-eol-whitespace': true,

        // need new line at end of source file
        'no-missing-end-of-source-newline': true,

    },
};
