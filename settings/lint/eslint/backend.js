const ecmaVersion = 8;
const indent = {
    size:  4,
    level: {
        switchCase:         1,
        variableDeclarator: {
            var:   1,
            let:   1,
            const: 1,
        },
        outerIIFEBody:       1,
        memberExpression:    1,
        functionDeclaration: {
            body:       1,
            parameters: 2,
        },
        functionExpression: {
            body:       1,
            parameters: 2,
        },
        callExpression: {
            arguments: 1,
        },
        arrayExpression:   1,
        objectExpression:  1,
        importDeclaration: 1,
    },
};
const max = {
    character: {
        code:     160,
        tab:      4,
        comments: 160,
    },
    line: {
        empty:     2,
        eof:       1,
        bof:       0,
        file:      2000,
        statement: 1,
    },
    depth: {
        callback:    4,
        chainMethod: 2,
    },
};

module.exports = {

    // Setting ECMAScript running environment
    'env': {
        'commonjs': true,
        'es6':      true,
        'node':     true,
    },

    // ECMAScript parser option
    'parserOptions': {

        // ECMAScript syntax version
        ecmaVersion,

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
        'no-console': [
            'error',
            {

                // Allowed methods of the `console` object.
                'allow': [

                    // Allowed method `console.warn`.
                    'warn',

                    // Allowed method `console.error`.
                    'error',
                ],
            },
        ],

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
                'allowImplicit': true,
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

        // Disallow self assignment.
        'no-self-assign': [
            'error',
            {

                // Check properties as well.
                'props': true,
            },
        ],

        // Disallow self compare.
        'no-self-compare': 'error',

        // Restrict what can be thrown as an exception.
        'no-throw-literal': 'error',

        // Disallow unused expressions.
        'no-unused-expressions': [
            'error',
            {
                // Allow short circuit evaluations in expressions.
                'allowShortCircuit':    true,

                // Allow ternary operators in expressions.
                'allowTernary':         true,

                // Allow tagged template literals in expressions.
                'allowTaggedTemplates': true,
            },
        ],

        // Disallow unused labels.
        'no-unused-labels': 'error',

        // Disallow unnecessary `.call()` and `.apply()`.
        'no-useless-call': 'error',

        // Disallow unnecessary concatenation of strings.
        'no-useless-concat': 'error',

        // Disallow unnecessary escape usage.
        'no-useless-escape': 'error',

        // Disallow use of the `void` operator.
        'no-void': 'error',

        // Disallow `with` statements.
        'no-with': 'error',

        // Require using `Error` objects as `Promise` rejection reasons.
        'prefer-promise-reject-errors': [
            'error',
            {

                // Allows calls to `Promise.reject()` with no arguments.
                'allowEmptyReject': true,
            },
        ],

        // Require radix parameter.
        'radix': 'error',

        // Require variable declarations to be at the top of their scope.
        'vars-on-top': 'error',

        // Require IIFEs to be wrapped.
        'wrap-iife': [
            'error',

            // Always wrapping the function expression.
            'inside',
            {

                // Wrapping function expressions invoked using `.call` and `.apply`.
                'functionPrototypeMethods': true,
            },
        ],

        // Disallow Yoda conditions.
        'yoda': [
            'error',

            // Comparisons must never be Yoda conditions.
            'never',
            {

                // Allows yoda conditions in range comparisons which are wrapped directly in parentheses.
                'exceptRange': true,
            },
        ],

        /** Variables */
        // Disallow deleting variables.
        'no-delete-var': 'error',

        // Disallow labels that are variables names.
        'no-label-var': 'error',

        // Disallow specific global variables.
        'no-restricted-globals': [
            'error',
            {

                // Disallow `isNaN`, use `Number.isNaN`.
                'name':    'isNaN',
                'message': 'Use Number.isNaN instead.',
            },
            {

                // Disallow `isFinite`, use `Number.isFinite`.
                'name':    'isFinite',
                'message': 'Use Number.isFinite instead.',
            },
            {

                // Disallow `parseFloat`, use `Number.parseFloat`.
                'name':    'parseFloat',
                'message': 'Use Number.parseFloat instead.',
            },
            {

                // Disallow `parseInt`, use `Number.parseInt`.
                'name':    'parseInt',
                'message': 'Use Number.parseInt instead.',
            },
        ],

        // Disallow shadowing of restricted names.
        'no-shadow-restricted-names': 'error',

        // Disallow undeclared variables.
        'no-undef': 'error',

        // Disallow initializing to `undefined`.
        'no-undef-init': 'error',

        // Disallow use of `undefined` variable.
        'no-undefined': 'error',

        // Disallow unused variables.
        'no-unused-vars': 'error',

        // Disallow early use.
        'no-use-before-define': 'error',

        /** Node.js and CommonJS */
        // Enforce `require()` on the top-level module scope.
        'global-require': 'error',

        // Disallow use of the `Buffer()` constructor.
        'no-buffer-constructor': 'error',

        // Disallow `new require`.
        'no-new-require': 'error',

        // Disallow string concatenation
        // when using `__dirname` and `__filename`.
        'no-path-concat': 'error',

        // Disallow `process.env`.
        'no-process-env': 'error',

        // Disallow `process.exit()`.
        'no-process-exit': 'error',

        /** Stylistic Issues */
        // Enforce line breaks after opening and before closing array brackets.
        'array-bracket-newline': [
            'error',

            // Requires consistent usage of linebreaks for each pair of brackets.
            'consistent',
        ],

        // Enforce spaces inside of brackets.
        'array-bracket-spacing': [
            'error',

            // Requires one or more spaces or newlines inside array brackets.
            'always',
            {

                // Requires one or more spaces or newlines inside brackets of array literals
                // that contain a single element.
                'singleValue': true,

                // Requires one or more spaces or newlines
                // between brackets of array literals and braces of their object literal elements `[ {` or `} ]`.
                'objectsInArrays': true,

                // Requires one or more spaces or newlines
                // between brackets of array literals and brackets of their array literal elements `[ [` or `] ]`.
                'arraysInArrays': true,
            },
        ],

        // Enforce line breaks between array elements.
        'array-element-newline': [
            'error',

            // Requires line breaks between array elements.
            'always',
        ],

        // Enforce spaces inside of blocks after opening block and before closing block.
        'block-spacing': [
            'error',

            // Requires one or more spaces.
            'always',
        ],

        // Require brace style.
        'brace-style': [
            'error',

            // Enforces Stroustrup style.
            'stroustrup',
            {

                // Allows the opening and closing braces for a block to be on the same line.
                'allowSingleLine': true,
            },
        ],

        // Require CamelCase.
        'camelcase': 'error',

        // Enforce capitalization of the first letter of a comment.
        'capitalized-comments': [
            'error',
            'always',
            {

                // The rule will not report on comments in the middle of code.
                'ignoreInlineComments': true,

                // The rule will not report on a comment which violates the rule,
                // as long as the comment immediately follows another comment.
                'ignoreConsecutiveComments': true,
            },
        ],

        // Require trailing commas.
        'comma-dangle': [
            'error',
            'always',
            {

                // Disallows trailing commas `import` declarations of ES modules.
                'imports': 'never',

                // Disallows trailing commas `export` declarations of ES modules.
                'exports': 'never',

                // Disallows trailing commas `function` declarations and function calls.
                'functions': 'never',
            },
        ],

        // Enforces spacing around commas.
        'comma-spacing': [
            'error',
            {

                // Disallows spaces before commas.
                'before': false,

                // Requires one or more spaces after commas.
                'after': true,
            },
        ],

        // Comma style.
        'comma-style': [
            'error',

            // Requires a comma after and on the same line as an array element,
            // object property, or variable declaration.
            'last',
        ],

        // Enforce spaces inside of computed properties
        'computed-property-spacing': [
            'error',
            'always',
        ],

        // Require consistent `this`.
        'consistent-this': [
            'error',

            // Designated alias names for `this`.
            'that',
        ],

        // Require newline at the end of files.
        'eol-last': [
            'error',
            'always',
        ],

        // Disallow spacing between function identifiers and their invocations.
        'func-call-spacing': [
            'error',
            'never',
        ],

        // Require function names to match the name of the variable or property
        // to which they are assigned.
        'func-name-matching': [
            'error',
            'always',
            {

                // Which means that `module.exports` and `module["exports"]` are ignored by this rule.
                'includeCommonJSModuleExports': false,
            },
        ],

        // Enforce the consistent use of either function declarations or expressions.
        'func-style': [
            'error',

            // Requires the use of function declarations instead of function expressions.
            'declaration',
            {

                // Allows the use of arrow functions.
                'allowArrowFunctions': true,
            },
        ],

        // Enforce consistent line breaks inside function parentheses.
        'function-paren-newline': [
            'error',

            // Requires consistent usage of linebreaks for each pair of parentheses.
            'consistent',
        ],

        // Enforce the location of arrow function bodies with implicit returns.
        'implicit-arrow-linebreak': [
            'error',

            // Disallows a newline before an arrow function body.
            'beside',
        ],

        // Enforce consistent indentation.
        'indent': [
            'error',
            indent.size,
            {

                // Enforces indentation level for `case` clauses in `switch` statements.
                'SwitchCase': indent.level.switchCase,

                // Enforces indentation level for `var`, `let` and `const` declarators.
                'VariableDeclarator': {
                    'var':   indent.level.variableDeclarator.var,
                    'let':   indent.level.variableDeclarator.let,
                    'const': indent.level.variableDeclarator.const,
                },

                // Enforces indentation level for file-level IIFEs.
                'outerIIFEBody': indent.level.outerIIFEBody,

                // Enforces indentation level for multi-line property chains.
                'MemberExpression': indent.level.memberExpression,

                // Enforces indentation level for parameters in and body of a function declaration.
                'FunctionDeclaration': {
                    'body':       indent.level.functionDeclaration.body,
                    'parameters': indent.level.functionDeclaration.parameters,
                },

                // Enforces indentation level for parameters in and body of a function expression.
                'FunctionExpression': {
                    'body':       indent.level.functionExpression.body,
                    'parameters': indent.level.functionExpression.parameters,
                },

                // Enforces indentation level for arguments in a call expression.
                'CallExpression': {
                    'arguments': indent.level.callExpression.arguments,
                },

                // Enforces indentation level for elements in arrays.
                'ArrayExpression': indent.level.arrayExpression,

                // Enforces indentation level for properties in objects.
                'ObjectExpression': indent.level.objectExpression,

                // Enforces indentation level for `import` statements.
                'ImportDeclaration': indent.level.importDeclaration,

                // Requires no indentation for ternary expressions which are nested in other ternary expressions.
                'flatTernaryExpressions': true,

                // Comments need to be aligned with nodes on the previous or next line.
                'ignoreComments': false,
            },
        ],

        // Enforce consistent spacing between keys and values in object literal properties.
        'key-spacing': [
            'error',
            {
                // Disallows spaces between the key and the colon in object literals.
                'beforeColon': false,

                // Requires at least one space between the colon and the value in object literals.
                'afterColon': true,

                // Enforces one or more spaces after colons in object literals.
                'mode': 'minimum',

                // Enforces horizontal alignment of values in object literals.
                'align': 'value',
            },
        ],

        // Enforce consistent spacing before and after keywords.
        'keyword-spacing': [
            'error',
            {
                // Overriding spacing style for specified keywords.
                'overrides': {
                    'as': {
                        'before': true,
                        'after':  true,
                    },
                    'async': {
                        'before': false,
                        'after':  true,
                    },
                    'await': {
                        'before': true,
                        'after':  true,
                    },
                    'break': {
                        'before': false,
                        'after':  false,
                    },
                    'case': {
                        'before': false,
                        'after':  true,
                    },
                    'catch': {
                        'before': false,
                        'after':  true,
                    },
                    'class': {
                        'before': false,
                        'after':  true,
                    },
                    'const': {
                        'before': false,
                        'after':  true,
                    },
                    'continue': {
                        'before': false,
                        'after':  false,
                    },
                    'debugger': {
                        'before': false,
                        'after':  false,
                    },
                    'default': {
                        'before': false,
                        'after':  true,
                    },
                    'delete': {
                        'before': false,
                        'after':  true,
                    },
                    'do': {
                        'before': false,
                        'after':  true,
                    },
                    'else': {
                        'before': false,
                        'after':  true,
                    },
                    'export': {
                        'before': false,
                        'after':  true,
                    },
                    'extends': {
                        'before': true,
                        'after':  true,
                    },
                    'finally': {
                        'before': false,
                        'after':  true,
                    },
                    'for': {
                        'before': false,
                        'after':  true,
                    },
                    'from': {
                        'before': true,
                        'after':  true,
                    },
                    'function': {
                        'before': false,
                        'after':  true,
                    },
                    'get': {
                        'before': false,
                        'after':  true,
                    },
                    'if': {
                        'before': false,
                        'after':  true,
                    },
                    'import': {
                        'before': false,
                        'after':  true,
                    },
                    'in': {
                        'before': true,
                        'after':  true,
                    },
                    'instanceof': {
                        'before': true,
                        'after':  true,
                    },
                    'let': {
                        'before': false,
                        'after':  true,
                    },
                    'new': {
                        'before': true,
                        'after':  true,
                    },
                    'of': {
                        'before': true,
                        'after':  true,
                    },
                    'return': {
                        'before': false,
                        'after':  true,
                    },
                    'set': {
                        'before': false,
                        'after':  true,
                    },
                    'static': {
                        'before': false,
                        'after':  true,
                    },
                    'super': {
                        'before': true,
                        'after':  false,
                    },
                    'switch': {
                        'before': false,
                        'after':  true,
                    },
                    'this': {
                        'before': true,
                        'after':  false,
                    },
                    'throw': {
                        'before': false,
                        'after':  true,
                    },
                    'try': {
                        'before': false,
                        'after':  true,
                    },
                    'typeof': {
                        'before': true,
                        'after':  true,
                    },
                    'var': {
                        'before': false,
                        'after':  true,
                    },
                    'void': {
                        'before': true,
                        'after':  true,
                    },
                    'while': {
                        'before': false,
                        'after':  true,
                    },
                    'with': {
                        'before': true,
                        'after':  true,
                    },
                    'yield': {
                        'before': true,
                        'after':  true,
                    },
                },
            },
        ],

        // Enforce position of line comments.
        'line-comment-position': [
            'error',
            {
                // Enforces line comments only above code, in its own line.
                'position': 'above',
            },
        ],

        // Enforce consistent linebreak style.
        'linebreak-style': [
            'error',

            // Enforces the usage of Unix line endings: `\n` for LF
            'unix',
        ],

        // Require empty lines around comments.
        'lines-around-comment': [
            'error',
            {
                // Requires an empty line before block comments.
                'beforeBlockComment': true,

                // Requires an empty line after block comments.
                'afterBlockComment':  true,

                // Requires an empty line before line comments.
                'beforeLineComment':  true,

                // Requires an empty line after line comments.
                'afterLineComment':   false,

                // Allows comments to appear at the start of block statements.
                'allowBlockStart':    true,

                // Disallows comments to appear at the end of block statements.
                'allowBlockEnd':      false,

                // Allows comments to appear at the start of object literals.
                'allowObjectStart':   true,

                // Disallows comments to appear at the end of object literals.
                'allowObjectEnd':     false,

                // Allows comments to appear at the start of array literals.
                'allowArrayStart':    true,

                // Disallows comments to appear at the end of array literals.
                'allowArrayEnd':      false,

                // Allows comments to appear at the start of classes.
                'allowClassStart':    true,

                // Disallows comments to appear at the end of classes.
                'allowClassEnd':      false,
            },
        ],

        // Require an empty line between class members.
        'lines-between-class-members': [
            'error',
            'always',
        ],

        // Enforce a maximum line length.
        'max-len': [
            'error',
            {
                // Enforces a maximum line length.
                'code':                   max.character.code,

                // Specifies the character width for tab characters.
                'tabWidth':               max.character.tab,

                // Enforces a maximum line length for comments.
                'comments':               max.character.comments,

                // Do not ignores all trailing comments and comments on their own line.
                'ignoreComments':         false,

                // Do not ignores only trailing comments.
                'ignoreTrailingComments': false,

                // Ignores lines that contain a URL.
                'ignoreUrls':             true,

                // Do not ignores lines that contain a double-quoted or single-quoted string.
                'ignoreStrings':          false,

                // Do not ignores lines that contain a template literal.
                'ignoreTemplateLiterals': false,

                // Ignores lines that contain a RegExp literal.
                'ignoreRegExpLiterals':   true,
            },
        ],

        // Enforce a maximum file length.
        'max-lines': [
            'error',
            {
                // Enforces a maximum number of lines in a file.
                'max':            max.line.file,

                // Ignore lines made up purely of whitespace.
                'skipBlankLines': true,

                // Ignore lines containing just comments.
                'skipComments':   true,
            },
        ],

        // Enforce a maximum depth that callbacks can be nested.
        'max-nested-callbacks': [
            'error',
            {
                'max': max.depth.callback,
            },
        ],

        // Enforce a maximum number of statements allowed per line.
        'max-statements-per-line': [
            'error',
            {
                'max': max.line.statement,
            },
        ],

        // Enforces newlines between the operands of a ternary expression
        // if the expression spans multiple lines.
        'multiline-ternary': [
            'error',
            'always-multiline',
        ],

        // Require constructor names to begin with a capital letter
        'new-cap': [
            'error',
            {
                // Requires all `new` operators to be called with uppercase-started functions.
                'newIsCap':   true,

                // Allows uppercase-started functions to be called without new operators.
                'capIsNew':   false,

                // Enables checks on object properties.
                'properties': true,
            },
        ],

        // Require parentheses when invoking a constructor with no arguments.
        'new-parens': 'error',

        // Require a newline after each call in a method chain.
        'newline-per-chained-call': [
            'off',
            {
                // Allows chains up to a specified depth.
                'ignoreChainWithDepth': max.depth.chainMethod,
            },
        ],

        // Disallow `Array` constructors.
        'no-array-constructor': 'error',

        // Disallow inline comments after code.
        'no-inline-comments': 'error',

        // Disallow `if` statements as the only statement in `else` blocks
        'no-lonely-if': 'error',

        // Disallow mixes of different operators.
        'no-mixed-operators': [
            'error',
            {
                // Specifies operator groups to be checked.
                'groups': [
                    [
                        '+',
                        '-',
                        '*',
                        '/',
                        '%',
                        '**',
                    ],
                    [
                        '&',
                        '|',
                        '^',
                        '~',
                        '<<',
                        '>>',
                        '>>>',
                    ],
                    [
                        '==',
                        '!=',
                        '===',
                        '!==',
                        '>',
                        '>=',
                        '<',
                        '<=',
                    ],
                    [
                        '&&',
                        '||',
                    ],
                    [
                        'in',
                        'instanceof',
                    ],
                ],

                // Specifies whether to allow mixed operators if they are of equal precedence.
                'allowSamePrecedence': true,
            },
        ],

        // Disallow mixed spaces and tabs for indentation.
        'no-mixed-spaces-and-tabs': 'error',

        // Disallow use of chained assignment expressions.
        'no-multi-assign': 'error',

        // Disallow multiple empty lines.
        'no-multiple-empty-lines': [
            'error',
            {
                'max':    max.line.empty,
                'maxEOF': max.line.eof,
                'maxBOF': max.line.bof,
            },
        ],

        // Disallow nested ternary expressions.
        'no-nested-ternary': 'error',

        // Disallow Object constructors
        'no-new-object': 'error',

        // Disallow the unary operators `++` and `--`.
        'no-plusplus': [
            'error',
            {
                // Allows unary operators `++` and `--` in the afterthought (final expression) of a for loop.
                'allowForLoopAfterthoughts': true,
            },
        ],

        // Disallow all tabs.
        'no-tabs': 'error',

        // Disallow trailing whitespace at the end of lines.
        'no-trailing-spaces': [
            'error',
            {
                // Disallows trailing whitespace on empty lines.
                'skipBlankLines': false,

                // Disallows trailing whitespace in comment blocks.
                'ignoreComments': false,
            },
        ],

        // Disallow dangling underscores in identifiers.
        'no-underscore-dangle': [
            'error',
            {
                // Disallows dangling underscores in members of the `this` object.
                'allowAfterThis':       false,

                // Disallows dangling underscores in members of the `super` object.
                'allowAfterSuper':      false,

                // Disallows dangling underscores in method names.
                'enforceInMethodNames': false,
            },
        ],

        // Disallow whitespace before properties.
        'no-whitespace-before-property': 'error',

        // Enforce the location of single-line statements.
        'nonblock-statement-body-position': [
            'error',

            // Disallows a newline before a single-line statement.
            'below',
        ],

        // Enforce consistent line breaks inside braces.
        'object-curly-newline': [
            'error',
            {
                // Requires line breaks if there are line breaks inside properties or between properties.
                'multiline':  true,

                // Requires that either both curly braces, or neither, directly enclose newlines.
                'consistent': true,
            },
        ],

        // Enforce consistent spacing inside braces.
        'object-curly-spacing': [
            'error',

            // Requires spacing inside of braces (except `{}`).
            'always',
            {
                // Requires spacing inside of braces of objects beginning and/or ending with an array element.
                'arraysInObjects':  true,

                // Requires spacing inside of braces of objects beginning and/or ending with an object element.
                'objectsInObjects': true,
            },
        ],

        // Enforce placing object properties on separate lines.
        'object-property-newline': [
            'error',
            {
                // Permit all property specifications on the same line.
                'allowAllPropertiesOnSameLine': true,
            },
        ],

        // Enforce variables to be declared separately in functions.
        'one-var': [
            'error',
            'never',
        ],

        // Require newlines around variable declarations.
        'one-var-declaration-per-line': [
            'error',
            'always',
        ],

        // Enforce consistent linebreak style for operators.
        'operator-linebreak': [
            'error',

            // Requires linebreaks to be placed after the operator.
            'after',
        ],

        // Disallow padding within blocks.
        'padded-blocks': [
            'error',
            'never',
        ],

        // Require quotes around object literal property names.
        'quote-props': [
            'error',

            // Either all of the properties should be quoted,
            // or none of the properties should be quoted
            'consistent',
        ],

        // Enforce the consistent use of either backticks, double, or single quotes.
        'quotes': [
            'error',

            // Requires the use of single quotes wherever possible.
            'single',
            {
                // Allows strings to use single-quotes or double-quotes
                // so long as the string contains a quote that would have to be escaped otherwise.
                'avoidEscape':           true,

                // Allows strings to use backticks.
                'allowTemplateLiterals': true,
            },
        ],

        // Require JSDoc comments.
        'require-jsdoc': [
            'off',
        ],

        // Require semicolons instead of ASI.
        'semi': [
            'error',
            'always',
        ],

        // Enforce spacing before and after semicolons.
        'semi-spacing': [
            'error',
            {
                // Space is disallowed before semicolons.
                'before': false,

                // Space is enforced after semicolons,
                // only applied if a semicolon is not at the end of line.
                'after':  true,
            },
        ],

        // Enforce location of semicolons.
        'semi-style': [
            'error',

            // Enforces that semicolons are at the end of statements.
            'last',
        ],

        // Require space before blocks.
        'space-before-blocks': [
            'error',
            'always',
        ],

        // Require a space before function parenthesis.
        'space-before-function-paren': [
            'error',
            'always',
        ],

        // Enforce spaces inside of parentheses.
        'space-in-parens': [
            'error',
            'always',
            {
                // Disallow spaces in empty parentheses.
                'exceptions': [ 'empty', ],
            },
        ],

        // Require spacing around infix operators.
        'space-infix-ops': 'error',

        // Require or disallow spaces before/after unary operators.
        'space-unary-ops': [
            'error',
            {
                // Applies to unary word operators such as: `new`, `delete`, `typeof`, `void`, `yield`.
                'words':    true,

                // Do not applies to unary operators such as: `-`, `+`, `--`, `++`, `!`.
                'nonwords': false,
            },
        ],

        // Requires a whitespace beginning a comment.
        'spaced-comment': [
            'error',
            'always',
            {
                // Considered exceptions to the rule.
                'exceptions': [ '*', ],
            },
        ],

        // Enforce spacing around colons of switch statements.
        'switch-colon-spacing': [
            'error',
            {
                // Requires one or more spaces after colons.
                'after':  true,

                // Disallows spaces before colons.
                'before': false,
            },
        ],

        // Disallow spacing between template tags and their literals.
        'template-tag-spacing': [
            'error',
            'never',
        ],

        // Disallow the Unicode Byte Order Mark.
        'unicode-bom': [
            'error',
            'never',
        ],

        /** ECMAScript 6 */
        // Require braces in arrow function body.
        'arrow-body-style': [
            'error',

            // Enforces no braces where they can be omitted.
            'as-needed',
            {
                // Allow no braces for object literals.
                'requireReturnForObjectLiteral': false,
            },
        ],

        // Allows omitting parens when there is only one argument.
        'arrow-parens': [
            'error',
            'as-needed',
            {
                // Modifies the as-needed rule in order to require parens
                // if the function body is in an instructions block.
                'requireForBlockBody': true,
            },
        ],

        // Require space before/after arrow function’s arrow.
        'arrow-spacing': [
            'error',
            {
                //  There should be one or more spaces before arrow.
                'before': true,

                //  There should be one or more spaces after arrow.
                'after':  true,
            },
        ],

        // Verify calls of `super()` in constructors
        'constructor-super': 'error',

        // Enforce spacing around the `*` in generator functions.
        'generator-star-spacing': [
            'error',
            {
                // Spaces are disallowed before `*`.
                'before': false,

                // A space is required after `*`.
                'after':  true,

                // Provides overrides for class methods or property function shorthand.
                'method': {
                    // A space is required before `*`.
                    'before': true,

                    // A space is required after `*`.
                    'after':  true,
                },
            },
        ],

        // Disallow modifying variables of `class` declarations.
        'no-class-assign': 'error',

        // Disallow modifying variables that are declared using `const`.
        'no-const-assign': 'error',

        // Disallow duplicate name in class members.
        'no-dupe-class-members': 'error',

        // Disallow duplicate imports.
        'no-duplicate-imports': [
            'error',
            {
                // If re-exporting from an imported module,
                // you should add the imports to the import-statement, and export that directly.
                'includeExports': true,
            },
        ],

        // Disallow `Symbol` constructor.
        'no-new-symbol': 'error',

        // Disallow use of `this`/`super` before calling `super()` in constructors.
        'no-this-before-super': 'error',

        // Disallow unnecessary computed property keys on objects.
        'no-useless-computed-key': 'error',

        // Disallow unnecessary constructor.
        'no-useless-constructor': 'error',

        // Disallow renaming `import`, `export`, and destructured assignments to the same name.
        'no-useless-rename': 'error',

        // Require `let` or `const` instead of `var`.
        'no-var': 'error',

        // Require object literal shorthand syntax.
        'object-shorthand': [
            'error',
            'always',
        ],

        // Suggest using `const`.
        'prefer-const': [ 'error',
            {
            // If any variables in destructuring should be `const`,
            // this rule warns for those variables.
                'destructuring':          'any',

                // Do not ignore variables that are read
                // between the declaration and the first assignment.
                'ignoreReadBeforeAssign': false,
            }, ],

        // Disallow `parseInt()` and `Number.parseInt()`
        // in favor of binary, octal, and hexadecimal literals.
        'prefer-numeric-literals': 'error',

        // Suggest using the rest parameters instead of `arguments`.
        'prefer-rest-params': 'error',

        // Suggest using the spread operator instead of `.apply()`.
        'prefer-spread': 'error',

        // Suggest using template literals instead of string concatenation.
        'prefer-template': 'error',

        // Disallow generator functions that do not have yield.
        'require-yield': 'error',

        // Disallow spacing between rest and spread operators and their expressions.
        'rest-spread-spacing': [
            'error',
            'never',
        ],

        // `import` sorting.
        'sort-imports': [
            'error',
            {
            // Do not ignore the case-sensitivity of the imports local name.
                'ignoreCase':            false,

                // Do not ignore the member sorting within a multiple member import declaration.
                'ignoreMemberSort':      false,

                // Member syntax sort order,
                // all four options must be specified in the array,
                // but you can customize their order.
                'memberSyntaxSortOrder': [
                    // Import module without exported bindings.
                    'none',

                    // Import all members provided by exported bindings.
                    'all',

                    // Import multiple members.
                    'multiple',

                    // Import single member.
                    'single',
                ],
            },
        ],

        // Require `Symbol` description.
        'symbol-description': 'error',

        // Enforce usage of spacing in template strings.
        'template-curly-spacing': [
            'error',

            // Requires one or more spaces inside of the curly brace pair.
            'always',
        ],

        // Enforce spacing around the `*` in `yield*` expressions.
        'yield-star-spacing': [
            'error',
            {
                // Spaces are disallowed before `*`.
                'before': false,

                // Spaces are required after `*`.
                'after':  true,
            },
        ],
    },
};
