import { readFile, writeFile, mkdir } from "node:fs/promises"
import { basename, extname, normalize, sep } from "node:path"

import { globby } from "globby"
import { XMLParser, XMLBuilder } from "fast-xml-parser"

let fxpOptions = {
	ignoreAttributes : false,
	allowBooleanAttributes: true,
	attributeNamePrefix : ``,
	ignoreDeclaration: true,
	ignorePiTags: true,
	parseAttributeValue: true,
	preserveOrder: true,
	processEntities: false,
	suppressEmptyNode: true,
}

let parser = new XMLParser(fxpOptions)
let builder = new XMLBuilder(fxpOptions)

async function prepareStackFragment (inputDir, filePath) {
	let iconString = await readFile(normalize(`${inputDir}/${filePath}`), { encoding: `utf8` })
	let iconObject

	try {
		iconObject = parser.parse(iconString, true)
	} catch {
		return ``
	}

	if (!Object.hasOwn(iconObject[0], `:@`)) iconObject[0][`:@`] = {}

	let iconAttrs = iconObject[0][`:@`]

	iconAttrs.id = basename(filePath.split(sep).join(`_`).replace(/\s/g, `-`), extname(filePath))

	delete iconAttrs.xmlns

	return builder.build(iconObject)
}

async function getSvgFilePaths (patterns, inputDir) {
	let files = await globby(patterns, { cwd: inputDir })

	return files.filter((file) => extname(file) === `.svg`)
}

export async function stacksvg ({ inputDir = `./`, outputDir = null, patterns = `**/*.svg` } = {}) {
	let files = await getSvgFilePaths(patterns, inputDir)
	let transformedFiles = await Promise.all(files.map(async (filePath) => await prepareStackFragment(inputDir, filePath)))
	let fragmentPile = transformedFiles.join(``)

	if (fragmentPile === ``) return

	let resultStack = `<svg xmlns="http://www.w3.org/2000/svg"><style>:root svg:not(:target){display:none}</style>${fragmentPile}</svg>`

	if (outputDir === null) return resultStack

	await mkdir(outputDir, { recursive: true })

	await writeFile(normalize(`${outputDir}/stack.svg`), resultStack)
}
