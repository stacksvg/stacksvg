import globals from "globals"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
})

/** @type {import('eslint').Linter.FlatConfig} */
export default [
	...compat.extends(`eslint:recommended`),
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},

			ecmaVersion: `latest`,
			sourceType: `module`,
		},
		rules: {
			"accessor-pairs": `error`,
			"arrow-body-style": [`error`, `as-needed`],
			"arrow-parens": `error`,
			camelcase: `error`,
			"comma-dangle": [`error`, `always-multiline`],
			curly: [`error`, `multi-line`, `consistent`],
			"eol-last": `error`,
			eqeqeq: [`error`, `always`],
			indent: [`error`, `tab`],
			"linebreak-style": [`error`, `unix`],

			"lines-between-class-members": [
				`error`,
				`always`,
				{
					exceptAfterSingleLine: true,
				},
			],

			"no-alert": `error`,
			"no-multi-spaces": `error`,
			"no-multiple-empty-lines": `error`,
			"no-console": `error`,
			"no-nested-ternary": `error`,
			"no-return-assign": `error`,

			"no-shadow": [
				`error`,
				{
					hoist: `all`,
				},
			],

			"no-template-curly-in-string": `error`,
			"no-trailing-spaces": `error`,
			"no-unneeded-ternary": `error`,
			"no-unused-expressions": `error`,

			"no-use-before-define": [
				`error`,
				{
					functions: false,
				},
			],

			"no-useless-concat": `error`,
			"no-useless-return": `error`,
			"no-var": `error`,
			"prefer-arrow-callback": `error`,
			"prefer-template": `error`,
			quotes: [`error`, `backtick`],
			radix: `error`,

			semi: [
				`error`,
				`never`,
				{
					beforeStatementContinuationChars: `never`,
				},
			],

			"semi-style": `error`,
			"space-infix-ops": `error`,
			strict: [`error`, `global`],
		},
	},
]
