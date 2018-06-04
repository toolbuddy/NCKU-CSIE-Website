const indentation = 2;

module.exports = {

    // No attribute concatenation
    disallowAttributeConcatenation: true,

    // No block expansion
    disallowBlockExpansion: true,

    // Id literals must before class literals
    disallowClassLiteralsBeforeIdLiterals: true,

    // No duplicate attributes
    disallowDuplicateAttributes: true,

    // No html texts
    disallowHtmlText: true,

    // No global id literal
    disallowIdLiterals: true,

    // No old mixin usage
    disallowLegacyMixinCall: true,

    // No multiple empty lines
    disallowMultipleLineBreaks: true,

    // Pug must not use these specified tags
    disallowSpecificTags: [ 'div',
        'font',
        'embed',
        'strike',
        's',
        'u',
        'applet',
        'basefont',
        'center',
        'dir',
        'isindex',
        'listing',
        'menu',
        'plaintext',
        'xmp',
        'b',
        'i', ],

    // No string concatenation
    disallowStringConcatenation: true,

    // No multiple space at the end of line
    disallowTrailingSpaces: true,

    // Define maximum line length
    maximumLineLength: 160,

    // Class literals must before attributes
    requireClassLiteralsBeforeAttributes: true,

    // Id literals must before attributes
    requireIdLiteralsBeforeAttributes: true,

    // Need new line at the file end
    requireLineFeedAtFileEnd: true,

    // Attribute must use lowercase
    requireLowerCaseAttributes: true,

    // Tag must use lowercase
    requireLowerCaseTags: true,

    // Need space after operator
    requireSpaceAfterCodeOperator: true,

    // Need to use !== and === as equal and nonequal
    requireStrictEqualityOperators: true,

    // Use specified quote as attribute quotemark
    validateAttributeQuoteMarks: '\'',

    // Use specified operator as attribute operator
    validateAttributeSeparator: {
        separator:          ', ',
        multiLineSeparator: ',\n  ',
    },

    // Pug template muse use proper file extensions
    validateExtensions: true,

    // Use 2 space as indentation
    validateIndentation: indentation,

    // Use LF as line breaks
    validateLineBreaks: 'LF',

    // Must not contain any unnecessary self colsing tags
    validateSelfClosingTags: true,

    // Must use ES6 string concatenation
    validateTemplateString: [ 'concatenation', ],
};
