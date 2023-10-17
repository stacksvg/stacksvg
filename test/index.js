import { test } from "node:test"
import { equal } from "node:assert/strict"

import { stacksvg } from "../lib/index.js"

test(`StackSVG should not create empty svg file`, async () => {
	const actual = await stacksvg({ inputDir: `./test/fixture/`, patterns: [`empty.svg`] })
	const expected = undefined
	equal(actual, expected)
})

test(`StackSVG should correctly merge svg files`, async () => {
	const actual = await stacksvg({ inputDir: `./test/fixture/`, patterns: [`circle.svg`, `square.svg`] })
	const expected = `<svg xmlns="http://www.w3.org/2000/svg"><style>:root svg:not(:target){display:none}</style><svg viewBox="0 0 4 4" preserveAspectRatio="xMinYMid meet" id="circle"><circle cx="2" cy="2" r="1"/></svg><svg id="square"><rect x="1" y="1" width="2" height="2"/></svg></svg>`

	equal(actual, expected)
})

test(`StackSVG should not include invalid files`, async () => {
	const actual = await stacksvg({ inputDir: `./test/fixture/`, patterns: [`circle.svg`, `invalid.svg`] })
	const expected = `<svg xmlns="http://www.w3.org/2000/svg"><style>:root svg:not(:target){display:none}</style><svg viewBox="0 0 4 4" preserveAspectRatio="xMinYMid meet" id="circle"><circle cx="2" cy="2" r="1"/></svg></svg>`

	equal(actual, expected)
})
