import type { CharacterType } from './typedefs'

export function parseCharactersUnknown(results: CharacterType[]) {
	results.map((character) => {
		for (const [key, value] of Object.entries(character)) {
			if (value === 'unknown') character[key] = 'Unknown'
			if (
				typeof value === 'object' &&
				!Array.isArray(value) &&
				value.name === 'unknown'
			) {
				character[key].name = 'Unknown'
			}
		}
		return character
	})
}
