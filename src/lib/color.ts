import { OKLCH, steps, type ColorObject } from 'colorjs.io/fn'
import { type NumberRange } from './numberRange'
import { registerColorSpaces } from './colorjs'

type Color = ColorObject
type Swatch = Color[]
type Palette = Swatch[]

type SwatchRecipe = {
	chroma: number
	hue: number
}

const lightnessRange: NumberRange = { from: 0, to: 100 }
const chromaRange: NumberRange = { from: 0, to: 0.4 }
const hueRange: NumberRange = { from: 0, to: 360 }

function makeColor(lightness: number, chroma: number, hue: number): Color {
	registerColorSpaces()

	return { space: OKLCH, coords: [lightness, chroma, hue] }
}

function makeSwatch(lightnessRange: NumberRange, swatchRecipe: SwatchRecipe, length: number): Swatch {
	registerColorSpaces()

	const { from: baseLightness, to: targetLightness } = lightnessRange
	const { chroma, hue } = swatchRecipe

    const baseColor = makeColor(baseLightness, chroma, hue)
    const targetColor = makeColor(targetLightness, chroma, hue)
	
	return steps(
		baseColor,
		targetColor,
		{
			space: OKLCH,
			outputSpace: OKLCH,
			steps: length,
			maxSteps: length
		}
	)
}
