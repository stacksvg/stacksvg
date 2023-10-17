<!-- markdownlint-disable MD007 -->
# gulp-stacksvg

[![Test Status][test-image]][test-url]
[![License: MIT][license-image]][license-url]
[![NPM version][npm-image]][npm-url]
[![Vulnerabilities count][vulnerabilities-image]][vulnerabilities-url]

Stack SVG icons in a stack sprite, not symbolic.

## Installation

```shell
npm install --save-dev stacksvg
```

## Usage

The following script will combine all SVG sources into a single SVG file with stack method.

```js
import { stacksvg } from "stacksvg"

stacksvg({ inputDir: `./src/icons/`, outputDir: `./dest/icons/`})
```

## API: stacksvg(options?)

### `options`

Type: `object`

#### `inputDir`

Type: `string`
Default: `./`

Relative path to the directory from which files are read by `patterns`.

#### `patterns`

Type: `string | string[]`
Default: `./**/*.svg`

Glob patterns (provided by [globby](https://github.com/sindresorhus/globby)) that are used to search for files in `inputDir`.

#### `outputDir`

Type: `string | null`
Default: null

Relative path to the directory for the resulting `stack.svg` file. If `null`, then `stacksvg()` just returns the resulting code.

---

## Why a stack?

Unlike all other methods for assembling a sprite, the stack does not limit us in choosing how to insert a vector into a page. Take a look at [the results](https://demos.frontend-design.ru/sprite/src/) of different ways to display fragments of different types of sprites.

We can use the stack in all four possible ways:

- in markup:

	- in the `src` attribute of the `img` tag — static,
	- in the `href` attribute of the `use` tag — with the possibility of repainting,

- in styles:

	- in the `url()` function of the `background` property — static,
	- in the `url()` function of the `mask` property — with the possibility of repainting.

[Demo page](https://firefoxic.github.io/gulp-stacksvg/example/) to prove it.

## Stack under the hood

This method was first mentioned in a Simurai [article](https://simurai.com/blog/2012/04/02/svg-stacks) on April 2, 2012. But even it uses unnecessarily complex code transformations.

This can be done much easier. In general, the stack is arranged almost like a symbol sprite, but without changing the icon tag (it remains the `svg` tag, as in the original icon files) and with the addition of a tiny bit of style.

```xml
<svg xmlns="http://www.w3.org/2000/svg">

	<style>:root svg:not(:target) { display: none }</style>
```

<img align="left" width="90" height="90" title="sun" src="https://raw.githubusercontent.com/firefoxic/gulp-stacksvg/main/docs/example/stack.svg#sun-alpha">

```xml
<svg id="sun" viewBox="0 0 24 24">
	<!-- Inner code of sun icon -->
</svg>
```

<img align="left" width="90" height="90" title="heart" src="https://raw.githubusercontent.com/firefoxic/gulp-stacksvg/main/docs/example/stack.svg#heart-red">

```xml
<svg id="heart" viewBox="0 0 24 24">
	<!-- Inner code of heart icon -->
</svg>
```

<img align="left" width="90" height="90" title="thumbup" src="https://raw.githubusercontent.com/firefoxic/gulp-stacksvg/main/docs/example/stack.svg#thumbup-alpha">

```xml
<svg id="thumbup" viewBox="0 0 24 24">
	<!-- Inner code of thumbup icon -->
</svg>
```

```xml
</svg>
```

The magic is in the stack inner style, which shows only the fragment requested by the link, hiding everything else:

```css
:root svg:not(:target) { display: none }
```

And now the icons from the external sprite are available in the styles <img width="16" height="16" title="heart" src="https://raw.githubusercontent.com/firefoxic/gulp-stacksvg/main/docs/example/stack.svg#heart-red" alt="heart">

```html
<button class="button button--icon_heart" type="button">
	<span class="visually-hidden">Add to favorites</span>
</button>
```

```css
.button {
	display: inline-flex;
	align-items: center;
	gap: 0.5em;
}

.button--icon_heart {
	--icon: url("../icons/stack.svg#heart");
}

.button:hover {
	--fill: red;
}

.button::before {
	content: "";
	width: 1em;
	height: 1em;
	/* icon shape */
	mask: var(--icon) no-repeat center / contain;
	/* icon color */
	background: var(--fill, orangered);
}
```

> ⚠️ Note:
> We still need the [autoprefixer](https://github.com/postcss/autoprefixer) for the `mask` property.

For an icon inserted via `mask`, simply change the `background`. Moreover, unlike `use`, you can draw anything in the background under the mask, for example, a gradient.

## Useful links

- [Changelog](CHANGELOG.md)
- [License](LICENSE)
- [SVG sprites: old-school, modern, unknown, and forgotten](https://pepelsbey.dev/articles/svg-sprites/#forgotten-stacks) by [Vadim Makeev](https://mastodon.social/@pepelsbey)

[test-url]: https://github.com/stacksvg/stacksvg/actions?workflow=Test
[test-image]: https://github.com/stacksvg/stacksvg/actions/workflows/test.yaml/badge.svg?branch=main

[npm-url]: https://www.npmjs.com/package/stacksvg
[npm-image]: https://badge.fury.io/js/stacksvg.svg

[license-url]: https://github.com/stacksvg/stacksvg/blob/main/LICENSE
[license-image]: https://img.shields.io/badge/License-MIT-limegreen.svg

[vulnerabilities-url]: https://snyk.io/test/github/stacksvg/stacksvg
[vulnerabilities-image]: https://snyk.io/test/github/stacksvg/stacksvg/badge.svg
