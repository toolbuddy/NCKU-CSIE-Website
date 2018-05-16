const ecmaVersion = 8;
const indentation = 4;

module.exports = {

    // Setting ECMAScript running environment
    'env': {
        'browser': true,
        'es6': true,
        'worker': true,
    },

    // ECMAScript parser option
    'parserOptions': {

        // ECMAScript syntax version
        'ecmaVersion': ecmaVersion,

        // Code will run as ECMAScript module
        'sourceType': 'module',

        // Additional language feature
        'ecmaFeatures': {

            // Enable global strict mode
            'impliedStrict': true,
        },
    },
    'rules': {

        /** Possible Errors */
        // Enforce `for` loop update clause moving the counter in the right direction.
        'for-direction': 'error',

        // Enforces that a return statement is present in property getters.
        'getter-return': [
            'error',
            {

                // Allows implicitly returning undefined with a `return;` statement.
                'allowImplicit': true,
            },
        ],

        // Disallow comparing against `-0`.
        'no-compare-neg-zero': 'error',

        // Disallow assignment operators in conditional statements.
        'no-cond-assign': [
            'error',

            // Disallows all assignments in test conditions.
            'always',
        ],

        // Disallow the use of `console`.
        'no-console': 'error',

        // Disallow constant expressions in conditions.
        'no-constant-condition': [
            'error',
            {

                // Allows constant expressions in loops.
                'checkLoops': false,
            },
        ],

        // Disallow control characters in regular expressions.
        'no-control-regex': 'error',

        // Disallow the use of `debugger`.
        'no-debugger': 'error',

        // Disallow duplicate arguments in function definitions.
        'no-dupe-args': 'error',

        // Disallow duplicate keys in object literals.
        'no-dupe-keys': 'error',

        // Disallow a duplicate case label.
        'no-duplicate-case': 'error',

        // Disallow empty block statements.
        'no-empty': [
            'error',
            {

                // Allows empty catch clauses.
                'allowEmptyCatch': true,
            },
        ],

        // Disallow empty character classes in regular expressions.
        'no-empty-character-class': 'error',

        // Disallow reassigning exceptions in catch clauses.
        'no-ex-assign': 'error',

        // Disallow unnecessary boolean casts.
        'no-extra-boolean-cast': 'error',

        // Disallow unnecessary semicolons.
        'no-extra-semi': 'error',

        // Disallow reassigning function declarations.
        'no-func-assign': 'error',

        // Disallow variable or function declarations in nested blocks.
        'no-inner-declarations': [
            'error',

            // Disallows `function` and `var` declarations in nested blocks.
            'both',
        ],

        // Disallow invalid regular expression strings in `RegExp` constructors.
        'no-invalid-regexp': 'error',

        // Disallow irregular whitespace.
        'no-irregular-whitespace': 'error',

        // Disallow calling global object properties as functions.
        // This rule disallows calling the `Math`, `JSON` and `Reflect` objects as functions.
        'no-obj-calls': 'error',

        // Disallow use of `Object.prototypes` builtins directly.
        'no-prototype-builtins': 'error',

        // Disallow multiple spaces in regular expression literals.
        'no-regex-spaces': 'error',

        // Disallow sparse arrays.
        'no-sparse-arrays': 'error',

        // Disallow template literal placeholder syntax in regular strings.
        'no-template-curly-in-string': 'error',

        // Disallow confusing multiline expressions.
        'no-unexpected-multiline': 'error',

        // Disallow unreachable code after `return`, `throw`, `continue`, and `break` statements.
        'no-unreachable': 'error',

        // Disallow control flow statements in finally blocks.
        'no-unsafe-finally': 'error',

        // Disallow negating the left operand of relational operators.
        'no-unsafe-negation': 'error',

        // Require calls to `isNaN()` when checking for `NaN`.
        'use-isnan': 'error',

        // Enforce valid JSDoc comments.
        // 'valid-jsdoc': 'error',

        // Enforce comparing `typeof` expressions against valid strings.
        'valid-typeof': 'error',

        /** Best Practice */
        // Enforces `return` statements in callbacks of array’s methods.
        'array-callback-return': [
            'error',
            {

                // Allows implicitly returning `undefined`
                // with a `return` statement containing no expression.
                allowImplicit: true,
            },
        ],

        // Treat `var` as Block Scoped.
        'block-scoped-var': 'error',

        // Enforce that class methods utilize `this`.
        'class-methods-use-this': 'error',

        // Require `return` statements to either always or never specify values.
        'consistent-return': 'error',

        // Require following curly brace conventions.
        'curly': [
            'error',

            // Forces brace-less `if`, `else if`, `else`, `for`, `while`, or `do`
            // if their body contains only one single-line statement.
            // And forces braces in all other cases.
            'multi-or-nest',
        ],

        // Require `default` case in `switch` statements.
        'default-case': 'error',

        // Require dot notation.
        'dot-notation': 'error',

        // Require `===` and `!==`.
        'eqeqeq': [
            'error',

            // The "smart" option enforces the use of `===` and `!==` except for these cases:
            // * Comparing two literal values
            // * Evaluating the value of `typeof`
            // * Comparing against `null`
            'smart',
        ],

        // Require guarding `for-in`.
        'guard-for-in': 'error',

        // Disallow use of `alert`.
        'no-alert': 'error',

        // Disallow use of `caller` and `callee`.
        'no-caller': 'error',

        // Disallow regular expressions that look like division.
        'no-div-regex': 'error',

        // Disallow `return` before `else`.
        'no-else-return': [
            'error',
            {

                // Allows `else if` blocks after a `return`.
                'allowElseIf': true,
            },
        ],

        // Disallow empty functions.
        'no-empty-function': 'error',

        // Disallow empty destructuring patterns.
        'no-empty-pattern': 'error',

        // Disallow `eval()`.
        'no-eval': 'error',

        // Disallow Extending of Native Objects.
        'no-extend-native': 'error',

        // Disallow unnecessary function binding.
        'no-extra-bind': 'error',

        // Disallow unnecessary labels.
        'no-extra-label': 'error',

        // Disallow floating decimals.
        'no-floating-decimal': 'error',

        // Disallow assignment to native objects or read-only global variables
        'no-global-assign': 'error',


        // Disallow variable and function declarations in the global scope.
        'no-implicit-globals': 'error',

        // Disallow the type conversion with shorter notations.
        'no-implicit-coercion': 'error',

        // Disallow implied `eval()`.
        'no-implied-eval': 'error',

        // Disallow this keywords outside of classes or class-like objects.
        'no-invalid-this': 'error',

        // Disallow `__iterator__`.
        'no-iterator': 'error',

        // Disallow labeled statements.
        'no-labels': 'error',

        // Disallow unnecessary nested blocks
        'no-lone-blocks': 'error',

        // Disallow functions in loops.
        'no-loop-func': 'error',

        // Disallow magic numbers.
        'no-magic-numbers': [
            'error',
            {

                // An array of numbers to ignore.
                'ignore': [ 1, ],

                // Array indexes are considered okay.
                'ignoreArrayIndexes': true,
            },
        ],

        // Disallow multiple spaces.
        'no-multi-spaces': [
            'error',
            {

                // Ignores multiple spaces before comments that occur at the end of lines.
                'ignoreEOLComments': true,

                // Specifies nodes to ignore.
                'exceptions': {

                    // Ignore property spaceing.
                    'Property': true,

                    // Ignore variable declarator spaceing.
                    'VariableDeclarator': true,

                    // Ignore import decalration spaceing.
                    'ImportDeclaration': true,
                },
            },
        ],

        // Disallow multiline strings.
        'no-multi-str': 'error',

        // Disallow `new` for side effects.
        'no-new': 'error',

        // Disallow function constructor.
        'no-new-func': 'error',

        // Disallow primitive wrapper instances.
        'no-new-wrappers': 'error',

        // Disallow octal literals.
        'no-octal': 'error',

        // Disallow octal escape sequences in string literals.
        'no-octal-escape': 'error',

        // Disallow use of `__proto__`.
        'no-proto': 'error',

        // Disallow variable redeclaration.
        'no-redeclare': [
            'error',
            {

                // Checks redeclaration of built-in globals.
                'builtinGlobals': true,
            },
        ],

        // Disallow assignment in `return` statement.
        'no-return-assign': [
            'error',

            // Disallows all assignments in `return` statements.
            'always',
        ],

        // Disallows unnecessary `return await`.
        'no-return-await': 'error',

        // Disallow script URLs.
        'no-script-url': 'error',


        //
        'linebreak-style': [ 'error', 'unix', ],

        // any comment must begin with one space
        'spaced-comment': 'error',

        // need to use -(a) instead of -a
        'no-negated-in-lhs': 'error',

        // must use space at { and }
        'object-curly-spacing': [
            'error',
            'always',
        ],

        // each property need whitespace before and after
        'computed-property-spacing': [
            'error',
            'always',
        ],

        // must use space at [ and ]
        'array-bracket-spacing': [
            'error',
            'always',
        ],

        // can't have unused expressions
        'no-unused-expressions': 'error',

        // can't have ternary operator inside ternary operator
        'no-nested-ternary': 'error',

        // must use () to surround IIFE
        'wrap-iife': [
            'error',
            'inside',
        ],

        // allow using single quote and backtick as string
        'quotes': [
            'error',
            'single',
        ],

        // can't use variable that not declare
        'no-undef': 'error',

        // can't left any variable unused
        'no-unused-vars': 'error',

        // operator linebreak must add at the end of the line
        // like a = b +
        //         c;
        'operator-linebreak': [
            'error',
            'after',
        ],

        // object comma(,) must add at the end of the line
        'comma-style': [
            'error',
            'last',
        ],

        // maximum length of a line
        // ignore URL, comment, and regular expression length
        'max-len': [
            'error',
            {
                'code': 160,
                'ignoreUrls': true,
                'ignoreRegExpLiterals': true,
            },
        ],

        'no-mixed-spaces-and-tabs': 'error',

        // can't left whitespace and tab at the end of the line
        'no-trailing-spaces': 'error',

        // can't left comma(,) after the last object properties
        'comma-dangle': [
            'error',
            'always',
            {
                'functions': 'never',
            },
        ],

        // need space after each comma(,)
        'comma-spacing': [
            'error',
            {
                'before': false,
                'after': true,
            },
        ],

        // whitespace indentation
        'indent': [
            'error',
            indentation,
        ],

        // need to add space before {}
        'space-before-blocks': [
            'error',
            'always',
        ],

        // need space at parentheses
        'space-in-parens': [
            'error',
            'always',
        ],

        // need ; at the end of the statement
        'semi': [
            'error',
            'always',
        ],

        // need space after semicolon(;),use it at for-loop
        'semi-spacing': [
            'error',
            {
                'after': true,
            },
        ],

        // must add a empty at the end of the file
        'eol-last': 'error',

        // must add a empty line at comment line, like
        //
        // Here is a comment line
        'lines-around-comment': [
            'error',
            {
                'beforeLineComment': true,
            },
        ],

        // can't use with
        'no-with': 'error',

        // enfore brace({}) using style, currently using
        // a(){
        // }
        'brace-style': 'error',

        // no arguments
        'prefer-rest-params': 'error',

        // can't use var as variable declaration
        'no-var': 'error',

        // need space before function parentheses
        'space-before-function-paren': [
            'error',
            'always',
        ],

        // don't need space before : but need space after,like
        // a: b
        'key-spacing': [
            'error',
            {
                'beforeColon': false,
                'afterColon': true,
            },
        ],

        // need whitespace when connecting with operator
        'space-unary-ops': [
            'error',
            {
                'words': true,
                'nonwords': false,

            },
        ],

        // space around binary operator
        'space-infix-ops': 'error',

        // can't have more than 1 empty line in file
        'no-multiple-empty-lines': 2,

        // no use of undefined
        'no-undefined': 'error',

        // no underscore dangle
        'no-underscore-dangle': 'error',

        // require camelcase
        'camelcase': 'error',

        // capitialized new
        'new-cap': [
            'error',
            {
                'newIsCap': false,
                'properties': true,
            },
        ],

        // class is constant
        'no-class-assign': 'error',

        // cann't assign native keywords
        'no-native-reassign': 'error',
    },
};
