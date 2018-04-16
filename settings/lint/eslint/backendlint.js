module.exports = {
	//setting linting environment
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
	},
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
		//need to use -(a) instead of -a
		"no-negated-in-lhs": "error",
		//disallow variable assignment inside if()
		"no-cond-assign": [
			"error",
			"except-parens"
		],
		//must use curly{} to enclose block
		"curly": [
			"error",
			"all"
		],
		//must use space at { and }
		"object-curly-spacing": [
			"error",
			"always"
		],
		//each property need whitespace before and after
		"computed-property-spacing": [
			"error",
			"always"
		],
		//must use space at [ and ]
		"array-bracket-spacing": [
			"error",
			"always"
		],
		// use === 
		"eqeqeq": [
			"error",
			"smart"
		],
		//can't have unused expressions
		"no-unused-expressions": "error",
		//can't have ternary operator inside ternary operator
		"no-nested-ternary": "error",
		//can't write unreachable code
		"no-unreachable": "error",
		//must use wrapping to function expression
		"wrap-iife": [
			"error",
			"inside"
		],
		//can't use caller/callee
		"no-caller": "error",
		//all string need to use single quote('')
		"quotes": [
			"error",
			"single"
		],
		//can't use variable that not declare
		"no-undef": "error",
		//can't left any variable unused
		"no-unused-vars": "error",
		//operator linebreak must add at the end of the line
		//like a = b +
		//         c;
		"operator-linebreak": [
			"error",
			"after"
		],
		//object comma(,) must add at the end of the line
		"comma-style": [
			"error",
			"last"
		],
		//accessing properties must use .
		//and and using [""]
		"dot-notation": [
			"error",
			{
				"allowPattern": "^[a-z]+(_[a-z]+)+$"
			}
		],
		//maximum length of a line
		//ignore URL, comment, and regular expression length 
		"max-len": [
			"error",
			{
				"code": 100,
				"ignoreComments": true,
				"ignoreUrls": true,
				"ignoreRegExpLiterals": true
			}
		],
		"no-mixed-spaces-and-tabs": "error",
		//can't left whitespace and tab at the end of the line 
		"no-trailing-spaces": "error",
		//disallow multiple string
		"no-multi-str": "error",
		//can't left comma(,) after the last object properties
		"comma-dangle": [
			"error",
			"never"
		],
		//need space after each comma(,) 
		"comma-spacing": [
			"error",
			{
				"before": false,
				"after": true
			}
		],
		//need to add space before {}
		"space-before-blocks": [
			"error",
			"always"
		],
		//need space at parentheses
		"space-in-parens": [
			"error",
			"always"
		],
		//need ; at the end of the statement
		"semi": [
			"error",
			"always"
		],
		//need space after semicolon(;),use it at for-loop
		"semi-spacing": [
			"error",
			{
				"after": true
			}
		],
		//must add a empty at the end of the file
		"eol-last": "error",
		//must add a empty line at comment line, like
		//
		//Here is a comment line
		"lines-around-comment": [
			"error",
			{
				"beforeLineComment": true
			}
		],
		//can't use with
		"no-with": "error",
		//enfore brace({}) using style, currently using
		// a(){
		// }
		"brace-style": "error",
		//need space before function parentheses
		"space-before-function-paren": [
			"error",
			"never"
		],
		//disallow looping function
		"no-loop-func": "error",
		//don't need space before : but need space after,like
		// a: b
		"key-spacing": [
			"error",
			{
				"beforeColon": false,
				"afterColon": true
			}
		],
		//need whitespace when connecting with operator
		"space-unary-ops": [
			"error",
			{
				"words": true,
				"nonwords": true
			}
		],
		//can't have more than 1 empty line in file
		"no-multiple-empty-lines": 2
    }
}