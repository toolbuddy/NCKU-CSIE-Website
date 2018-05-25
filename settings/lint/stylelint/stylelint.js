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
    plugins: [ 'stylelint-scss', ],
    rules:   {
        /* Possible Errors category*/
        // no empty comment
        'comment-no-empty': true,

        // Non invail hex color
        'color-no-invalid-hex': true,

        // No duplicate font names
        'font-family-no-duplicate-names': true,

        // No missing generic families in lists of font family names
        'font-family-no-missing-generic-family-keyword': true,

        // Need space before and after each operator
        'function-calc-no-unspaced-operator': true,

        // Linear-gradient need to specify color direction
        'function-linear-gradient-no-nonstandard-direction': true,

        // String need to use \A to start a new line
        'string-no-newline': true,

        // No unknown unit
        'unit-no-unknown': true,

        // No unknown property
        'property-no-unknown': true,

        // No !important in keyframe
        'keyframe-declaration-no-important': true,

        // No duplicate properties in selectors
        'declaration-block-no-duplicate-properties': true,

        // Specify properties override order(in one selector)
        'declaration-block-no-shorthand-property-overrides': true,

        // No empty block
        'block-no-empty': true,

        // No unknown pseudo selector class
        'selector-pseudo-class-no-unknown': true,

        // No unknown pseudo selector element
        'selector-pseudo-element-no-unknown': true,

        // No unknown selector
        'selector-type-no-unknown': true,

        // No unknown @media
        'media-feature-name-no-unknown': true,

        // No duplicate import files
        'no-duplicate-at-import-rules': true,

        // No duplicate selectors
        'no-duplicate-selectors': true,

        // No empty source file
        'no-empty-source': true,

        // No extra semicolons
        'no-extra-semicolons': true,

        // No double slash comment(//) for CSS files
        'no-invalid-double-slash-comments': true,

        /* Limit language features category*/

        // no sheme-relative function
        'function-url-no-scheme-relative': true,

        // Max decimal precision
        'number-max-precision': numberPrecision,

        // Must not use specified unit
        'unit-blacklist': [ 'em', ],

        // No redundant value in shorthand properties
        'shorthand-property-no-redundant-values': true,

        // No vender prefix value
        'value-no-vendor-prefix': true,

        // Must not use specified properties
        'property-blacklist': [ 'image-oriention',
            'devide-aspect-ratio',
            'device-height',
            'device-width',
            'Aural',
            'azimuth',
            'clip',
            'ime-mode',
            'scroll-snap-prints-x',
            'scroll-snap-points-y',
            'shape', ],

        // No vender prefix properties
        'property-no-vendor-prefix': true,

        // Must not use !important
        'declaration-no-important': true,

        // One line can have only one declaration
        'declaration-block-single-line-max-declarations': maxDeclaration,

        // Specified class pattern
        'selector-class-pattern':
        '(&|[a-z][a-z0-9]*(-[a-z0-9]+)*)(|--([a-z][a-z0-9]*(-[a-z0-9]+)*))(|__([a-z][a-z0-9]*(-[a-z0-9]+)*)(|--([a-z][a-z0-9]*(-[a-z0-9]+)*)))',

        // Specified id pattern
        'selector-id-pattern':
        '([a-z][a-z0-9]*(-[a-z0-9]+)*)(|--([a-z][a-z0-9]*(-[a-z0-9]+)*))(|__([a-z][a-z0-9]*(-[a-z0-9]+)*)(|--([a-z][a-z0-9]*(-[a-z0-9]+)*)))',

        // Selector can oly have 1 empty line
        'selector-max-empty-lines': maxSelectorEmpyLines,

        // Maximum id selector number
        'selector-max-id': maxSelectorId,

        // Maximum universal selector
        'selector-max-universal': maxSelectorUniversal,

        // Disallow qualifying a selector by type
        'selector-no-qualifying-type': true,

        // Must not use vendor prefix for selector
        'selector-no-vendor-prefix':           true,
        'media-feature-name-no-vendor-prefix': true,
        'at-rule-no-vendor-prefix':            true,

        'no-unknown-animations': true,

        /* Stylistic issues category*/

        // color hex must use lowercase
        'color-hex-case': 'lower',

        // Color hex need 6 length
        'color-hex-length': 'long',

        // Must add font family name quote where needed
        'font-family-name-quotes': 'always-where-recommended',

        // Yse weiht notation when possible
        'font-weight-notation': 'named-where-possible',

        // Need whitespace after function comma
        'function-comma-space-after': 'always',

        // Maximum empty line in function
        'function-max-empty-lines': maxFunctionEmptyLines,

        // Function name muse use lowercase
        'function-name-case': 'lower',

        // Function parentheses need a new line
        'function-parentheses-newline-inside': 'always-multi-line',

        // Need space within space parentheses
        'function-parentheses-space-inside': 'always',

        // Url need quotes when passing to function argument
        'function-url-quotes': 'always',

        // Need whitespace between functions
        'function-whitespace-after': 'always',

        // No leading zero in number format
        'number-leading-zero': 'never',

        // No trailing zeros in number format
        'number-no-trailing-zeros': true,

        // String quotes must use single quote
        'string-quotes': 'single',

        // Don't need unit when value is zero
        'length-zero-no-unit': true,

        // Unit must use lowercase
        'unit-case': 'lower',

        // Value keyword must use lowercase
        'value-keyword-case': 'lower',

        // Must have whitespace after comma after in value list
        'value-list-comma-space-after': 'always',

        // Maximum empty line in value list
        'value-list-max-empty-lines': maxValueListEmptyLines,

        // Property must use lowercase
        'property-case': 'lower',

        // Need space before bang
        'declaration-bang-space-before': 'always',

        // Need newline after declaration colon
        'declaration-colon-newline-after': 'always-multi-line',

        // Need space after declaration colon
        'declaration-colon-space-after': 'always-single-line',

        // Don't need space before declaration colon
        'declaration-colon-space-before': 'never',

        // Must have empty before declaration
        'declaration-empty-line-before': 'never',

        // Need newline after declaration block semicolon
        'declaration-block-semicolon-newline-after': 'always',

        // Need semicolon after declaration
        'declaration-block-trailing-semicolon': 'always',

        // Don't need empty line before closing brace
        'block-closing-brace-empty-line-before': 'never',

        // Need newline after closing brace
        'block-closing-brace-newline-after': 'always',

        // Need newline before closing brace
        'block-closing-brace-newline-before': 'always',

        // Don't need space after closing brace
        'block-closing-brace-space-after': 'never-single-line',

        // Need space before closing brace
        'block-closing-brace-space-before': 'always-single-line',

        // Need newline after opening brace
        'block-opening-brace-newline-after': 'always',

        // Need space after opening brace
        'block-opening-brace-space-before': 'always',

        // Need space within selector attribute bracket
        'selector-attribute-brackets-space-inside': 'always',

        // Need space after selector attribute operator
        'selector-attribute-operator-space-after': 'always',

        // Need space before selector attribute operator
        'selector-attribute-operator-space-before': 'always',

        // Need quotes in selector attribute
        'selector-attribute-quotes': 'always',

        // Need space after selector combinator
        'selector-combinator-space-after': 'always',

        // Need space before selector combinator
        'selector-combinator-space-before': 'always',

        // Don't need non-space characters for descendant combinators of selectors.
        'selector-descendant-combinator-no-non-space': true,

        // Pseudo class must use lowercase
        'selector-pseudo-class-case': 'lower',

        // Need space within pseudo class parentheses
        'selector-pseudo-class-parentheses-space-inside': 'always',

        // Pseudo element must use lowercase
        'selector-pseudo-element-case': 'lower',

        // Pseudo element colon notation must use ::
        'selector-pseudo-element-colon-notation': 'double',

        // Selector type must use lowercase
        'selector-type-case': 'lower',

        // Need new line after selector-list-comma
        'selector-list-comma-newline-after': 'always-multi-line',

        // Need space after selector list comma
        'selector-list-comma-space-after': 'always',

        // Need empty line before each rule
        'rule-empty-line-before': 'always',

        // Need space after media colon
        'media-feature-colon-space-after': 'always',

        // Media name must use lowercase
        'media-feature-name-case': 'lower',

        // Need space within media parentheses
        'media-feature-parentheses-space-inside': 'always',

        // Need space after media range operator
        'media-feature-range-operator-space-after': 'always',

        // Need space after media range operator
        'media-feature-range-operator-space-before': 'always',

        // Need new line after media query list
        'media-query-list-comma-newline-after': 'always-multi-line',

        // Need space after media query comma
        'media-query-list-comma-space-after': 'always',

        // Need empty before @rules
        'at-rule-empty-line-before': 'never',

        // @rules must use lowercase
        'at-rule-name-case': 'lower',

        // Need new line after @rules
        'at-rule-name-newline-after': 'always-multi-line',

        // Need space after @rules
        'at-rule-name-space-after': 'always-single-line',

        // Need new line after @rule semicolon
        'at-rule-semicolon-newline-after': 'always',

        // Must need empty line before comment
        'comment-empty-line-before': 'always',

        // Must need space within comment
        'comment-whitespace-inside': 'always',

        // Specify indentation
        indentation,

        // Specify maximum empty line
        'max-empty-lines': emptyLines,

        // Specify maximum line length
        'max-line-length': lineLength,

        // Must not have whitespace at end of line
        'no-eol-whitespace': true,

        // Need new line at end of source file
        'no-missing-end-of-source-newline': true,

        /** Stylelint-scss plugin rules */
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
        'scss/at-function-named-arguments': [ 'always',
            { ignore: [ 'single-argument', ], }, ],

        // There must always be exactly one space
        // between the function name and the opening parenthesis.
        'scss/at-function-parentheses-space-before': 'always',

        // Disallow leading underscore in partial names in @import.
        'scss/at-import-no-partial-leading-underscore': true,

        // There must always be parentheses in mixin calls, even if no arguments are passed.
        'scss/at-mixin-argumentless-call-parentheses': 'always',

        // Require named parameters in at-mixin call rule.
        'scss/at-mixin-named-arguments': [ 'always',
            { ignore: [ 'single-argument', ], }, ],

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
        'scss/dollar-variable-empty-line-before': [ 'always',
            {
                except: [

                // Reverse the primary option for a $-variable declaration
                // if it's the first child of its parent.
                    'first-nested',

                    // Reverse the primary option for $-variable declarations
                    // that go right after another $-variable declaration.
                    'after-dollar-variable',
                ],
                ignore: [

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
        'scss/double-slash-comment-empty-line-before': [ 'always',
            {
                except: [

                // Reverse the primary option for //-comments
                // that are nested and the first child of their parent node.
                    'first-nested',
                ],
                ignore: [

                // Don't require an empty line before //-comments
                // that are placed after other //-comments or CSS comments.
                    'between-comments',

                    // Ignore //-comments that deliver commands to stylelint
                    'stylelint-commands',
                ],
            }, ],

        // //-comments must always be inline comments.
        'scss/double-slash-comment-inline': [ 'never',
            {

            // Ignore //-comments that deliver commands to stylelint.
                ignore: [ 'stylelint-commands', ],
            }, ],

        // There must always be whitespace after the // inside //-comments.
        'scss/double-slash-comment-whitespace-inside': 'always',

        // Require or disallow properties with - in their names to be in a form of a nested group.
        'scss/declaration-nested-properties': [ 'always',
            {

            // Works only with "always" and reverses its effect for a property
            // if it is the only one with the corresponding "namespace" in a ruleset.
                except: [ 'only-of-namespace', ],
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
