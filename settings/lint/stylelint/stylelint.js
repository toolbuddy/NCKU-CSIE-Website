const indentation = 2;
const emptyLines = 1;
const lineLength = 160;
const maxSelectorId = 1;
const maxDeclaration = 1;
const maxSelectorUniversal = 1;
const maxSelectorEmpyLines = 1;
const numberPrecision = 4;
const maxValueListEmptyLines = 0;
const maxFunctionEmptyLines = 0;
module.exports = {
    'plugins': [ 'stylelint-scss', ],
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

        // one line can have only one declaration
        'declaration-block-single-line-max-declarations': maxDeclaration,

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
        'declaration-colon-space-after': 'always-single-line',

        // don't need space before declaration colon
        'declaration-colon-space-before': 'never',

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
        'block-closing-brace-space-after': 'never-single-line',

        // need space before closing brace
        'block-closing-brace-space-before': 'always-single-line',

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

        /** stylelint-scss plugin rules */
        // There must always be a newline after the closing brace of @else
        // that is the last statement in a conditional statement chain.
        // If it's not, there must not be a newline.
        'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',

        // There must never be a whitespace after the closing brace of @else
        // that is not the last statement in a conditional statement chain.
        'scss/at-else-closing-brace-space-after': 'never-intermediate',

        // There must never be an empty line before @else statements.
        'scss/at-else-empty-line-before': 'never',

        // There must always be exactly one space
        // between the @else if and the condition opening parenthesis.
        'scss/at-else-if-parentheses-space-before': 'always',

        // Disallow at-extends (@extend) with missing placeholders.
        'scss/at-extend-no-missing-placeholder': true,

        // Require named parameters in SCSS function call rule.
        'scss/at-function-named-arguments': [ 'always', { 'ignore': [ 'single-argument', ], }, ],

        // There must always be exactly one space
        // between the function name and the opening parenthesis.
        'scss/at-function-parentheses-space-before': 'always',

        // Disallow leading underscore in partial names in @import.
        'scss/at-import-no-partial-leading-underscore': true,

        // There must always be parentheses in mixin calls, even if no arguments are passed.
        'scss/at-mixin-argumentless-call-parentheses': 'always',

        // Require named parameters in at-mixin call rule.
        'scss/at-mixin-named-arguments': [ 'always', { 'ignore': [ 'single-argument', ], }, ],

        // There must always be exactly one space
        // between the mixin name and the opening parenthesis.
        'scss/at-mixin-parentheses-space-before': 'always',

        // Specify a pattern for Sass/SCSS-like mixin names.
        'scss/at-mixin-pattern':
        '(&|[a-z][a-z0-9]*(-[a-z0-9]+)*)(|--([a-z][a-z0-9]*(-[a-z0-9]+)*))(|__([a-z][a-z0-9]*(-[a-z0-9]+)*)(|--([a-z][a-z0-9]*(-[a-z0-9]+)*)))',

        // Disallow unknown at-rules.
        // This rule is basically a wrapper around the mentioned core rule,
        // but with added SCSS-specific @-directives.
        'scss/at-rule-no-unknown': true,

        // There must always be a newline after the colon
        // if the variable value is multi-line.
        'scss/dollar-variable-colon-newline-after': 'always-multi-line',

        // There must always be a single space after the colon
        // if the variable value is single-line.
        'scss/dollar-variable-colon-space-after': 'always-single-line',

        // There must never be whitespace before the colon.
        'scss/dollar-variable-colon-space-before': 'never',

        // There must always be one empty line before a $-variable declaration.
        'scss/dollar-variable-empty-line-before': [ 'always', {
            'except': [

                // Reverse the primary option for a $-variable declaration
                // if it's the first child of its parent.
                'first-nested',

                // Reverse the primary option for $-variable declarations
                // that go right after another $-variable declaration.
                'after-dollar-variable',
            ],
            'ignore': [

                // Ignore $-variables that go after a comment.
                'after-comment',

                // Ignore $-variables that are inside single-line blocks.
                'inside-single-line-block',
            ],
        }, ],

        // Disallow Sass variables that are used without interpolation
        // with CSS features that use custom identifiers.
        'scss/dollar-variable-no-missing-interpolation': true,

        // There must always be an empty line before //-comments.
        'scss/double-slash-comment-empty-line-before': [ 'always', {
            'except': [

                // Reverse the primary option for //-comments
                // that are nested and the first child of their parent node.
                'first-nested',
            ],
            'ignore': [

                // Don't require an empty line before //-comments
                // that are placed after other //-comments or CSS comments.
                'between-comments',

                // Ignore //-comments that deliver commands to stylelint
                'stylelint-commands',
            ],
        }, ],

        // //-comments must always be inline comments.
        'scss/double-slash-comment-inline': [ 'never', {

            // Ignore //-comments that deliver commands to stylelint.
            'ignore': [ 'stylelint-commands', ],
        }, ],

        // There must always be whitespace after the // inside //-comments.
        'scss/double-slash-comment-whitespace-inside': 'always',

        // Require or disallow properties with - in their names to be in a form of a nested group.
        'scss/declaration-nested-properties': [ 'always', {

            // Works only with "always" and reverses its effect for a property
            // if it is the only one with the corresponding "namespace" in a ruleset.
            'except': [ 'only-of-namespace', ],
        }, ],

        // Disallow nested properties of the same "namespace" be divided into multiple groups.
        'scss/declaration-nested-properties-no-divided-groups': true,

        // Disallow unspaced operators in Sass operations.
        'scss/operator-no-unspaced': true,

        // Disallow redundant nesting selectors (&).
        'scss/selector-no-redundant-nesting-selector': true,

        // Disallow duplicate dollar variables within a stylesheet.
        'scss/no-duplicate-dollar-variables': true,
    },
};
